/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-express/lessons/templates/exercise_unit

// Реализуйте приложение, которое представляет из себя блог. Сайт должен позволять
// просматривать список постов и давать возможность добавлять новые посты.

// GET /posts - список постов
// GET /posts/:id - страница поста
// GET /posts/new - форма для создания нового поста
// POST /posts - создание нового поста. В случае успеха ожидается редирект на
// страницу поста, в противном случае должен быть возвращен код 422 и отрисована
// форма с указанием ошибок.
// Приложение содержит одну сущность - Post, которая содержит три обязательных поля:

// title и body - задаются через форму.
// id - проставляется автоматически, для каждого нового поста должен увеличиваться
// на единицу

// entities/Post
// Реализуйте сущность Post
// BEGIN (write your solution here)
// export default class Post {
//     static id = 1;

//     constructor(title, body) {
//         this.id = Post.id;
//         Post.id += 1;
//         this.title = title;
//         this.body = body;
//     }
// }
// END

// solution.js
// Реализуйте недостающие обработчики express

// import Express from 'express';
// import bodyParser from 'body-parser';
// import Post from './entities/Post.js';

export default () => {
    const app = new Express();
    app.set('view engine', 'pug');
    app.use('/assets', Express.static(process.env.NODE_PATH.split(':')[0]));
    app.use(bodyParser.urlencoded({ extended: false }));

    const posts = [
        new Post('hello', 'how are you?'),
        new Post('nodejs', 'story about nodejs'),
    ];

    app.get('/', (req, res) => {
        res.render('index');
    });

    // BEGIN (write your solution here)
    app.get('/posts', (req, res) => {
        res.render('posts/index', { posts });
    });
    app.get('/posts/new', (req, res) => {
        res.render('posts/new');
    });
    app.get('/posts/:id', (req, res) => {
        const post = posts.find((p) => p.id.toString() === req.params.id);
        res.render('posts/show', { post });
    });
    app.post('/posts', (req, res) => {
        const { title, body } = req.body;
        if (!title || !body) {
            res.sendStatus(422);
            return;
        }
        const post = new Post(title, body);
        posts.push(post);
        res.redirect(302, `/posts/${post.id}`);
    });
    // END

    return app;
};

// views/posts/index.pug
// Реализуйте вывод постов в табличной форме. Так же на страницы должны быть
// ссылки на просмотр постов и ссылка на создание нового.
// './templates/views/posts/index.pug'

// views/posts/new.pug
// Реализуйте форму создания нового поста
// './templates/views/posts/new.pug'

// views/posts/show.pug
// Реализуйте просмотр конкретного поста
// './templates/views/posts/show.pug'

// Подсказки
// К заданию подключен http://getbootstrap.com/ Вы можете его использовать.
// Если не можете, то ничего страшного.
