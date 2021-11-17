
function getDuplicatedItemsInNayose(lines) {
    const nonReferred = lines.filter(Boolean).filter(line => !line.match(/（.+?）/));
    const referred = lines.filter(Boolean).filter(line => line.match(/（.+?）/));
    return referred.map(line => {
        const basename = line.replace(/（.+?）.+$/, "");
        const grep = nonReferred.filter(line => line.replace(/　　.+$/, "") == basename);
        if (grep.length > 0) {
            return [line].concat(grep);
        }
        return null;
    }).filter(Boolean);
}