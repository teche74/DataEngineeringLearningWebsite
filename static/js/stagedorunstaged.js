

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}

function toggleExplanation(id) {
    const elem = document.getElementById(id);
    elem.style.display = elem.style.display === "block" ? "none" : "block";
}

function updateDiff() {
    const unstaged = document.querySelectorAll('.unstaged:checked');
    const staged = document.querySelectorAll('.staged:checked');
    let output = "";

    if (unstaged.length > 0) {
        output += "🧾 git diff output:\n";
        unstaged.forEach(file => {
            output += `\n+ Modified: ${file.parentElement.textContent.trim()} (unstaged)\n`;
        });
    }

    if (staged.length > 0) {
        output += "\n🧾 git diff --staged output:\n";
        staged.forEach(file => {
            output += `\n+ Ready to commit: ${file.parentElement.textContent.trim()} (staged)\n`;
        });
    }

    if (output === "") {
        output = "No files selected yet.";
    }

    document.getElementById("diffOutput").textContent = output;
}



function copyCommands() {
    const commands = `echo "body { color: red; }" >> main.css
echo "console.log('Update');" >> app.js
git add main.css
git diff
git diff --staged`;
    navigator.clipboard.writeText(commands);
    document.getElementById("copyStatus").textContent = "✅ Commands copied!";
}

function checkAnswer(choice) {
    const result = document.getElementById("quizResult");
    if (choice === "a") {
        result.textContent = "✅ Correct! git diff shows unstaged changes.";
        result.style.color = "green";
    } else {
        result.textContent = "❌ Nope. git diff --staged shows only staged changes.";
        result.style.color = "red";
    }
}
