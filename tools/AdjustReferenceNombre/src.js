
function grepNombredReference(lines) {
    return lines.filter(line => line.match(/→.*\d/));
}

function grepItemToAddNombre(lines, references) {
    const refMap = new Map();
    references.map(line => line.replace(/^.+?→\s*/, "")).forEach(line => {
        const [item, nombre, ...rest] = line.split("　　");
        if (refMap.has(item)) {
            refMap.set(item, refMap.get(item).concat(nombre))
        }
        else {
            refMap.set(item, [nombre]);
        }
    });
    const baseItems = lines.map(line => line.replace(/(（.+?）)?　　.+$/, ""));
    const uniq = Array.from(new Set(baseItems));
    return uniq.filter(item => refMap.has(item)).map(line => {
        return {
            "ReferTo": line,
            "NombreToAdd": refMap.get(line)
        }
    });
}