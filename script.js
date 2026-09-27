// Load saved skills
let savedSkills = JSON.parse(localStorage.getItem("skills")) || [
    { name: "Java", progress: 40 },
    { name: "HTML & CSS", progress: 60 },
    { name: "Python", progress: 50 },
    { name: "DSA", progress: 30 }
];


// Dashboard counts
let skillCount = savedSkills.length;

document.getElementById("skills-count").textContent = skillCount;
document.getElementById("projects-count").textContent = 1;
document.getElementById("certifications-count").textContent = 5;
document.getElementById("dsa-count").textContent = 2;


// Display saved skills
function displaySkills() {

    const skillsSection = document.querySelector(".skills-section");

    // Remove existing skill cards
    document.querySelectorAll(".dynamic-skill").forEach(skill => skill.remove());

    savedSkills.forEach(skillData => {

        const skill = document.createElement("div");
        skill.className = "skill dynamic-skill";

        skill.innerHTML = `
            <p>${skillData.name}</p>

            <div class="progress">
                <div class="progress-bar" style="width: ${skillData.progress}%;"></div>
            </div>
        `;

        skillsSection.appendChild(skill);
    });
}


// Add a new skill
function addSkill() {

    const skillName = document.getElementById("skill-name").value.trim();
    const skillProgress = Number(
        document.getElementById("skill-progress").value
    );

    if (skillName === "" || document.getElementById("skill-progress").value === "") {
        alert("Please enter a skill name and progress.");
        return;
    }

    if (skillProgress < 0 || skillProgress > 100) {
        alert("Progress must be between 0 and 100.");
        return;
    }

    // Add skill to saved list
    savedSkills.push({
        name: skillName,
        progress: skillProgress
    });

    // Save to browser
    localStorage.setItem("skills", JSON.stringify(savedSkills));

    // Update count
    skillCount = savedSkills.length;
    document.getElementById("skills-count").textContent = skillCount;

    // Display skills
    displaySkills();

    // Clear inputs
    document.getElementById("skill-name").value = "";
    document.getElementById("skill-progress").value = "";
}


// Display skills when page loads
displaySkills();
