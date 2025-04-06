function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("open");
}

function commitFiles() {
    const files = document.querySelectorAll(".file");
    const log = document.getElementById("commit-log");

    files.forEach((file, index) => {
        // Animate file moving to the repo
        setTimeout(() => {
            const newFile = file.cloneNode(true);
            newFile.style.transform = "translateY(0)";
            log.appendChild(newFile);
        }, index * 500);

        // Animate removal from staging
        setTimeout(() => {
            file.style.opacity = 0;
        }, (index + 1) * 500);
    });
}


function revealAnswer(id) {
    document.getElementById(id).classList.toggle('hidden');
}


function checkQuiz() {
    const result = document.getElementById("quizResult");
    const selected = document.querySelector('input[name="q1"]:checked');
    
    if (!selected) {
        result.innerHTML = "❗ Please select an answer.";
        result.style.color = "orange";
        return;
    }

    const answer = selected.value;

    if (answer === "c") {
        result.innerHTML = "✅ Correct! <code>git commit -am \"msg\"</code> commits modified, tracked files without separate staging.";
        result.style.color = "green";
    } else {
        result.innerHTML = "❌ Incorrect. Hint: You need a command that adds and commits modified tracked files in one step.";
        result.style.color = "red";
    }
}