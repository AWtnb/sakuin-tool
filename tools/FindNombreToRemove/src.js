
function grepNombredReference(lines) {
    return lines.filter(line => line.match(/→.*\d/));
}