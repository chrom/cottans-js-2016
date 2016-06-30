module.exports = function add(numbersString) {
    let sum = 0, delimetr = '', text = '', negative = 0, main = [];
    if (numbersString === '') return 0;

    delimetr = numbersString.split(/^[\n\/\/\[]+(\S{1,3})[\]]/ig);
    if (delimetr.length > 0 && delimetr[1] === undefined) {
        delimetr = '\n,';
        text = numbersString;
    } else {
        text = delimetr[2];
        delimetr = delimetr[1];
    }
    var reg = new RegExp('[' + delimetr + ']', 'gi');
    main = text.split(reg);
    main.reduce((a, b) => {
        if (b < 0)
            negative.push(b);
    });
    if (negative.length > 0)
        throw 'negatives not allowed: ' + negative.join(',');

    return main.reduce((previousValue, currentValue) => {
            if (currentValue > 1000)
                return previousValue;
            else if (currentValue !== '')
                return previousValue + parseInt(currentValue);
            else
                return previousValue;
        }
        , 0);
}