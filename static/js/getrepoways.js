// function restartSlides() {
//     window.scrollTo({ top: 0, behavior: "smooth" });
// }

// document.addEventListener("DOMContentLoaded", function () {
//     const sections = document.querySelectorAll("section");
//     let currentSectionIndex = 0;
//     let isScrolling = false;

//     function scrollToSection(index) {
//         if (index >= 0 && index < sections.length) {
//             isScrolling = true;
//             sections[index].scrollIntoView({ behavior: "smooth" });
//             currentSectionIndex = index;
//             setTimeout(() => {
//                 isScrolling = false;
//             }, 800); // Prevent rapid scrolling
//         }
//     }

//     document.addEventListener("wheel", (event) => {
//         if (isScrolling) return;
//         if (event.deltaY > 0) {
//             scrollToSection(currentSectionIndex + 1);
//         } else {
//             scrollToSection(currentSectionIndex - 1);
//         }
//     });

//     document.addEventListener("keydown", (event) => {
//         if (isScrolling) return;
//         if (event.key === "ArrowDown") {
//             scrollToSection(currentSectionIndex + 1);
//         } else if (event.key === "ArrowUp") {
//             scrollToSection(currentSectionIndex - 1);
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    const outputDiv = document.getElementById("output");
    const commandInput = document.getElementById("command");
    const gitFolder = document.getElementById("gitFolder");
    const clonedRepo = document.getElementById("clonedRepo");
    const learningContainer = document.getElementById("learningContainer");

    let step = 0; // Track the learning step

    // Function to show the learning container when starting
    function startLearning() {
        learningContainer.classList.remove("hidden");
        outputDiv.innerHTML +=
            "<p><strong>Step 1:</strong> Run <code>git init</code> to create a local repo.</p>";
    }

    // Function to handle user input in the terminal
    function handleCommand(event) {
        if (event.key === "Enter") {
            executeCommand(commandInput.value.trim());
            commandInput.value = "";
        }
    }

    // Function to execute terminal commands and show step-by-step progress
    function executeCommand(command) {
        let response = "";

        if (step === 0 && command === "git init") {
            response = "Initialized empty Git repository in /MyProject/.git/";
            gitFolder.classList.remove("hidden");
            step++;
            outputDiv.innerHTML += `<p><span class="prompt">$</span> ${command}</p><p>${response}</p>`;
            outputDiv.scrollTop = outputDiv.scrollHeight;
            outputDiv.innerHTML += `<p>✅ Success! Now, proceed to the next step.</p>`;
            outputDiv.innerHTML += `<p><strong>Step 2:</strong> Try <code>git clone \n url : "https://github.com/user/repo.git</code>"</p>`;
        } else if (step === 1 && command.startsWith("git clone")) {
            response =
                "Cloning into 'ClonedRepo'...\nRemote repository cloned successfully.";
            clonedRepo.classList.remove("hidden");
            step++;
            outputDiv.innerHTML += `<p><span class="prompt">$</span> ${command}</p><p>${response}</p>`;
            outputDiv.scrollTop = outputDiv.scrollHeight;
            outputDiv.innerHTML += `<p>✅ Success! You have cloned a repo.</p>`;
            outputDiv.innerHTML += `<p><strong>Step 3:</strong> Explore the <code>.git</code> folder for repository metadata. (hint : use ls command)</p>`;
        } else if (step === 2 && command === "ls .git") {
            response = "HEAD\nconfig\nobjects\nrefs";
            outputDiv.innerHTML += `<p><span class="prompt">$</span> ${command}</p><p>${response}</p>`;
            outputDiv.scrollTop = outputDiv.scrollHeight;
            outputDiv.innerHTML += `<p>🎉 Great! You've explored the .git folder.</p>`;
            step++;
        } else {
            response = `Unknown command: ${command}`;
        }
    }

    // Expose the function globally
    window.handleCommand = handleCommand;
    window.startLearning = startLearning;
});


function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}