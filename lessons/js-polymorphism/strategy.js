/* eslint-disable max-classes-per-file */
// sc: https://ru.hexlet.io/courses/js-polymorphism/lessons/strategy/exercise_unit

// TicTacToe – известная игра в крестики нолики, на поле 3x3. В этом задании, вам
// предстоит реализовать данную игру. Основной движок игры находится в файле ticTacToe.js.
// В директории strategies находится код, который отвечает за поведение AI (искусственный
// интеллекта!). В зависимости от выбранного уровня игры, включается либо Easy стратегия,
// либо Normal.

// Задание специально построено так, чтобы предоставить вам максимальную свободу в
// организации кода. Результат будет хорошей лакмусовой бумажкой, по которой можно оценить
// насколько архитектурная тема была понята.

// TicTacToe.js
// Реализуйте класс TicTacToe, который представляет собой игру крестики-нолики. Принцип
// его работы описан в коде ниже:

// // По умолчанию выбран easy уровень. Его можно изменить, передав в конструктор строку
// 'normal'
// const game = new TicTacToe();

// // Если переданы аргументы, то ходит игрок. Первый аргумент – строка, второй – столбец.
// game.go(1, 1);
// // Ход компьютера
// game.go();

// game.go(0, 1);
// game.go();

// // Метод go возвращает true если текущий ход победный и false в ином случае
// const isWinner = game.go(2, 1); // true

// TicTacToe.js
/* eslint-disable class-methods-use-this */

// import Easy from './strategies/Easy.js';
// import Normal from './strategies/Normal.js';
const mappingAI = {
    easy: Easy,
    normal: Normal,
};
class TicTacToe {
    // BEGIN (write your solution here)
    constructor(difficulty = 'easy') {
        this.mesh = Array.from({ length: 3 }, () => new Array(3).fill(null));
        this.difficulty = difficulty;
        this.AI = new mappingAI[difficulty]();

        this.mappingPlayer = {
            human: { char: 'O', step: (coords) => coords },
            AI: { char: 'O', step: () => this.AI.go(this.mesh) },
        };
        this.isFirst = true;
    }

    checkEnd() {
        return !this.mesh.some((row) => row.includes(null));
    }

    isStreak(row, char) {
        return row.every((cell) => cell === char);
    }

    checkWin(char) {
        const { mesh } = this;
        const isRow = mesh.some((row) => this.isStreak(row, char));

        const isColl = mesh[0].some((_, x) => {
            const coll = [mesh[0][x], mesh[1][x], mesh[2][x]];
            return this.isStreak(coll, char);
        });

        const diagonal1 = [mesh[0][0], mesh[1][1], mesh[2][2]];
        const isDiagonal1 = this.isStreak(diagonal1, char);

        const diagonal2 = [mesh[2][0], mesh[1][1], mesh[0][2]];
        const isDiagonal2 = this.isStreak(diagonal2, char);

        return isRow || isColl || isDiagonal1 || isDiagonal2;
    }

    go(...coords) {
        const playerName = coords.length ? 'human' : 'AI';
        const player = this.mappingPlayer[playerName];
        if (this.isFirst) {
            player.char = 'X';
            this.isFirst = false;
        }

        const [y, x] = player.step(coords);
        this.mesh[y][x] = player.char;

        return this.checkWin(player.char) || this.checkEnd();
    }
    // END
}
export default TicTacToe;

// strategies/Easy.js
// Реализуйте стратегию, которая пытается заполнить поля, пробегаясь построчно слева
// направо и сверху вниз (начиная с левого верхнего угла). Как только она встречает
// свободное поле, то вставляет туда значение.

// strategies/Easy.js
/* eslint-disable class-methods-use-this */

class Easy {
    // BEGIN (write your solution here)
    go(mesh) {
        for (let y = 0; y < mesh.length; y++) {
            for (let x = 0; x < mesh[0].length; x++) {
                if (mesh[y][x] === null) {
                    return [y, x];
                }
            }
        }
    }
    // END
}
// export default Easy;

// strategies/Normal.js
// Реализуйте стратегию, которая пытается заполнить поля, пробегаясь построчно слева
// направо и снизу вверх (начиная с левого нижнего угла). Как только она встречает
// свободное поле, то вставляет туда значение.

// Подсказки
// Нумерация строк и столбцов игрового поля должна начинаться с левого верхнего угла.
// Кто отвечает за состояние игры, и где оно должно храниться?
// Не мудрите с проверкой победителя, реализуйте эту логику в лоб.

// strategies/Normal.js
/* eslint-disable class-methods-use-this */

class Normal {
    // BEGIN (write your solution here)
    go(mesh) {
        for (let y = mesh.length - 1; y >= 0; y--) {
            for (let x = 0; x < mesh[0].length; x++) {
                if (mesh[y][x] === null) {
                    return [y, x];
                }
            }
        }
    }
    // END
}

// export default Normal;
