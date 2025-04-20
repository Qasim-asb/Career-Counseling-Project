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
  let completedSections = 0;

  const updateProgress = (section, index) => {
    let isComplete;

    if (section === interestsSection) {
      const checkedRadios = section.querySelectorAll("input[type='radio']:checked");
      if (checkedRadios.length === 3) {
        isComplete = [...checkedRadios].every(checkedRadio => Number(checkedRadio.value));
      }
    } else {
      const inputs = section.querySelectorAll("input[type='radio']");
      const names = new Set();
      Array.from(inputs, input => names.add(input.name));
      isComplete = [...names].every(name => section.querySelector(`input[name="${name}"]:checked`));
    }

    if (isComplete) {
      if (!steps[index].classList.contains("active")) {
        completedSections++;
        steps[index].classList.add("active");
      }
    } else {
      if (steps[index].classList.contains("active")) {
        completedSections--;
        steps[index].classList.remove("active");
      }
    }

    progressFill.style.width = `${(completedSections / 3) * 100}%`;
  }

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

  sections.forEach((section, index) => {
    section.addEventListener("change", () => {
      updateProgress(section, index);
    });
  });

  const collectAllValues = (section) => {
    const inputNames = new Set();
    const radios = section.querySelectorAll("input[type='radio']");
    radios.forEach(radio => inputNames.add(radio.name));

    let allAnswered = true;

    inputNames.forEach(name => {
      const checked = section.querySelector(`input[name="${name}"]:checked`);

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
    completedSections = 0;
    progressFill.style.width = "0%";
    steps.forEach(step => step.classList.remove("active"));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    sections.forEach(section => collectAllValues(section));

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