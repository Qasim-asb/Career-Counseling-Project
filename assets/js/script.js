import { tableTextCreater, warningTextCreater } from "./text.js";
import universitiesData from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#quizForm");
  const academicSection = document.getElementById("quizAcademic");
  const interestsSection = document.getElementById("quizInterests");
  const personalSection = document.getElementById("quizPersonal");
  const modal = document.querySelector(".modal");
  const allRadioBtns = document.querySelectorAll("input[type='radio']");
  const progressFill = document.querySelector(".progress-fill");
  const steps = document.querySelectorAll(".step");

  let allValues = [];
  const sections = [academicSection, interestsSection, personalSection];

  const updateProgress = () => {
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

  sections.forEach(section => {
    section.addEventListener("change", () => {
      updateProgress();
    });
  });

  const setupInterestsSection = () => {
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

  setupInterestsSection();

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

  const resetForm = () => {
    allRadioBtns.forEach(radio => radio.checked = false);
    interestsSection.querySelectorAll("input[type='number']").forEach(input => {
      input.value = "";
      input.disabled = true;
    });

    interestsSection.querySelectorAll("input[type='radio']").forEach(radio => radio.value = 0);
    
    allValues = [];
    progressFill.style.width = "0%";
    steps.forEach(step => step.classList.remove("active"));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    collectAllValues(academicSection);
    collectAllValues(interestsSection);
    collectAllValues(personalSection);

    console.log(allValues);
    
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

    // const all = interestsSection.querySelectorAll("input[type='radio']");
    // all.forEach(each => {
    //   console.log(each.value);
    // });

    const modalBtn = document.querySelector(".modal__button");
    modalBtn.addEventListener("click", (e) => {
      if (e.target.textContent === "CLOSE") {
        modal.style.display = "none";
        resetForm();
      } else {
        modal.style.display = "none";
      }
    });
  });

  form.addEventListener("reset", () => {
    resetForm();
  });
});