// sc:
// https://ru.hexlet.io/courses/js-polymorphism/lessons/breaking-polymorphism/exercise_unit

// helpers.js
// Реализуйте и экспортируйте по умолчанию функцию getGreeting(user), которая возвращает
// приветствие для пользователя. Это приветствие показывается пользователю на сайте. Если
// пользователь гость, то выводится "Nice to meet you Guest!", если не гость, то "Hello
// <Имя>!", где "<Имя>" это имя реального пользователя.

// В этой задаче, способ решения остается на ваше усмотрение. Используйте знания
// полученные в этом курсе.

// import Guest from '../Guest.js';
// import User from '../User.js';
// import getGreeting from '../helpers.js';

// const guest = new Guest();
// getGreeting(guest); // 'Nice to meet you Guest!'

// const user = new User('Petr');
// getGreeting(user); // 'Hello Petr!'

// Подсказки
// Изучите тесты

// helpers.js
const mapping = {
    guest: (guest) => `Nice to meet you ${guest.getName()}!`,
    user: (user) => `Hello ${user.getName()}!`,
};

const getGreeting = (someUser) => mapping[someUser.getTypeName()](someUser);
export default getGreeting;

// Guest.js
export default class Guest {
    constructor() {
        this.name = 'Guest';
        // BEGIN (write your solution here)
        this.typeName = 'guest';
        // END
    }

    getName() {
        return this.name;
    }

    // BEGIN (write your solution here)
    getTypeName() {
        return this.typeName;
    }
}

// User.js
export default class User {
    constructor(name) {
        this.name = name;
        // BEGIN (write your solution here)
        this.typeName = 'user';
        // END
    }

    getName() {
        return this.name;
    }

    // BEGIN (write your solution here)
    getTypeName() {
        return this.typeName;
    }
}
