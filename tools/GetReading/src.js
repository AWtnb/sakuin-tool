class Reading {
    static getReading(token) {
        console.log(token.surface_form, token.word_type, token.pos, token.reading);
        const surface = token.surface_form;
        if (surface.match(/([a-zA-Z]|[ァ-ヴー・])+/g)) {
            return surface;
        }
        if (token.pos == "記号") {
            return surface;
        }
        if (token.word_type != "KNOWN") {
            return token.surface_form;
        }
        return token.reading;
    }

    static tokenizeLines(tokenizer, lines) {
        return lines.map(line => {
            const reading = tokenizer.tokenize(line).map( Reading.getReading ).join("");
            return {
                "Item": line,
                "Reading": reading
            }
        });
}
}