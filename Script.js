// -----------------------------
// PART A: Course Registration
// -----------------------------

const form = document.getElementById("courseForm");
const tableBody = document.getElementById("courseTable");

// Load courses from localStorage
let courses = JSON.parse(localStorage.getItem("courses")) || [];
displayCourses();

// Form submit event
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const matric = document.getElementById("matric").value;
  const code = document.getElementById("code").value;
  const title = document.getElementById("title").value;

  // Validate matric number
  const matricPattern = /^LCU\/[A-Z]{2}\/\d{4}\/\d{3}$/;
  if (!matricPattern.test(matric)) {
    alert("Matric number format invalid! Use: LCU/CS/2023/001");
    return;
  }

  const course = { name, matric, code, title };
  courses.push(course);

  localStorage.setItem("courses", JSON.stringify(courses));
  displayCourses();
  form.reset();
});

// Display courses in table
function displayCourses() {
  tableBody.innerHTML = "";
  courses.forEach(course => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${course.name}</td>
      <td>${course.matric}</td>
      <td>${course.code}</td>
      <td>${course.title}</td>
    `;
    tableBody.appendChild(row);
  });
}

// -----------------------------
// PART B: Country Dashboard
// -----------------------------

const refreshBtn = document.getElementById("refreshData");
const apiStatus = document.getElementById("apiStatus");
const countryData = document.getElementById("countryData");

async function loadCountries() {
  apiStatus.textContent = "Loading data...";
  countryData.innerHTML = "";

  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    apiStatus.textContent = "";

    data.slice(0,5).forEach(country => {
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${country.name.common}</strong><br>
        Capital: ${country.capital ? country.capital[0] : "N/A"}<br>
        Population: ${country.population.toLocaleString()}
        <hr>
      `;
      countryData.appendChild(div);
    });
  } catch(err) {
    apiStatus.textContent = "Error loading data";
  }
