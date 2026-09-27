// Load saved skills
let savedSkills = JSON.parse(localStorage.getItem("skills")) || [
    { name: "Java", progress: 40 },
    { name: "HTML & CSS", progress: 60 },
    { name: "Python", progress: 50 },
    { name: "DSA", progress: 30 }
];


// Update dashboard
function updateSkillCount() {
    document.getElementById("skills-count").textContent = savedSkills.length;
}

document.getElementById("projects-count").textContent = 1;
document.getElementById("certifications-count").textContent = 5;
document.getElementById("dsa-count").textContent = 2;


// Display skills
function displaySkills() {

    const skillsSection = document.querySelector(".skills-section");

    // Remove old dynamic skills
    document.querySelectorAll(".dynamic-skill").forEach(skill => skill.remove());

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

            <button onclick="editSkill(${index})">✏️ Edit</button>
            <button onclick="deleteSkill(${index})">🗑️ Delete</button>
        `;

        skillsSection.appendChild(skill);
    });

    updateSkillCount();
}


// Add skill
function addSkill() {

    const skillName = document.getElementById("skill-name").value.trim();

    const skillProgressInput =
        document.getElementById("skill-progress").value;

    const skillProgress = Number(skillProgressInput);

    if (skillName === "" || skillProgressInput === "") {
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

    document.getElementById("skill-name").value = "";
    document.getElementById("skill-progress").value = "";
}


// Edit skill
function editSkill(index) {

    const newProgress = prompt(
        "Enter new progress (0-100):",
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


// Display saved skills on page load
displaySkills();
