
function getReading(tokens) {
    return tokens.reduce((accum, token) => {
        console.log(token.surface_form, token.word_type, token.pos, token.reading);
        const surface = token.surface_form;
        if (surface.replace(/[a-zA-Zァ-ヴー・]/g, "").length < 1) {
            return accum + surface;
        }
        if (token.pos == "記号") {
            return accum + surface;
        }
        if (token.word_type != "KNOWN") {
            return accum + token.surface_form;
        }
        return accum + token.reading;
    }, "");
}

export class Reading {
    constructor(tokenizer) {
        this.tokenizer = tokenizer;
    }
    parseLines(lines) {
        return lines.map(line => {
            const tokens = this.tokenizer.tokenize(line);
            return {
                "item": line,
                "reading": getReading(tokens)
            }
        });
    }
}