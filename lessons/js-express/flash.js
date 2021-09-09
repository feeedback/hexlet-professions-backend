// sc: https://ru.hexlet.io/courses/js-express/lessons/flash/exercise_unit

// flash.js
// Реализуйте мидлвару flash, которая предоставляет соответствующую функциональность.

// // Подключение
// import flash from './flash.js';

// // После подключения сессий
// app.use(flash());

// // Использование
// res.flash('info', `Welcome, ${user.nickname}!`);
// // Вывод в шаблоне
// for message in flash
//   .alert(class=`alert-${message.type}`)
//     = message.message

// BEGIN (write your solution here)
export default () => (req, res, next) => {
  if (!('session' in req)) {
    throw new Error('a req.session is required!');
  }

  // при следующем запросе, берутся данные из глобальной переменной для сессии
  res.locals.flash = req.session.flash ?? [];
  req.session.flash = [];

  // вызываем функцию для записи в флэш, записывается в глобальную переменную для сессии
  res.flash = (type, message) => {
    req.session.flash.push({
      type,
      message,
    });
  };

  next();
};
// END
