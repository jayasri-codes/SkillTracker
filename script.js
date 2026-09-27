// Load saved skills
let savedSkills = JSON.parse(localStorage.getItem("skills")) || [
    { name: "Java", progress: 40 },
    { name: "HTML & CSS", progress: 60 },
    { name: "Python", progress: 50 },
    { name: "DSA", progress: 30 }
];
let savedDSAProblems = JSON.parse(localStorage.getItem("dsaProblems")) || [];

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
function addDSAProblem() {

    const problemName = document.getElementById("problem-name").value.trim();
    const problemLanguage = document.getElementById("problem-language").value.trim();
    const problemDifficulty = document.getElementById("problem-difficulty").value;

    if (problemName === "" || problemLanguage === "") {
        alert("Please enter problem name and language.");
        return;
    }
    savedDSAProblems.push({
        name: problemName,
        language: problemLanguage,
        difficulty: problemDifficulty
    });

    localStorage.setItem(
        "dsaProblems",
        JSON.stringify(savedDSAProblems)
    );


    const dsaSection = document.querySelector(".dsa-section");

    const problem = document.createElement("div");
    problem.className = "dsa-item dynamic-dsa";

    problem.innerHTML = `
        <p><strong>Problem:</strong> ${problemName}</p>
        <p><strong>Language:</strong> ${problemLanguage}</p>
        <p><strong>Difficulty:</strong> ${problemDifficulty}</p>
    `;

    dsaSection.appendChild(problem);

    document.getElementById("problem-name").value = "";
    document.getElementById("problem-language").value = "";

    document.getElementById("dsa-count").textContent =
        document.querySelectorAll(".dsa-item").length;
}


// Load skills when page opens
displaySkills();
    // Add DSA Problem
// Display saved DSA problems
function displayDSAProblems() {

    const dsaSection = document.querySelector(".dsa-section");

    savedDSAProblems.forEach((problemData, index) => {
        const problem = document.createElement("div");

        problem.className = "dsa-item dynamic-dsa";

        problem.innerHTML = `
    <p><strong>Problem:</strong> ${problemData.name}</p>
    <p><strong>Language:</strong> ${problemData.language}</p>
    <p><strong>Difficulty:</strong> ${problemData.difficulty}</p>

    <button onclick="editDSAProblem(${index})">✏️ Edit</button>
    <button onclick="deleteDSAProblem(${index})">🗑️ Delete</button>
`;
        dsaSection.appendChild(problem);
    });

    document.getElementById("dsa-count").textContent =
        document.querySelectorAll(".dsa-item").length;
}

displayDSAProblems();
// Edit DSA Problem
function editDSAProblem(index) {
    const newName = prompt(
        "Enter problem name:",
        savedDSAProblems[index].name
    );

    if (newName === null || newName.trim() === "") {
        return;
    }

    const newLanguage = prompt(
        "Enter language:",
        savedDSAProblems[index].language
    );

    if (newLanguage === null || newLanguage.trim() === "") {
        return;
    }

    const newDifficulty = prompt(
        "Enter difficulty (Easy, Medium, Hard):",
        savedDSAProblems[index].difficulty
    );

    if (newDifficulty === null || newDifficulty.trim() === "") {
        return;
    }

    savedDSAProblems[index].name = newName.trim();
    savedDSAProblems[index].language = newLanguage.trim();
    savedDSAProblems[index].difficulty = newDifficulty.trim();

    localStorage.setItem(
        "dsaProblems",
        JSON.stringify(savedDSAProblems)
    );

    location.reload();
}

// Delete DSA Problem
function deleteDSAProblem(index) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this problem?"
    );

    if (!confirmDelete) {
        return;
    }

    savedDSAProblems.splice(index, 1);

    localStorage.setItem(
        "dsaProblems",
        JSON.stringify(savedDSAProblems)
    );

    location.reload();
}
