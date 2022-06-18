class IndexTemplate {
    static format(lines) {
        const arr = [];
        lines.filter(x => x.trim()).forEach(line => {
            const [nombre, item, referTo, ...rest] = line.split("\t").map(x => x.trim());
            const nStr = String(Util.toHalfWidth(nombre));
            if (String(referTo).length > 0) {
                arr.push({
                    "Nombre": "",
                    "Item": `${item}　→${referTo}`,
                });
                arr.push({
                    "Nombre": nStr,
                    "Item": `${referTo}（${item}）`,
                });
            }
            else {
                if (String(item).length > 0) {
                    arr.push({
                        "Nombre": nStr,
                        "Item": item,
                    });
                }
            }
        });
        return arr;
    }
}