function formatTemplare(lines) {
    const arr = [];
    lines.filter(Boolean).filter(line => line.replace(/\s/g, "")).forEach(line => {
        const [nombre, item, referTo, ...rest] = line.split("\t");
        if (String(referTo).length > 0) {
            arr.push({
                "Nombre": "",
                "Item": `${item}　→${referTo}`,
            });
            arr.push({
                "Nombre": String(nombre),
                "Item": `${referTo}（${item}）`,
            });
        }
        else {
            arr.push({
                "Nombre": String(nombre),
                "Item": item,
            });
        }
    });
    return arr;
}