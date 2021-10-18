
function grepNombredReference(lines) {
    return lines.filter(line => line.match(/→.*\d/));
}

function grepItemToAddNombre(lines, references) {
    const refMap = new Map();
    references.map(line => line.replace(/^.+?→\s*/, "")).forEach(line => {
        const [item, nombre, ...rest] = line.split("　　");
        if (refMap.has(item)) {
            refMap.set(item, refMap.get(item).concat(nombre));
        }
        else {
            refMap.set(item, [nombre]);
        }
    });
    const baseItems = lines.filter(Boolean).filter(line => line.indexOf("→") < 0).map(line => {
        const [item, nombre, ...rest] = line.split("　　");
        return {
            "Name": item,
            "Basename": item.replace(/(（.+?）)/, ""),
            "Nombres": nombre.split(", ")
        }
    });
    return baseItems.filter(item => refMap.has(item.Basename)).map(item => {
        const nsOrigin = item.Nombres.map(n => String(n));
        const nsToAdd = refMap.get(item.Basename).map(n => String(n));
        return {
            "ReferTo": item.Name,
            "NombreToAdd": nsToAdd.map(s => {
                if (nsOrigin.indexOf(s) != -1) {
                    return `<span style="color:#aaa">${s}</span>`;
                }
                return s;
            }).join(", ")
        }
    });
}