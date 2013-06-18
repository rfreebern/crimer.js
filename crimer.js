var crimer = function (t) {
    var scale = Math.ceil(t.length / 50);
    
    // Eliminate doubled letters.
    t = t.replace(/(\w)\1/g, "$1");

    // Don't need no stinkin' possessives.
    t = t.replace(/'/g, "");
    
    // Double some letters randomly.
    var doubles = Math.floor(Math.random() * 2 * scale) + 2 * scale;
    for (var i = 0; i < doubles; i++) {
        var pos = Math.floor(Math.random() * t.length);
        var letter = t[pos];
        t = t.substr(0, pos) + letter + t.substr(pos);
    }

    // Eliminate spaces before 'the'.
    t = t.replace(/\s+the\b/i, "the");

    // Capitalize words randomly.
    var caps = Math.floor(Math.random() * 2 * scale) + 2 * scale;
    var words = t.split(/\s+/);
    for (i = 0; i < caps; i++) {
        var pos = Math.floor(Math.random() * words.length);
        words[pos] = words[pos].replace(/^(.)/, function (l) {
            return l.toUpperCase();
        });
    }
    t = words.join(" ");

    // Randomly transpose some letters.
    var transpose = Math.floor(Math.random() * 6 * scale) + 6 * scale;
    for (i = 0; i < transpose; i++) {
        var pos = Math.floor(Math.random() * t.length - 1);
        var aletter = t[pos];
        t[pos] = t[pos + 1];
        t[pos + 1] = aletter;
    }

    // E before I except sometimes.
    t = t.replace(/ie/gi, "ei");
    t = t.replace(/weird/gi, "wierd");

    // Mess with some simple words.
    t = t.replace(/\bI\b/ig, "Im");
    t = t.replace(/\bit is\b/ig, "its is");
    t = t.replace(/\bits\b/ig, "its is");
    
    // Remove useless unvoiced letters.
    t = t.replace(/mb\b/gi, "m");
    t = t.replace(/\bwh/gi, "w");
    t = t.replace(/wr/gi, "r");
    t = t.replace(/ght\b/gi, "te");
    t = t.replace(/ph/gi, "f");
    t = t.replace(/our/gi, "or");
    t = t.replace(/ou/gi, "ow");

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
        if (t[i].match(/[aeiou]/) && Math.random() > 0.85) {
            vowels = vowels.replace(t[i], "");
            t = t.substr(0, i) + vowels[Math.floor(Math.random() * 4)] + t.substr(i + 1);
            vowels = "aeiou";
        }
    }
    
    // Add e or s to ends of some words.
    var words = t.split(/\s+/);
    for (i = 0; i < words.length; i++) {
        if (Math.random() > 0.6 && words[i].match(/\w$/)) {
            var letter = ['e', 's'][Math.floor(Math.random()) + 1];
            words[i] += letter;
        }
    }
    t = words.join(" ");

    return t;
};
if (typeof module !== "undefined" && module.exports) {
    module.exports = crimer;
}
