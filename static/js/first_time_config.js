const typingSound = document.getElementById("type-sound");
const beepSound = document.getElementById("beep-sound");

function typeEffect(command, delay, callback) {
    let index = 0;
    typingSound.loop = true;
    typingSound.play();
    let interval = setInterval(() => {
        if (index < command.length) {
            document.getElementById("output1").innerHTML += command.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            typingSound.pause();
            typingSound.currentTime = 0;
            if (callback) setTimeout(callback, 500);
        }
    }, delay);
}

function showProgressDots(outputId, callback) {
    let dots = "executing";
    let count = 0;
    let outputElement = document.getElementById(outputId);
    let interval = setInterval(() => {
        dots += ".";
        outputElement.innerHTML = dots;
        count++;
        if (count === 6) {
            clearInterval(interval);
            beepSound.play();
            outputElement.innerHTML = "";
            if (callback) callback();
        }
    }, 300);
}

function explainOutput1() {
    const explanation1 = document.getElementById("explanation1");
    explanation1.innerHTML = `
        <h3>Explanation:</h3>
        <p><strong>git config:</strong></p>
        <ul>
            <li>This command helps get and set configuration variables that determine how Git behaves.</li>
            <li>It is used to define your identity (name and email) and other preferences like your editor or merge tool.</li>
            <li>When you use <strong>git config</strong>, you're either setting or retrieving these settings.</li>
        </ul>
        <p><strong>git config --list:</strong></p>
        <ul>
            <li>This command lists all the Git configuration settings currently in effect, including system-wide, user-specific, and repository-specific settings.</li>
            <li>It shows values like <strong>user.name</strong>, <strong>user.email</strong>, and other preferences like <strong>core.editor</strong>.</li>
            <li>The output includes configuration from <strong>/etc/gitconfig</strong> (system-wide), <strong>~/.gitconfig</strong> (user-specific), and repository-level configuration files.</li>
        </ul>
        <p><strong>git config --list --show-origin:</strong></p>
        <ul>
            <li>This command is similar to <strong>git config --list</strong>, but it also shows where each configuration value was set (which file).</li>
            <li>It helps identify whether a setting is coming from the system configuration file, user configuration file, or repository-specific configuration.</li>
            <li>For example, it might show something like <strong>file:/etc/gitconfig</strong> for system-wide settings or <strong>file:/home/user/.gitconfig</strong> for user-specific settings.</li>
        </ul>
    `;
}

function executeStep1() {
    typeEffect(
        "$ git config \n$ git config --list  \n$ git config --list --show-origin\n",
        50,
        () => {
            document.getElementById("show-output1").style.display = "inline-block";
        }
    );
}

document.getElementById("show-command1").addEventListener("click", () => {
    document.getElementById("output1").innerHTML = ""; // Clear terminal before showing new command
    document.getElementById("show-command1").style.display = "none"; // Hide the button
    executeStep1();
});

document.getElementById("show-output1").addEventListener("click", () => {
    showProgressDots("output1", () => {
        typeEffect("$ git config --list\n", 50, () => {
            const output1 = `\n->diff.astextplain.textconv=astextplain\n->filter.lfs.clean=git-lfs clean -- %f\n->filter.lfs.smudge=git-lfs smudge -- %f\n->filter.lfs.process=git-lfs filter-process\n->filter.lfs.required=true\n->http.sslbackend=openssl\n->http.sslcainfo=C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt\n->core.autocrlf=true\n->core.fscache=true\n->core.symlinks=false\n->pull.rebase=false\n->credential.helper=manager\n->credential.https://dev.azure.com.usehttppath=true\n->init.defaultbranch=master\n->user.email=xyz@gmail.com\n->user.name=xyz\n\n `;
            document.getElementById('output1').innerHTML += output1; 
            typeEffect("$ git config --list --show-origin\n", 50, () => {
                const output2 = `->file:C:/Program Files/Git/etc/gitconfig diff.astextplain.textconv=astextplain\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.clean=git-lfs clean -- %f\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.smudge=git-lfs smudge -- %f\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.process=git-lfs filter-process\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.required=true\n->file:C:/Program Files/Git/etc/gitconfig http.sslbackend=openssl\n->file:C:/Program Files/Git/etc/gitconfig http.sslcainfo=C:/Program Files/Git/mingw64/ssl\n/certs/ca-bundle.crt\n->file:C:/Program Files/Git/etc/gitconfig core.autocrlf=true\n->file:C:/Program Files/Git/etc/gitconfig core.fscache=true\n->file:C:/Program Files/Git/etc/gitconfig core.symlinks=false\n->file:C:/Program Files/Git/etc/gitconfig pull.rebase=false\n->file:C:/Program Files/Git/etc/gitconfig credential.helper=manager\n->file:C:/Program Files/Git/etc/gitconfig credential.https://dev.azure.com.usehttppath=true\n->file:C:/Program Files/Git/etc/gitconfig init.defaultbranch=master\n->file:C:/Users/ujjwa/.gitconfig user.email=xyz@gmail.com\n->file:C:/Users/ujjwa/.gitconfig user.name=xyz\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.smudge=git-lfs smudge -- %f\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.process=git-lfs filter-process\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.required=true\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.clean=git-lfs clean -- %f\n->file:C:/Users/ujjwa/.gitconfig credential.helper=manager`;
                document.getElementById('output1').innerHTML += output2;
                explainOutput1(); 
            });
        });
    });
});


// function 2

function explainOutput2() {
    const explanation2 = document.getElementById("explanation2");
    explanation2.innerHTML = `
        <h3>Explanation:</h3>

        <p><strong>git config --global user.name</strong></p>
        <ul>
            <li>This command sets your name in the global Git configuration, which is used to identify you as the author of commits.</li>
            <li>It applies to all repositories on the system unless overridden by a repository-specific configuration.</li>
            <li>For example, running <code>git config --global user.name "John Doe"</code> sets your name globally.</li>
            <li>You can retrieve the stored name using <code>git config --global user.name</code>.</li>
        </ul>

        <p><strong>git config --global user.email</strong></p>
        <ul>
            <li>This command sets your email address in the global Git configuration.</li>
            <li>The email is used to associate commits with your identity, which is important when pushing to remote repositories.</li>
            <li>For example, running <code>git config --global user.email "johndoe@example.com"</code> stores the email globally.</li>
            <li>You can retrieve the stored email using <code>git config --global user.email</code>.</li>
        </ul>

        <p><strong>--global</strong></p>
        <ul>
            <li>The <code>--global</code> flag applies the configuration change to the global Git configuration file <code>~/.gitconfig</code> or <code>~/.config/git/config</code>.</li>
            <li>Any repository you work with will use these settings unless overridden by local configurations.</li>
            <li>For example, <code>git config --global core.editor "vim"</code> sets Vim as the default editor globally.</li>
        </ul>

        <p><strong>--local</strong></p>
        <ul>
            <li>The <code>--local</code> flag applies the configuration change only to the specific Git repository where the command is run.</li>
            <li>Local settings are stored in the <code>.git/config</code> file inside the repository and override global settings.</li>
            <li>For example, running <code>git config --local user.name "Project-Specific Name"</code> sets a different name for a single repository.</li>
        </ul>
    `;
}


function typeEffect2(command, delay, callback) {
    let index = 0;
    typingSound.loop = true;
    typingSound.play();
    let interval = setInterval(() => {
        if (index < command.length) {
            document.getElementById("output2").innerHTML += command.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            typingSound.pause();
            typingSound.currentTime = 0;
            if (callback) setTimeout(callback, 500);
        }
    }, delay);
}

function executeStep2() {
    typeEffect2(
        "$ git config --global user.name <enter your username here>  \n$ git config --global user.email <enter your email address>\n",
        50,
        () => {
            document.getElementById("show-output2").style.display = "inline-block";
        }
    );
}

document.getElementById("show-command2").addEventListener("click", () => {
    document.getElementById("output2").innerHTML = ""; 
    document.getElementById("show-command2").style.display = "none"; 
    executeStep2();
});

document.getElementById("show-output2").addEventListener("click", () => {
    showProgressDots("output2", () => {
        typeEffect2("Now to verify whether these variables are set do : \n\n $ git config --global user.name \n", 50, () => {
            const output1 = `xyz\n\n`;
            document.getElementById('output2').innerHTML += output1; 
            typeEffect2("\n $ git config --global user.email \n", 50, () => {
                const output2 = `xyz74@gmail.com`;
                document.getElementById('output2').innerHTML += output2;
                explainOutput2(); 
            });
        });
    });
});


// function 3
function explainOutput3() {
    const explanation3 = document.getElementById("explanation3");
    explanation3.innerHTML = `
        <h3>Explanation:</h3>

        <p><strong>git config --global core.editor</strong></p>
        <ul>
            <li>This command sets the default text editor for Git globally.</li>
            <li>It ensures that Git opens the specified editor when requiring user input, such as writing commit messages.</li>
            <li>For example, running <code>git config --global core.editor "vim"</code> sets Vim as the default editor globally.</li>
            <li>You can verify the configured editor using <code>git config --global core.editor</code>.</li>
        </ul>

        <p><strong>Supported Editors</strong></p>
        <ul>
            <li><code>vim</code>: A powerful, widely used text editor.</li>
            <li><code>nano</code>: A simple and beginner-friendly editor.</li>
            <li><code>emacs</code>: A highly customizable and extensible editor.</li>
            <li><code>code --wait</code>: Uses Visual Studio Code as the Git editor.</li>
            <li><code>subl --wait</code>: Uses Sublime Text as the Git editor.</li>
            <li><code>notepad.exe</code>: Uses Notepad on Windows.</li>
        </ul>

        <p><strong>--global</strong></p>
        <ul>
            <li>Applies the configuration change to the global Git settings stored in <code>~/.gitconfig</code> or <code>~/.config/git/config</code>.</li>
            <li>Settings applied with <code>--global</code> affect all repositories unless overridden locally.</li>
            <li>Example: <code>git config --global user.name "John Doe"</code> sets a global username.</li>
        </ul>

        <p><strong>--local</strong></p>
        <ul>
            <li>Applies the configuration only to the specific Git repository where the command is run.</li>
            <li>Local settings are stored in the repository's <code>.git/config</code> file and override global settings.</li>
            <li>Example: <code>git config --local user.name "Project-Specific Name"</code> sets a different username for a single repository.</li>
        </ul>

        <p><strong>--system</strong></p>
        <ul>
            <li>Applies the configuration to all users on the system by modifying <code>/etc/gitconfig</code>.</li>
            <li>Requires administrative or superuser permissions to modify.</li>
            <li>Example: <code>sudo git config --system core.editor "nano"</code> sets Nano as the default editor for all users.</li>
        </ul>
    `;
}

function typeEffect3(command, delay, callback) {
    let index = 0;
    const outputElement = document.getElementById("output3");

    outputElement.innerText = ""; // Reset output to prevent duplicate characters

    typingSound.loop = true;
    typingSound.play();

    let interval = setInterval(() => {
        if (index < command.length) {
            outputElement.innerText += command[index]; // Use innerText to prevent unintended HTML issues
            index++;
        } else {
            clearInterval(interval);
            typingSound.pause();
            typingSound.currentTime = 0;
            if (callback) setTimeout(callback, 500);
        }
    }, delay);
}



function executeStep3() {
    typeEffect3(
        "$ git config --global core.editor `vim` \n",
        50,
        () => {
            document.getElementById("show-output3").style.display = "inline-block";
        }
    );
}

document.getElementById("show-command3").addEventListener("click", () => {
    document.getElementById("output3").innerHTML = ""; 
    document.getElementById("show-command3").style.display = "none"; 
    executeStep3();
});

document.getElementById("show-output3").addEventListener("click", () => {
    showProgressDots("output3", () => {
        typeEffect3("Now to verify the editor setting, use: \n\n $ git config --global core.editor \n", 50, () => {
            const output = `vim\n\n`;
            document.getElementById('output3').innerHTML += output;
            explainOutput3();
        });
    });
});



// function4

function explainOutput4() {
    const explanation4 = document.getElementById("explanation4");
    explanation4.innerHTML = `
        <h3>Explanation:</h3>

        <p><strong>git config --global init.defaultBranch</strong></p>
        <ul>
            <li>This command sets the default branch name for new repositories.</li>
            <li>By default, Git uses <code>master</code> as the initial branch name, but it can be changed using this command.</li>
            <li>For example, running <code>git config --global init.defaultBranch main</code> sets <code>main</code> as the default branch name globally.</li>
            <li>You can verify the configured default branch using <code>git config --global init.defaultBranch</code>.</li>
        </ul>

        <p><strong>--global</strong></p>
        <ul>
            <li>Applies the configuration change to the global Git settings stored in <code>~/.gitconfig</code> or <code>~/.config/git/config</code>.</li>
            <li>All newly initialized repositories will use this default branch name unless overridden locally.</li>
        </ul>

        <p><strong>--local</strong></p>
        <ul>
            <li>Applies the configuration only to the specific Git repository where the command is run.</li>
            <li>Local settings are stored in the repository's <code>.git/config</code> file and override global settings.</li>
            <li>Example: <code>git config --local init.defaultBranch develop</code> sets <code>develop</code> as the default branch only for that repository.</li>
        </ul>
    `;
}

function typeEffect4(command, delay, callback) {
    let index = 0;
    typingSound.loop = true;
    typingSound.play();
    let interval = setInterval(() => {
        if (index < command.length) {
            document.getElementById("output4").innerHTML += command.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            typingSound.pause();
            typingSound.currentTime = 0;
            if (callback) setTimeout(callback, 500);
        }
    }, delay);
}

function executeStep4() {
    typeEffect4(
        "$ git config --global init.defaultBranch <new branch name>  \n",
        50,
        () => {
            document.getElementById("show-output4").style.display = "inline-block";
        }
    );
}

document.getElementById("show-command4").addEventListener("click", () => {
    document.getElementById("output4").innerHTML = ""; 
    document.getElementById("show-command4").style.display = "none"; 
    executeStep4();
});

document.getElementById("show-output4").addEventListener("click", () => {
    showProgressDots("output4", () => {
        typeEffect4("Now to verify the default branch setting, use: \n\n $ git config --global init.defaultBranch \n", 50, () => {
            const output = `main\n\n`;
            document.getElementById('output4').innerHTML += output;
            explainOutput4();
        });
    });
});


// function 5

function explainOutput3() {
    const explanation3 = document.getElementById("explanation3");
    explanation3.innerHTML = `
        <h3>Explanation:</h3>

        <p><strong>git config --global core.editor</strong></p>
        <ul>
            <li>This command sets the default text editor for Git globally.</li>
            <li>It ensures that Git opens the specified editor when requiring user input, such as writing commit messages.</li>
            <li>For example, running <code>git config --global core.editor "vim"</code> sets Vim as the default editor globally.</li>
            <li>You can verify the configured editor using <code>git config --global core.editor</code>.</li>
        </ul>

        <p><strong>Supported Editors</strong></p>
        <ul>
            <li><code>vim</code>: A powerful, widely used text editor.</li>
            <li><code>nano</code>: A simple and beginner-friendly editor.</li>
            <li><code>emacs</code>: A highly customizable and extensible editor.</li>
            <li><code>code --wait</code>: Uses Visual Studio Code as the Git editor.</li>
            <li><code>subl --wait</code>: Uses Sublime Text as the Git editor.</li>
            <li><code>notepad.exe</code>: Uses Notepad on Windows.</li>
        </ul>
    `;
}

function typeEffect3(command, delay, callback) {
    let index = 0;
    typingSound.loop = true;
    typingSound.play();
    let interval = setInterval(() => {
        if (index < command.length) {
            document.getElementById("output3").innerHTML += command.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            typingSound.pause();
            typingSound.currentTime = 0;
            if (callback) setTimeout(callback, 500);
        }
    }, delay);
}

function executeStep3() {
    typeEffect3(
        "$ git config --global core.editor vim  \n",
        50,
        () => {
            document.getElementById("show-output3").style.display = "inline-block";
        }
    );
}

document.getElementById("show-command3").addEventListener("click", () => {
    document.getElementById("output3").innerHTML = ""; 
    document.getElementById("show-command3").style.display = "none"; 
    executeStep3();
});

document.getElementById("show-output3").addEventListener("click", () => {
    showProgressDots("output3", () => {
        typeEffect3("Now to verify the editor setting, use: \n\n $ git config --global core.editor \n", 50, () => {
            const output = `vim\n\n`;
            document.getElementById('output3').innerHTML += output;
            explainOutput3();
        });
    });
});

function explainOutput5() {
    const explanation5 = document.getElementById("explanation5");
    explanation5.innerHTML = `
        <h3>Explanation:</h3>

        <p><strong>git help &lt;command&gt;</strong></p>
        <ul>
            <li>This command opens the Git manual for a specific command.</li>
            <li>It provides detailed explanations, available options, and examples.</li>
            <li>For example, running <code>git help commit</code> opens the help page for the <code>commit</code> command.</li>
        </ul>

        <p><strong>Other Help Commands</strong></p>
        <ul>
            <li><code>git &lt;command&gt; --help</code>: Shows the help text directly in the terminal.</li>
            <li><code>git help -a</code>: Lists all available Git commands.</li>
            <li><code>git help -g</code>: Lists Git command groups.</li>
            <li><code>man git-&lt;command&gt;</code>: Opens the manual page using the system's <code>man</code> viewer.</li>
        </ul>

        <p><strong>-h option</strong></p>
        <ul>
            <li>Using <code>-h</code> with a Git command provides a brief summary instead of opening the full manual.</li>
            <li>For example, running <code>git commit -h</code> shows a short description of available options for the commit command.</li>
            <li>This is useful when you need quick reference instead of a detailed explanation.</li>
        </ul>
    `;
}

function typeEffect5(command, delay, callback) {
    let index = 0;
    let cursor = "|";
    typingSound.loop = true;
    typingSound.play();
    let interval = setInterval(() => {
        if (index < command.length) {
            document.getElementById("output5").innerHTML += command.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            typingSound.pause();
            typingSound.currentTime = 0;
            if (callback) setTimeout(callback, 500);
        }
    }, delay);
}

function executeStep5() {
    typeEffect5(
        "$ git help commit\n",
        50,
        () => {
            document.getElementById("show-output5").style.display = "inline-block";
        }
    );
}

document.getElementById("show-command5").addEventListener("click", () => {
    document.getElementById("output5").innerHTML = ""; 
    document.getElementById("show-command5").style.display = "none"; 
    executeStep5();
});

document.getElementById("show-output5").addEventListener("click", () => {
    showProgressDots("output5", () => {
        typeEffect5("Now to view available options, use: \n\n $ git commit --help \n", 50, () => {
            const output = `Displays help documentation for the commit command.\n\n`;
            document.getElementById('output5').innerHTML += output;
            explainOutput5();
        });
    });
});


document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
        document.getElementById("beep-sound").play();
    });
});


// game section 
document.getElementById('start-game').addEventListener('click', function() {
    document.querySelector('.game-container').style.display = 'block';
    this.style.display = 'none';
    startGame();
});

const tasks = [
    { task: "Initialize a new Git repository.", command: "git init" },
    { task: "Check the status of the repository.", command: "git status" },
    { task: "Configure your user name.", commandRegex: /^git config --global user\.name \".+\"$/ },
    { task: "Configure your email.", commandRegex: /^git config --global user\.email \".+@.+\..+\"$/ },
    { task: "Change the default branch name.", command: "git config --global init.defaultBranch main" },
    { task: "View the configured Git settings.", command: "git config --list" },
    { task: "Set up a global Git editor.", commandRegex: /^git config --global core\.editor \".+\"$/ },
    { task: "Get help for a specific Git command.", command: "git help <command>" }
];

let currentTaskIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

function startGame() {
    score = 0;
    timeLeft = 60;
    document.getElementById('score-display').textContent = score;
    document.getElementById('time-left').textContent = timeLeft;
    currentTaskIndex = 0;
    document.getElementById('task-instruction').textContent = tasks[currentTaskIndex].task;
    document.getElementById('game-result').style.display = 'none';
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showGameResult("Time's up! Your final score is " + score);
        }
    }, 1000);
}

document.getElementById('submit-answer').addEventListener('click', function() {
    let userAnswer = document.getElementById('user-input').value.trim();
    let task = tasks[currentTaskIndex];
    
    if (task.command && userAnswer === task.command) {
        score += 10;
    } else if (task.commandRegex && task.commandRegex.test(userAnswer)) {
        score += 10;
    }
    
    document.getElementById('score-display').textContent = score;
    currentTaskIndex++;
    if (currentTaskIndex < tasks.length) {
        document.getElementById('task-instruction').textContent = tasks[currentTaskIndex].task;
        document.getElementById('user-input').value = "";
    } else {
        clearInterval(timer);
        showGameResult("Game Over! Your final score is " + score);
    }
});

function showGameResult(message) {
    let resultDiv = document.getElementById('game-result');
    resultDiv.innerHTML = `<pre>> ${message}</pre>`;
    resultDiv.style.display = 'block';
}

document.getElementById('retry-game').addEventListener('click', function() {
    document.querySelector('.game-container').style.display = 'block';
    document.getElementById('score-terminal').style.display = 'none'; // Hide score terminal
    document.getElementById('user-input').value = ""; // Clear input field
    startGame();
});

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}