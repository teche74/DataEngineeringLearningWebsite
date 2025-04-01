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
                const output2 = `->file:C:/Program Files/Git/etc/gitconfig diff.astextplain.textconv=astextplain\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.clean=git-lfs clean -- %f\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.smudge=git-lfs smudge -- %f\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.process=git-lfs filter-process\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.required=true\n->file:C:/Program Files/Git/etc/gitconfig http.sslbackend=openssl\n->file:C:/Program Files/Git/etc/gitconfig http.sslcainfo=C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt\n->file:C:/Program Files/Git/etc/gitconfig core.autocrlf=true\n->file:C:/Program Files/Git/etc/gitconfig core.fscache=true\n->file:C:/Program Files/Git/etc/gitconfig core.symlinks=false\n->file:C:/Program Files/Git/etc/gitconfig pull.rebase=false\n->file:C:/Program Files/Git/etc/gitconfig credential.helper=manager\n->file:C:/Program Files/Git/etc/gitconfig credential.https://dev.azure.com.usehttppath=true\n->file:C:/Program Files/Git/etc/gitconfig init.defaultbranch=master\n->file:C:/Users/ujjwa/.gitconfig user.email=xyz@gmail.com\n->file:C:/Users/ujjwa/.gitconfig user.name=xyz\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.smudge=git-lfs smudge -- %f\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.process=git-lfs filter-process\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.required=true\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.clean=git-lfs clean -- %f\n->file:C:/Users/ujjwa/.gitconfig credential.helper=manager`;
                document.getElementById('output1').innerHTML += output2;
                explainOutput1(); 
            });
        });
    });
});

function explainOutput2() {
    const explanation2 = document.getElementById("explanation2");
    explanation2.innerHTML = `
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

function executeStep2() {
    typeEffect(
        "$ git config \n$ git config --list  \n$ git config --list --show-origin\n",
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
        typeEffect("$ git config --list\n", 50, () => {
            const output1 = `\n->diff.astextplain.textconv=astextplain\n->filter.lfs.clean=git-lfs clean -- %f\n->filter.lfs.smudge=git-lfs smudge -- %f\n->filter.lfs.process=git-lfs filter-process\n->filter.lfs.required=true\n->http.sslbackend=openssl\n->http.sslcainfo=C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt\n->core.autocrlf=true\n->core.fscache=true\n->core.symlinks=false\n->pull.rebase=false\n->credential.helper=manager\n->credential.https://dev.azure.com.usehttppath=true\n->init.defaultbranch=master\n->user.email=xyz@gmail.com\n->user.name=xyz\n\n `;
            document.getElementById('output2').innerHTML += output1; 
            typeEffect("$ git config --list --show-origin\n", 50, () => {
                const output2 = `->file:C:/Program Files/Git/etc/gitconfig diff.astextplain.textconv=astextplain\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.clean=git-lfs clean -- %f\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.smudge=git-lfs smudge -- %f\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.process=git-lfs filter-process\n->file:C:/Program Files/Git/etc/gitconfig filter.lfs.required=true\n->file:C:/Program Files/Git/etc/gitconfig http.sslbackend=openssl\n->file:C:/Program Files/Git/etc/gitconfig http.sslcainfo=C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt\n->file:C:/Program Files/Git/etc/gitconfig core.autocrlf=true\n->file:C:/Program Files/Git/etc/gitconfig core.fscache=true\n->file:C:/Program Files/Git/etc/gitconfig core.symlinks=false\n->file:C:/Program Files/Git/etc/gitconfig pull.rebase=false\n->file:C:/Program Files/Git/etc/gitconfig credential.helper=manager\n->file:C:/Program Files/Git/etc/gitconfig credential.https://dev.azure.com.usehttppath=true\n->file:C:/Program Files/Git/etc/gitconfig init.defaultbranch=master\n->file:C:/Users/ujjwa/.gitconfig user.email=xyz@gmail.com\n->file:C:/Users/ujjwa/.gitconfig user.name=xyz\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.smudge=git-lfs smudge -- %f\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.process=git-lfs filter-process\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.required=true\n->file:C:/Users/ujjwa/.gitconfig filter.lfs.clean=git-lfs clean -- %f\n->file:C:/Users/ujjwa/.gitconfig credential.helper=manager`;
                document.getElementById('output2').innerHTML += output2;
                explainOutput2(); 
            });
        });
    });
});
