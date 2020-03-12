// sc: https://ru.hexlet.io/challenges/js_arrays_reverse_polish_notation/instance

// В данном упражнении необходимо реализовать стековую машину, то есть алгоритм, проводящий
// вычисления по обратной польской записи.

// Обратная польская нотация или постфиксная нотация — форма записи математических и логических
// выражений, в которой операнды расположены перед знаками операций. Выражение читается слева
// направо. Когда в выражении встречается знак операции, выполняется соответствующая операция над
// двумя ближайшими операндами, находящимися слева от знака операции. Результат операции заменяет в
// выражении последовательность её операндов и знак, после чего выражение вычисляется дальше по тому
// же правилу. Таким образом, результатом вычисления всего выражения становится результат последней
// вычисленной операции.

// Например, выражение (1 + 2) * 4 + 3 в постфиксной нотации будет выглядеть так: 1 2 + 4 * 3 +, а
// результат вычисления: 15. Другой пример - выражение: 7 - 2 * 3, в постфиксной нотации: 7 2 3 * -,
// результат: 1.

// solution.js
// Реализуйте функцию calcInPolishNotation, которая принимает массив, каждый элемент
// которого содержит число или знак операции (+, -, *, /). Функция должна вернуть результат
// вычисления по обратной польской записи. Экспортируйте функцию по умолачнию.

const calcInPolishNotation1 = (str) => {
    let res = str.slice();
    const operations = {
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    };
    let i = 0;
    while (res.length > 1) {
        const char = res[i];
        if (char in operations) {
            const n1 = res[i - 2];
            const n2 = res[i - 1];
            const result = operations[char](n1, n2);
            const left = res.slice(0, i - 2 || 0);
            const right = res.slice(i + 1);
            res = [...left, result, ...right];
            i = 0;
        } else {
            i += 1;
        }
    }
    return res[0];
};
const calcInPolishNotation11 = (array) => {
    const stack = [];
    const operators = {
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    };
    for (const value of array) {
        if (!(value in operators)) {
            stack.push(value);
            continue;
        }

        const b = stack.pop();
        const a = stack.pop();
        stack.push(operators[value](a, b));
    }

    return stack.pop();
};
const calcInPolishNotation = (array) => {
    const stack = [];
    const operators = {
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    };
    for (const value of array) {
        if (value in operators) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[value](a, b));
        } else {
            stack.push(value);
        }
    }
    return stack.pop();
};
console.log(calcInPolishNotation([7, 2, 3, '*', '-']));
