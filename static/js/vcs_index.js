
function showInfo(command, infoId) {
  let info = document.getElementById(infoId);
  info.style.display = info.style.display === "block" ? "none" : "block";
}


function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}