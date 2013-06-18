var crimer = function (t) {
    if (!t.length) {
        return "";
    }

    var scale = Math.ceil(t.length / 100);
    
    // Eliminate doubled letters.
    t = t.replace(/(\w)\1/g, "$1");

    // Don't need no stinkin' possessives.
    t = t.replace(/'/g, "");
    
    // Double some letters randomly.
    var doubles = Math.floor(Math.random() * scale) + (2.0 * scale);
    for (var i = 0; i < doubles; i++) {
        var pos = Math.floor(Math.random() * t.length);
        var letter = t[pos];
        if (letter.match(/[\w\.!\?]/) && letter != t[pos - 1] && letter != t[pos + 1]) {
            t = t.substr(0, pos) + letter + t.substr(pos);
        }
    }

    // Eliminate spaces before 'the'.
    t = t.replace(/\s+the\b/i, "the");

    // Capitalize words randomly.
    var caps = Math.floor(Math.random() * (2.0 * scale)) + (2.0 * scale);
    var words = t.split(/\s+/);
    for (i = 0; i < caps; i++) {
        var pos = Math.floor(Math.random() * words.length);
        words[pos] = words[pos].replace(/^(.)/, function (l) {
            return l.toUpperCase();
        });
    }
    t = words.join(" ");

    // Randomly transpose some letters.
    var transpose = Math.floor(Math.random() * 4.0 * scale) + (2.0 * scale);
    for (i = 0; i < transpose; i++) {
        var pos = Math.floor(Math.random() * (t.length - 2)) + 1.0;
        if (t[pos].match(/\w/) && t[pos + 1].match(/\w/) && t[pos - 1].match(/\w/)) {
            t = t.substr(0, pos) + t[pos + 1] + t[pos] + t.substr(pos + 2);
        }
    }

    // E before I except sometimes.
    t = t.replace(/ie/gi, "ei");
    t = t.replace(/weird/gi, "wierd");

    // Mess with some simple words.
    t = t.replace(/\bI\b/ig, "Im");
    t = t.replace(/\bits\b/ig, "its is");
    t = t.replace(/\bit is\b/ig, "its is");
    
    // Remove useless unvoiced letters.
    t = t.replace(/mb\b/gi, "m");
    t = t.replace(/\bwh/gi, "w");
    t = t.replace(/wr/gi, "r");
    t = t.replace(/ght\b/gi, "te");
    t = t.replace(/ph/gi, "f");
    t = t.replace(/our/gi, "or");

    // Ensure names (followed by ':') are all caps.
    var words = t.split(/\s+/);
    for (i = 0; i < words.length; i++) {
        if (words[i].match(/:$/)) {
            words[i] = words[i].toUpperCase();
        }
    }
    t = words.join(" ");

    // Swap some vowels.
    var vowels = "aeiou";
    for (i = 0; i < t.length; i++) {
        if (t[i].match(/[aeiou]/) && Math.random() > 0.9) {
            vowels = vowels.replace(t[i], "");
            t = t.substr(0, i) + vowels[Math.floor(Math.random() * 4)] + t.substr(i + 1);
            vowels = "aeiou";
        }
    }
    
    // Add e or s to ends of some words.
    var words = t.split(/\s+/);
    for (i = 0; i < words.length; i++) {
        if (Math.random() > 0.7 && words[i].match(/\w$/) && words[i].length > 1 && !words[i].match(/[es]$/)) {
            var letter = ['e', 's'][Math.floor(Math.random() * 2)];
            words[i] += letter;
        }
    }
    t = words.join(" ");

    return t;
};
if (typeof module !== "undefined" && module.exports) {
    module.exports = crimer;
}
