document.addEventListener("DOMContentLoaded", function () {
    markCompletedChapters(); 
});

function completeChapter(chapterNumber) {
    let completedChapters = JSON.parse(localStorage.getItem("completedChapters")) || [];
    
    if (!completedChapters.includes(chapterNumber)) {
        completedChapters.push(chapterNumber);
        localStorage.setItem("completedChapters", JSON.stringify(completedChapters));
    }
}

function markCompletedChapters() {
    let completedChapters = JSON.parse(localStorage.getItem("completedChapters")) || [];

    document.querySelectorAll(".timeline-item").forEach((item) => {
        let chapterNumber = parseInt(item.getAttribute("data-chapter"));

        if (completedChapters.includes(chapterNumber)) {
            item.classList.add("completed"); 
        }
    });
}

function trackReadingProgress(chapterNumber) {
    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY + window.innerHeight;
        let documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= documentHeight - 50) {
            completeChapter(chapterNumber);
        }
    });
}

const url = window.location.pathname;
if (url.includes("vcs_main.html")) {
    trackReadingProgress(1);
} else if (url.includes("hadoop_index.html")) {
    trackReadingProgress(2);
} else if (url.includes("cass_index.html")) {
    trackReadingProgress(3);
} else if (url.includes("spark_page.html")) {
    trackReadingProgress(4);
} else if (url.includes("final_chapter.html")) {
    trackReadingProgress(5);
}


function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}