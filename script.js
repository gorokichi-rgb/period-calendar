const calendarGrid = document.getElementById("calendar-grid");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let date = new Date();
let periodData = JSON.parse(localStorage.getItem("periodData")) || {};

function renderCalendar() {
  const weekdaysCount = 7;
  while (calendarGrid.children.length > weekdaysCount) {
    calendarGrid.removeChild(calendarGrid.lastChild);
  }

  const year = date.getFullYear();
  const month = date.getMonth();
  monthYear.textContent = `${year}年 ${month + 1}月`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

for (let i = 0; i < firstDay; i++) {
  const empty = document.createElement("div");
  empty.classList.add("day");
  empty.style.visibility = "hidden";
  calendarGrid.appendChild(empty);
}

  for (let day = 1; day <= lastDate; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.classList.add("day");

    const key = `${year}-${month}-${day}`;
    if (periodData[key] === "light") dayDiv.classList.add("light");
    if (periodData[key] === "dark") dayDiv.classList.add("dark");

    dayDiv.addEventListener("click", () => {
      if (!periodData[key]) {
        periodData[key] = "light";
        dayDiv.classList.add("light");
      } else if (periodData[key] === "light") {
        periodData[key] = "dark";
        dayDiv.classList.replace("light", "dark");
      } else {
        delete periodData[key];
        dayDiv.classList.remove("dark");
      }
      localStorage.setItem("periodData", JSON.stringify(periodData));
    });

    calendarGrid.appendChild(dayDiv);
  }
}

prevBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

