/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-express/lessons/rest/exercise_unit

// html формы обладают одним недостатком, который нам придется обойти. Все что мы
// можем указать в method (аттрибут определяющий тип запроса к серверу) это get
// или post, а нам нужны и patch и delete. Решается это эмуляцией. На сервер
// посылается post, а в action формы записывается ссылка с таким параметром
// ?_method=PATCH. Поддержкой со стороны сервера занимается библиотека
// methodOverride. Подключается она следующим образом:

// app.use(methodOverride('_method'));
// application.js
// Реализуйте оставшиеся части CRUD-а для работы с постами.

// GET /posts/:id/edit - редактирование поста
// PATCH /posts/:id - обновление поста
// DELETE /posts/:id - удаление поста

// import Express from 'express';
// import morgan from 'morgan';
// import bodyParser from 'body-parser';
// import methodOverride from 'method-override';

// import Post from './entities/Post.js';

export default () => {
    const app = new Express();
    app.use(morgan('combined'));
    app.set('view engine', 'pug');
    app.use('/assets', Express.static(process.env.NODE_PATH.split(':')[0]));
    app.use(methodOverride('_method'));
    app.use(bodyParser.urlencoded({ extended: false }));

    const posts = [
        new Post('hello', 'how are your?'),
        new Post('nodejs', 'story about nodejs'),
    ];

    app.get('/', (_req, res) => {
        res.render('index');
    });

    app.get('/posts', (_req, res) => {
        res.render('posts/index', { posts });
    });

    app.get('/posts/new', (_req, res) => {
        res.render('posts/new', { form: {}, errors: {} });
    });

    app.get('/posts/:id', (req, res) => {
        const post = posts.find((p) => p.id.toString() === req.params.id);
        res.render('posts/show', { post });
    });

    app.post('/posts', (req, res) => {
        const { title, body } = req.body;

        const errors = {};
        if (!title) {
            errors.title = "Title can't be blank";
        }

        if (!body) {
            errors.body = "Body can't be blank";
        }

        if (Object.keys(errors).length === 0) {
            const post = new Post(title, body);
            posts.push(post);
            res.redirect(`/posts/${post.id}/edit`);
            return;
        }

        res.status(422);
        res.render('/posts/edit', { form: req.body, errors });
    });

    // BEGIN (write your solution here)
    app.get('/posts/:id/edit', (req, res) => {
        const post = posts.find((p) => p.id.toString() === req.params.id);
        res.render('posts/edit', { form: post, errors: {} });
    });

    app.patch('/posts/:id', (req, res) => {
        const { title, body } = req.body;

        const errors = {};
        if (!title) {
            errors.title = "Title can't be blank";
        }

        if (!body) {
            errors.body = "Body can't be blank";
        }

        const post = posts.find((p) => p.id.toString() === req.params.id);
        if (Object.keys(errors).length === 0) {
            post.title = title;
            post.body = body;
            res.redirect(`/posts/${post.id}`);
            return;
        }

        res.status(422);
        res.render('posts/edit', { form: { title, body }, post, errors });
    });

    app.delete('/posts/:id', (req, res) => {
        const postIndex = posts.findIndex((p) => p.id.toString() === req.params.id);
        posts.splice(postIndex, 1);
        res.redirect(`/posts`);
    });
    // END
    return app;
};

// views/posts/index.pug
// Реализуйте вывод постов в табличной форме. Для каждого поста нужно вывести
// ссылки для редактирования и удаления.

// views/posts/edit.pug
// Создайте форму для редактирования поста по образу и подобию формы создания
// поста new.pug.
