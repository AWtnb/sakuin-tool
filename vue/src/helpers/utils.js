export class Util {

    static toHalfWidth(str) {
        return str.replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }

    static toKatakana(str){
        return str.replace(/[\u3041-\u3096]/g, function(match) {
            const chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
    }

    static toHiragana(str){
        return str.replace(/[\u30a1-\u30f6]/g, function(match) {
            const chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
    }

}