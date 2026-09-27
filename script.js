// Load saved skills
let savedSkills = JSON.parse(localStorage.getItem("skills")) || [
    { name: "Java", progress: 40 },
    { name: "HTML & CSS", progress: 60 },
    { name: "Python", progress: 50 },
    { name: "DSA", progress: 30 }
];


// Dashboard counts
document.getElementById("projects-count").textContent =
    document.querySelectorAll(".project-card").length;
document.getElementById("certifications-count").textContent =
    document.querySelectorAll(".certificate-card").length;
document.getElementById("dsa-count").textContent =
    document.querySelectorAll(".dsa-item").length;

// Display skills
function displaySkills() {

    const skillsSection = document.querySelector(".skills-section");

    // Remove all old skill elements
    document.querySelectorAll(".dynamic-skill").forEach(skill => {
        skill.remove();
    });

    // Hide the original HTML skills
    document.querySelectorAll(".skills-section > .skill").forEach(skill => {
        skill.style.display = "none";
    });

    // Create saved skills
    savedSkills.forEach((skillData, index) => {

        const skill = document.createElement("div");

        skill.className = "skill dynamic-skill";

        skill.innerHTML = `
            <p>
                <strong>${skillData.name}</strong>
                - ${skillData.progress}%
            </p>

            <div class="progress">
                <div class="progress-bar"
                     style="width: ${skillData.progress}%;">
                </div>
            </div>

            <button onclick="editSkill(${index})">
                ✏️ Edit
            </button>

            <button onclick="deleteSkill(${index})">
                🗑️ Delete
            </button>
        `;

        skillsSection.appendChild(skill);
    });

    document.getElementById("skills-count").textContent =
        savedSkills.length;
}


// Add skill
function addSkill() {

    const nameInput = document.getElementById("skill-name");
    const progressInput = document.getElementById("skill-progress");

    const skillName = nameInput.value.trim();
    const skillProgress = Number(progressInput.value);

    if (skillName === "" || progressInput.value === "") {
        alert("Please enter a skill name and progress.");
        return;
    }

    if (skillProgress < 0 || skillProgress > 100) {
        alert("Progress must be between 0 and 100.");
        return;
    }

    savedSkills.push({
        name: skillName,
        progress: skillProgress
    });

    saveSkills();

    nameInput.value = "";
    progressInput.value = "";
}


// Edit skill
function editSkill(index) {

    const newName = prompt(
        "Enter skill name:",
        savedSkills[index].name
    );

    if (newName === null || newName.trim() === "") {
        return;
    }

    const newProgress = prompt(
        "Enter progress (0-100):",
        savedSkills[index].progress
    );

    if (newProgress === null) {
        return;
    }

    const progress = Number(newProgress);

    if (isNaN(progress) || progress < 0 || progress > 100) {
        alert("Please enter a number between 0 and 100.");
        return;
    }

    savedSkills[index].name = newName.trim();
    savedSkills[index].progress = progress;

    saveSkills();
}


// Delete skill
function deleteSkill(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) {
        return;
    }

    savedSkills.splice(index, 1);

    saveSkills();
}


// Save skills
function saveSkills() {

    localStorage.setItem(
        "skills",
        JSON.stringify(savedSkills)
    );

    displaySkills();
}
    // Add DSA Problem
```javascript
function addDSAProblem() {

    const problemName = document.getElementById("problem-name").value.trim();
    const problemLanguage = document.getElementById("problem-language").value.trim();
    const problemDifficulty = document.getElementById("problem-difficulty").value;

    if (problemName === "" || problemLanguage === "") {
        alert("Please enter problem name and language.");
        return;
    }

    const problem = {
        name: problemName,
        language: problemLanguage,
        difficulty: problemDifficulty
    };

    // Get existing DSA problems
    let dsaProblems = JSON.parse(localStorage.getItem("dsaProblems")) || [];

    // Add new problem
    dsaProblems.push(problem);

    // Save problems
    localStorage.setItem("dsaProblems", JSON.stringify(dsaProblems));

    displayDSAProblems();

    document.getElementById("problem-name").value = "";
    document.getElementById("problem-language").value = "";
}


// Display saved DSA problems
function displayDSAProblems() {

    const dsaSection = document.querySelector(".dsa-section");

    // Keep only the original/static content
    document.querySelectorAll(".dynamic-dsa").forEach(item => item.remove());

    const dsaProblems =
        JSON.parse(localStorage.getItem("dsaProblems")) || [];

    dsaProblems.forEach(problem => {

        const problemElement = document.createElement("div");
        problemElement.className = "dsa-item dynamic-dsa";

        problemElement.innerHTML = `
            <p><strong>Problem:</strong> ${problem.name}</p>
            <p><strong>Language:</strong> ${problem.language}</p>
            <p><strong>Difficulty:</strong> ${problem.difficulty}</p>
        `;

        dsaSection.appendChild(problemElement);
    });

    document.getElementById("dsa-count").textContent =
        document.querySelectorAll(".dsa-item").length;
}


// Load saved DSA problems when page opens
displayDSAProblems();


// Load skills when page opens
displaySkills();
```


