function escapeMeta(str) {
    return str.replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&");
}

function toHankaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

function copyTable(tableElem) {
    const range = document.createRange();
    range.selectNodeContents(tableElem);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
    alert("コピーしました！");
}

function resetTable(tableElem) {
    const maxRow = tableElem.rows.length;
    if (maxRow > 1) {
        for (let r = maxRow - 1; r >= 1; r--) {
            tableElem.deleteRow(r);
        }
    }
}
