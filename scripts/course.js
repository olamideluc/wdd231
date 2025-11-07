const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
  { code: "WDD 231", name: "Web Frontend Development", credits: 2, completed: false },
  { code: "CSE 210", name: "Programming with classes", credits: 2, completed: true },
  { code: "CSE 110", name: "Programming Building Blocks", credits: 2, completed: true },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true }
];

function renderCourses(courseList) {
  const container = document.getElementById("courseList");
  container.innerHTML = "";

  courseList.forEach(course => {
    const li = document.createElement("li");
    li.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
    li.className = course.completed ? "completed" : "incomplete";
    container.appendChild(li);
  });

  const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
  document.getElementById("creditTotal").textContent = `Total credits: ${totalCredits}`;
}

document.getElementById("btnAll").addEventListener("click", () => {
  renderCourses(courses);
});

document.getElementById("btnWDD").addEventListener("click", () => {
  const filtered = courses.filter(course => course.code.startsWith("WDD"));
  renderCourses(filtered);
});

document.getElementById("btnCSE").addEventListener("click", () => {
  const filtered = courses.filter(course => course.code.startsWith("CSE"));
  renderCourses(filtered);
});
