// Dashboard counts
let skillCount = 4;

document.getElementById("skills-count").textContent = skillCount;
document.getElementById("projects-count").textContent = 1;
document.getElementById("certifications-count").textContent = 5;
document.getElementById("dsa-count").textContent = 2;


// Add a new skill
function addSkill() {

    const skillName = document.getElementById("skill-name").value.trim();
    const skillProgress = document.getElementById("skill-progress").value;

    if (skillName === "" || skillProgress === "") {
        alert("Please enter a skill name and progress.");
        return;
    }

    if (skillProgress < 0 || skillProgress > 100) {
        alert("Progress must be between 0 and 100.");
        return;
    }

    const skillsSection = document.querySelector(".skills-section");

    const skill = document.createElement("div");
    skill.className = "skill";

    skill.innerHTML = `
        <p>${skillName}</p>

        <div class="progress">
            <div class="progress-bar" style="width: ${skillProgress}%;"></div>
        </div>
    `;

    skillsSection.appendChild(skill);

    // Update skill count
    skillCount++;
    document.getElementById("skills-count").textContent = skillCount;

    // Clear input fields
    document.getElementById("skill-name").value = "";
    document.getElementById("skill-progress").value = "";
}
