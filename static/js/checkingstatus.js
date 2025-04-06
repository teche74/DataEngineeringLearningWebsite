// Quiz Functionality
function checkAnswer(button, choice) {
    const correct = "C";
    const result = document.getElementById("quiz-result");
    if (choice === correct) {
        result.textContent = "✅ Correct! '??' means Untracked file in Git.";
        result.style.color = "#00ff00";
    } else {
        result.textContent =
            "❌ Incorrect. Hint: It indicates files that are not tracked by Git.";
        result.style.color = "#ff4444";
    }
}

// Simulator Functionality: Enter a command in the input box
function simulateInput(event) {
    if (event.key === "Enter") {
        const input = document.getElementById("sim-input");
        const output = document.getElementById("sim-output");
        const cmd = input.value.trim();

        if (cmd === "git status") {
            output.innerHTML =
                `<strong>Verbose Output:</strong><br>
                <pre>
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
    new file:   staged_file.py

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
    modified:   modified_file.py

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    new_file.py
                </pre>
                <p><em>Verbose output provides detailed status, including staged, unstaged, and untracked files.</em></p>`;

        } else if (cmd === "git status -s" || cmd === "git status --short") {
            output.innerHTML =
                `<strong>Short Output:</strong><br>
                <pre>
?? new_file.py
A  staged_file.py
 M modified_file.py
                </pre>
                <p><em>Short status is a concise format showing symbols for each file state:<br>
                - <code>??</code> = Untracked file<br>
                - <code>A</code>  = Added to staging<br>
                - <code>M</code>  = Modified but not staged</em></p>`;

        } else {
            output.textContent =
                "❌ Command not recognized. Try 'git status' or 'git status -s'.";
        }

        input.value = "";
    }
}
