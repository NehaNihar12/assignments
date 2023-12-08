/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    const vowelMatches = str.match(/[aeiou]/gi);
    return vowelMatches ? vowelMatches.length : 0;
}

module.exports = countVowels;