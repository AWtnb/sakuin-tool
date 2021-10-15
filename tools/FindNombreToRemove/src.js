
function grepNombredReference(lines) {
    return lines.filter(line => line.match(/→.*\d/));
}

function grepItemToAddNombre(lines) {
    return lines.map(line => line.replace(/^.+?→\s*/)).map(line => {
        const [item, nombre, ...rest] = line.split("　　");
        return {
            "ReferTo": item,
            "Nombre": nombre
        }
    });
}