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
    t.is(add('//;\n1;2'), 1);
});




