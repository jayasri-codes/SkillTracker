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


// Load skills when page opens
displaySkills();
