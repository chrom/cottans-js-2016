

module.exports = function add(numbersString) {
    let sum = 0;
    if (numbersString === '') return 0;

    return numbersString.split(/[\n,]/gi).reduce((previousValue, currentValue) => {
            if (currentValue !== '')
                return previousValue + parseInt(currentValue);
            else
                return previousValue;
        }
    , 0);
}