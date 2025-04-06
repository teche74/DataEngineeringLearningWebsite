const files = [
    ".env",
    "index.html",
    "debug.log",
    "keep.log",
    "notes.txt",
    "src/app.js",
    "src/utils/helper.js",
    "src/keep.txt",
    "build/output.log",
    "build/static/js/app.js"
];

function matchesPattern(file, pattern) {
    const isNegation = pattern.startsWith("!");
    if (isNegation) pattern = pattern.slice(1);

    const escPattern = pattern.replace(/\./g, "\\.");

    const regexPattern = escPattern
        .replace(/\*\*/g, ".*")
        .replace(/\*/g, "[^/]*")
        .replace(/\//g, "/");

    const regex = new RegExp("^" + regexPattern + (pattern.endsWith("/") ? ".*" : "") + "$");

    return { negate: isNegation, regex, pattern };
}
function updateFileList() {
    const input = document.getElementById("patternInput").value.trim();
    const list = document.getElementById("fileList");
    const feedback = document.getElementById("feedbackSection");

    list.innerHTML = "";
    feedback.innerHTML = "";

    const patterns = input.length > 0
        ? input.split(/\n|,/).map(p => p.trim()).filter(Boolean)
        : [];

    const status = {}; // true = visible, false = ignored
    files.forEach(file => status[file] = true); // by default visible

    const matchedFeedback = [];

    // Only apply patterns if there are any
    if (patterns.length > 0) {
        for (const pattern of patterns) {
            const isNegation = pattern.startsWith("!");
            const rawPattern = isNegation ? pattern.slice(1) : pattern;

            const escPattern = rawPattern.replace(/\./g, "\\.");
            const regexPattern = escPattern
                .replace(/\*\*/g, ".*")
                .replace(/\*/g, "[^/]*")
                .replace(/\//g, "/");
            const regex = new RegExp("^" + regexPattern + (rawPattern.endsWith("/") ? ".*" : "") + "$");

            for (const file of files) {
                if (regex.test(file)) {
                    status[file] = isNegation ? true : false;
                    matchedFeedback.push(`<li><code>${file}</code> ${isNegation ? "❌ restored" : "🚫 ignored"} by pattern <code>${pattern}</code></li>`);
                }
            }
        }
    }

    // Render all files
    files.forEach(file => {
        const div = document.createElement("div");
        div.className = "file-item" + (!status[file] ? " excluded" : "");
        div.innerText = file;
        list.appendChild(div);
    });

    feedback.innerHTML = matchedFeedback.length
        ? `<h3>🧠 Feedback:</h3><ul>${matchedFeedback.join("")}</ul>`
        : (patterns.length === 0
            ? `<p>Start typing a pattern like <code>*.log</code>, <code>build/</code>, etc. to test which files are ignored.</p>`
            : `<p>No matches found for your pattern(s).</p>`);
}


document.addEventListener("DOMContentLoaded", () => {
    updateFileList();
});

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}