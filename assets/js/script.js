import { tableTextCreater, warningTextCreater } from "./text.js";
import universitiesData from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const allRadioBtns = document.querySelectorAll("input[type='radio']");
  const academicSection = document.getElementById("quizAcademic");
  const interestsSection = document.getElementById("quizInterests");
  const personalSection = document.getElementById("quizPersonal");
  const form = document.querySelector("#quizForm");
  const modal = document.querySelector(".modal");
  const progressFill = document.querySelector(".progress-fill");
  const steps = document.querySelectorAll(".step");

  const sections = [academicSection, interestsSection, personalSection];
  sections.forEach(section => {
    section.addEventListener("change", () => {
      updateProgress(sections, steps, progressFill, interestsSection);
    });
  });

  setupInterestsSection(interestsSection);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    collectAllValues(academicSection);
    collectAllValues(interestsSection);
    collectAllValues(personalSection);

    if (allValues.length < 10) {
      modal.innerHTML = warningTextCreater();
      modal.style.display = "grid";
      allValues = [];
    } else {
      const totalValue = allValues.reduce((acc, curr) => acc + curr);
      const selectedGroup = universitiesData.find(group => group.id === totalValue - 1 || group.id === totalValue);
      modal.innerHTML = tableTextCreater(selectedGroup.universities);
      modal.style.display = "grid";
    }

    const modalBtn = document.querySelector(".modal__button");
    modalBtn.addEventListener("click", (e) => {
      if (e.target.textContent === "CLOSE") {
        modal.style.display = "none";
        resetForm(allRadioBtns, interestsSection, progressFill, steps);
      } else {
        modal.style.display = "none";
      }
    });
  });

  form.addEventListener("reset", () => {
    resetForm(allRadioBtns, interestsSection, progressFill, steps);
  });
});

let allValues = [];

const setupInterestsSection = (interestsSection) => {
  interestsSection.addEventListener("change", (e) => {
    if (e.target.type === "radio") {
      handleRadioChange(e);
    } else if (e.target.type === "number") {
      handleNumberChange(e);
    }
  });

  const handleRadioChange = (e) => {
    const radioBtn = e.target;
    const container = radioBtn.closest('.quiz-interest-option');
    const numInput = container.querySelector("input[type='number']");
    numInput.disabled = false;
    numInput.focus();
    const questionGroup = container.closest('.quiz-interest-options');
    questionGroup.querySelectorAll("input[type='number']").forEach(input => {
      if (input !== numInput) {
        input.disabled = true;
      }
    });
  }

  const handleNumberChange = (e) => {
    const numInput = e.target;
    const value = numInput.value;

    const container = numInput.closest('.quiz-interest-option');
    const radioBtn = container.querySelector("input[type='radio']");
    radioBtn.value = value;

    const questionGroup = container.closest('.quiz-interest-options');
    questionGroup.querySelectorAll("input[type='number']").forEach(input => {
      if (input !== numInput && value > 0) {
        input.value = "";
      }
    });
  }
}

const collectAllValues = (section) => {
  const inputNames = new Set();
  const radios = section.querySelectorAll("input[type='radio']");
  radios.forEach(radio => inputNames.add(radio.name));

  let allAnswered = true;
  let checked;

  inputNames.forEach(name => {
    checked = section.querySelector(`input[name="${name}"]:checked`);

    if (!checked) {
      allAnswered = false;
    }
  });

  if (allAnswered) {
    section.querySelectorAll("input[type='radio']:checked").forEach(checkedBtn => {
      const value = Number(checkedBtn.value);
      if (value) {
        allValues.push(value);
      }
    });
  }
}

const resetForm = (allRadioBtns, interestsSection, progressFill, steps) => {
  allRadioBtns.forEach(radio => radio.checked = false);
  interestsSection.querySelectorAll("input[type='number']").forEach(input => {
    input.value = "";
    input.disabled = true;
  });
  allValues = [];
  progressFill.style.width = "0%";
  steps.forEach(step => step.classList.remove("active"));
}

const updateProgress = (sections, steps, progressFill, interestsSection) => {
  let completedSections = 0;

  sections.forEach((section, index) => {
    let isComplete;

    if (section === interestsSection) {
      const questionGroups = section.querySelectorAll('.quiz-interest-options');
      isComplete = [...questionGroups].every(group => {
        const checkedRadio = group.querySelector("input[type='radio']:checked");
        if (!checkedRadio) return false;
        const numInput = group.querySelector("input[type='number']");
        return numInput.value !== "";
      });
    } else {
      const inputs = section.querySelectorAll("input[type='radio']");
      const names = new Set();
      Array.from(inputs, input => names.add(input.name));
      isComplete = [...names].every(name => section.querySelector(`input[name="${name}"]:checked`));
    }

    if (isComplete) {
      completedSections++;
      steps[index].classList.add("active");
    }
  });

  progressFill.style.width = `${(completedSections / 3) * 100}%`;
}