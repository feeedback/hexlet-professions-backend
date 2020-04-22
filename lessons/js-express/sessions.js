/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-express/lessons/sessions/exercise_unit

// Работа с аутентификацией — это хороший повод воспользоваться полиморфизмом
// включения. У нашего приложения два базовых состояния. Пользователь
// аутентифицирован, либо мы работаем с гостем.

// После аутентификации необходимо создавать пользователя, которого обычно
// называют currentUser, и с помощью мидлвары верхнего уровня прокидывают в
// res.locals, что дает нам возможность использовать его не только в обработчиках,
// но и в шаблонах. Таким образом, мы локализуем общий код и строим абстракцию
// поверх реализации аутентификации. Теперь приложение не зависит от того, как на
// самом деле всё работает.

// Но этого недостаточно для того, чтобы решение было "хорошим". Такой подход всё
// равно будет заставлять нас делать проверки в стиле if (res.locals.currentUser
// && res.locals.currentUser.nickname) .... И в этот момент в голове должен сразу
// произойти щелчок, что мы условиями разруливаем типы, а значит никаким ооп не
// пахнет.

// Решение этой задачи очень простое — нам нужно создать тип Guest и всегда
// устанавливать currentUser. Тогда условие остается только в одном месте — в той
// мидлваре, которая устанавливает текущего пользователя, а весь остальной код
// работает так, как будто пользователь всегда есть, только в одном случае это
// аутентифицированный пользователь, в другом случае гость.

// Теперь можно расширять Guest и User так, чтобы их можно было прозрачно
// подменить. Как минимум понадобится метод isGuest, которым мы можем проверить с
// кем сейчас идет работа. Посмотрите как в таком случае будет выглядеть наш
// лейаут:

// if currentUser.isGuest()
//   ul.nav.navbar-nav.float-xs-right
//     li.nav-item
//       a.nav-link(href="/session/new") Sign in
//     li.nav-item
//       a.nav-link(href="/users/new") Sign up
// else
//   form.form-inline.float-xs-right(action='/session?_method=DELETE' method='post')
//     button.btn.btn-link(type='submit') Sign out

//
// entities/User.js
//   Реализуйте сущность "Пользователь", которая будет использоваться в случае
//   успешной аутентификации.

// BEGIN (write your solution here)
// export default class User {
//   guest = false;

//     constructor(nickname, passHash) {
//         this.nickname = nickname;
//         this.passHash = passHash;
//     }

//   isGuest() {
//     return this.guest;
//   }
// }
// END

// views/session/new.pug
// Реализуйте форму для аутентификации.
// './sessions/views/session/new.pug'

// solution.js
// Реализуйте регистрацию и аутентификацию пользователей на сайте:

// GET /users/new — форма для создания нового пользователя
// POST /users — создание нового пользователя. Должна производиться следующая
// валидация: пользователь и пароль не должны быть пустыми, никнейм должен быть
// уникальным. Если пользователь создан успешно, то происходит перенаправление на
// главную страницу, иначе 422 и показ формы с подсветкой ошибок.

// GET /session/new — страница с формой для аутентификации
// POST /session — аутентификация. Если аутентификация не удалась, то выводим
// форму с сообщением Invalid nickname or password и статусом 422, иначе редирект
// на главную.
// DELETE /session — удаление сессии. После закрытия сессии, должен произойти
// redirect на главную страницу.

// import Express from 'express';
// import session from 'express-session';
// import morgan from 'morgan';
// import bodyParser from 'body-parser';
// import methodOverride from 'method-override';

// import encrypt from './encrypt.js';
// import User from './entities/User.js';
// import Guest from './entities/Guest.js';

export default () => {
    const app = new Express();
    app.use(morgan('combined'));
    app.use(methodOverride('_method'));
    app.set('view engine', 'pug');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/assets', Express.static(process.env.NODE_PATH.split(':')[0]));
    app.use(
        session({
            secret: 'secret key',
            resave: false,
            saveUninitialized: false,
        })
    );

    const users = [new User('admin', encrypt('qwerty'))];

    app.use((req, res, next) => {
        if (req.session && req.session.nickname) {
            const { nickname } = req.session;
            res.locals.currentUser = users.find((user) => user.nickname === nickname);
        } else {
            res.locals.currentUser = new Guest();
        }
        next();
    });

    app.get('/', (_req, res) => {
        res.render('index');
    });

    // BEGIN (write your solution here)
    app.get('/users/new', (_req, res) => {
        res.render('users/new', { form: {}, errors: {} });
    });

    app.get('/session/new', (_req, res) => {
        res.render('session/new', { form: {} });
    });

    app.post('/users', (req, res) => {
        // регистрация
        const { nickname, password } = req.body;

        const errors = {};
        if (!nickname) {
            errors.nickname = "Nickname can't be blank";
        } else {
            const isUniq = !users.some((user) => user.nickname === nickname);
            if (!isUniq) {
                errors.nickname = 'Already exist';
            }
        }

        if (!password) {
            errors.password = "Password can't be blank";
        }

        if (Object.keys(errors).length !== 0) {
            res.status(422);
            res.render('users/new', { form: req.body, errors });
            return;
        }

        const user = new User(nickname, encrypt(password));
        users.push(user);
        res.redirect('/');
    });

    app.post('/session', (req, res) => {
        // авторизация / аутентификация
        const { nickname, password } = req.body;

        const user = users.find((u) => u.nickname === nickname);
        if (!user || user.passHash !== encrypt(password)) {
            const error = 'Invalid nickname or password';

            res.status(422);
            res.render('session/new', { form: req.body, error });
            return;
        }

        req.session.nickname = nickname;
        res.redirect('/');
    });

    app.delete('/session', (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
    // END

    return app;
};
