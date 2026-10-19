function showPage(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

function addItem(inputId, listId) {
  const input = document.getElementById(inputId);
  const name = input.value.trim();

  if (!name) return;

  const item = document.createElement("li");
  const text = document.createElement("span");
  const remove = document.createElement("button");

  text.className = "itemText";
  text.textContent = name;
  text.onclick = () => {
    item.classList.toggle("done");
    updateProgress();
  };

  remove.className = "delete";
  remove.textContent = "×";
  remove.title = "Remove item";
  remove.setAttribute("aria-label", "Remove " + name);
  remove.onclick = () => {
    item.remove();
    updateProgress();
  };

  item.append(text, remove);
  document.getElementById(listId).appendChild(item);
  input.value = "";
  updateProgress();
}

function updateProgress() {
  const tasks = document.querySelectorAll("#taskList li");
  const done = document.querySelectorAll("#taskList li.done").length;
  const percent = tasks.length
    ? Math.round(done / tasks.length * 100) : 0;

  document.getElementById("progressText").textContent =
    `${done} of ${tasks.length} tasks completed — ${percent}%`;

  document.getElementById("progressBar").value = percent;
}

function nightMode() {
  document.body.classList.toggle("dark");
}

let seconds = 1500;
let timer = null;

function displayTime() {
  document.getElementById("clock").textContent =
    String(Math.floor(seconds / 60)).padStart(2, "0") + ":" +
    String(seconds % 60).padStart(2, "0");
}

function startTimer() {
  if (timer !== null || seconds <= 0) return;

  timer = setInterval(() => {
    seconds--;
    displayTime();

    if (seconds <= 0) {
      clearInterval(timer);
      timer = null;
      alert("🎉 Great work! Your study session is complete.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  seconds = 1500;
  displayTime();
}

displayTime();