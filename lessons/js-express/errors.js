/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-express/lessons/errors/exercise_unit

// solution.js
// Реализуйте в приложении обработку ошибок 404, которые могут появляться как в
// случае явного перенаправления на мидлвару обрабатывающую ошибки, так и для
// случая когда ни один маршрут не совпал с запрашиваемым адресом.

// На эту ошибку должна рендерится страница с шаблоном views/404.pug

// import Express from 'express';
// // import morgan from 'morgan';

// import Post from './entities/Post.js';
// import NotFoundError from './errors/NotFoundError.js';

export default () => {
    const app = new Express();
    // app.use(morgan('combined'));
    app.set('view engine', 'pug');

    const posts = [
        new Post('hello', 'how are your?'),
        new Post('nodejs', 'story about nodejs'),
    ];

    app.get('/', (_req, res) => {
        res.render('index', { posts });
    });

    app.get('/posts/:id', (req, res, next) => {
        const post = posts.find((p) => p.id.toString() === req.params.id);
        if (post) {
            res.render('posts/show', { post });
        } else {
            next(new NotFoundError());
        }
    });

    // BEGIN (write your solution here)
    app.use((req, res, next) => {
        next(new Error('404'));
    });

    app.use((err, req, res, next) => {
        res.status(404);
        res.render('404.pug', { err });
        next();
    });
    // END

    return app;
};
