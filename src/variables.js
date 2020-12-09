const variables = {
    dataColors: [ '#C8DEFB', '#5C90B6', '#031941', '#FFFF']
}

variables.dataColors.getColorCode = function (index) {
    return variables.dataColors[index % variables.dataColors.length]
}
export default variables
