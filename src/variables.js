const variables = {
    dataColors: [ '#C8DEFB', '#5C90B6', '#031941', '#B62220']
}

variables.dataColors.getColorCode = function (index) {
    return variables.dataColors[index % variables.dataColors.length]
}
export default variables
