import test from 'ava';
import add from './index';


test('Should return 0 if empty string', t => {
    t.is(add(''), 0);
});

test('Should return number if one number', t => {
    t.is(add('5'), 5);
});

test('Should return sum  if in string some number', t => {
    t.is(add('5, 6'), 11);
});

test('Allow the Add method to handle an unknown amount of numbers', t => {
    t.is(add('5, 6, 12,2,45.2'), 70);
});

test('Allow the Add method to handle new lines between numbers (instead of commas).', t => {
    t.is(add('5,6,12\n2,45'), 70);
});

test('Allow the Add method to handle new lines between numbers (instead of commas). "1,\n"', t => {
    t.is(add('1,\n'), 1);
});

test('Support different delimiters to change a delimiter, ' +
    'the beginning of the string will contain a separate line that looks like this:   ' +
    '“//[delimiter]\n[numbers…]” for example “//;\n1;2” should return three where the default delimiter is ‘;’ .', t => {
    t.is(add('//;\n1;2'), 3);
});

test('4.2 the first line is optional. all existing scenarios should still be supported', t => {
    t.is(add('\n//;\n1;2'), 3);
});

test('Calling Add with a negative number will throw an exception “negatives not allowed” - ' +
    'and the negative that was passed. if there are multiple negatives, show all of them in the exception message', t => {
    t.throws(function(){add('//;-1;-2')}, Error, 'negatives not allowed');
});

test('Numbers bigger than 1000 should be ignored, so adding 2 + 1001  = 2', t => {
    t.is(add('//;1;2;1002'), 3);
});

test('Delimiters can be of any length with the following format:' +
    '  “//[delimiter]\n” for example: “//[***]\n1***2***3” should return 6', t => {
    t.is(add('//[***]\n1***2***3'), 6);
});




