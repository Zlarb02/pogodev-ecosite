import { switchLanguage } from './translation.js';

// Form handling
const formHandler = {
  init: function() {
    this.form = document.getElementById("contactForm");
    if (!this.form) return;

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.successMessage = this.form.querySelector(".form-success");
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.validateEmail() && this.processForm();
  },

  validateEmail: function() {
    const emailInput = this.form.querySelector("#userEmail");
    const isValid = emailInput.checkValidity();
    emailInput.classList.toggle("invalid-field", !isValid);
    return isValid;
  },

  processForm: function() {
    this.resetErrorStates();
    this.showSuccess();
    this.form.reset();
  },

  resetErrorStates: function() {
    this.form.querySelectorAll(".invalid-field").forEach(el => {
      el.classList.remove("invalid-field");
    });
  },

  showSuccess: function() {
    this.successMessage.classList.remove("opacity-0");
    setTimeout(() => {
      this.successMessage.classList.add("opacity-0");
    }, 3000);
  }
};

formHandler.init();
