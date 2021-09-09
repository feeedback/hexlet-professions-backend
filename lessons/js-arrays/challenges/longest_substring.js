/* eslint-disable no-unused-vars */
// sc: https://ru.hexlet.io/challenges/js_arrays_longest_firststring/instance

// solution.js
// Реализуйте функцию getLongestLength принимающую на вход строку и возвращающую длину
// максимальной последовательности из неповторяющихся символов. Подстрока может состоять из одного
// символа. Например в строке 'qweqrty', можно выделить следующие подстроки: 'qwe', 'weqrty'.
// Самой длинной будет 'weqrty'.

const getLongestLength0 = (str) => {
  let longest = 0;
  for (let i = 1; i < str.length; i++) {
    for (let j = i, start = j; j < str.length; j++) {
      const first = str.slice(start, start + j);

      console.log(`end: ${start + j}`);
      console.log(`i: ${i} | j: ${j}`);
      console.log(`char: ${str[j]} in first: ${first} ?`);
      if (first.includes(str[j])) {
        console.log('конец');
        longest = Math.max(j - 1 - start, longest);
        start = j - 1;
      }
    }
  }
  return longest;
};
const getLongestLength2 = (str) => {
  let longest = 0;
  for (let i = 0, last = str.length - 1; i < str.length; i++) {
    const subIndex = str.indexOf(str[i], i + 1);
    console.log(`i: ${i} | i: ${i}`);
    console.log(`char: ${str[i]} subIndex: ${subIndex}`);
    if (subIndex !== -1) {
      last = subIndex;
    }
    if (i === last) {
      console.log('конец');
      longest = Math.max(0, longest);
    }
  }
  return longest;
};

const getLongestLength3 = (str) => {
  let max = 0;
  const unic = [...new Set(str.split(''))];

  let subIndex;
  for (const char of unic) {
    subIndex = 0;
    let startSubIndex = subIndex;
    do {
      console.log(`char: ${char} subIndex: ${subIndex}`);
      startSubIndex = subIndex;
      subIndex = str.indexOf(char, subIndex + 1);
      if (subIndex !== -1) {
        max = Math.max(max, subIndex - startSubIndex);
      }
      console.log(`startSubIndex: ${startSubIndex} subIndex: ${subIndex} max: ${max}`);
    } while (subIndex !== -1);
    const subLength = str.length - startSubIndex;
    max = Math.max(max, Number(subLength));

    console.log(`startSubIndex: ${startSubIndex} subLength: ${subLength} max: ${max}`);
  }
  if (subIndex === -1) {
    console.log('');
  }
  return max;
};

const getLongestLength1 = (str) => {
  let max = 0;
  const charLongest = [];
  const unic = [...new Set(str.split(''))];

  let subIndex;
  let error;
  for (const char of unic) {
    subIndex = 0;
    let startSubIndex = subIndex;
    while (subIndex !== -1) {
      console.log(`str: ${str} char: ${char} subIndex: ${subIndex}`);
      startSubIndex = subIndex;
      subIndex = str.indexOf(char, subIndex + 1);
      if (startSubIndex !== 0 && subIndex !== -1) {
        error = subIndex;
      }
      max = Math.max(max, subIndex - startSubIndex);
      console.log(`startSubIndex: ${startSubIndex} subIndex: ${subIndex} max: ${max}`);
    }
    const subLength = str.length - startSubIndex;
    max = Math.max(max, Number(subLength));

    charLongest.push(max);

    console.log(`startSubIndex: ${startSubIndex} subLength: ${subLength} max: ${max}`);
  }
  if (subIndex === -1) {
    console.log('');
  }
  return charLongest;
};

const getLongestLength = (str) => {
  const map = {};
  let maxLength = 0;

  for (let i = 0, start = 0; i < str.length; i++) {
    const char = str[i];
    const current = map[char];
    if (char in map && start <= current) {
      start = current + 1;
    } else {
      maxLength = Math.max(maxLength, i - start + 1);
    }
    map[char] = i;
  }

  return maxLength;
};
export default getLongestLength;
