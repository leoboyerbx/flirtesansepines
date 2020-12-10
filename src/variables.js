const variables = {
    dataColors: [ '#C8DEFB', '#5C90B6', '#031941', '#B62220'],
    dataColors2: [ '#B62220', '#5C90B6', '#C8DEFB', '#031941'],
    dataColors3: [ '#C8DEFB', '#5C90B6', '#fff', '#031941']
}

const getColorCode = function (index) {
    return this[index % this.length]
}

variables.dataColors.getColorCode = getColorCode
variables.dataColors2.getColorCode = getColorCode
variables.dataColors3.getColorCode = getColorCode
export default variables
