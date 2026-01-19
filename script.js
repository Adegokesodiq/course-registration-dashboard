// Get references
const form = document.getElementById("courseForm");
const tableBody = document.getElementById("courseTable");

// Load courses from localStorage on page load
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

  // Save to localStorage
  localStorage.setItem("courses", JSON.stringify(courses));

  // Update table
  displayCourses();

  // Clear form
  form.reset();
});

// Function to display courses in table
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
