const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//validate email
function emailValidator(email, message) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!(email.value.trim() === "")) {
    if (!re.test(email.value)) {
      showError(email, message);
    } else {
      showSuccess(email);
    }
  }
}
// show error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList = "form-control error";
  formControl.querySelector("small").textContent = message;
};
// show success
const showSuccess = (input) => {
  input.parentElement.classList = "form-control success";
};

//Check required fields
function checkRequired(inputs) {
  inputs.map((input) => {
    if (input.value.trim() === "") {
      showError(input, `${formatInputName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
// Check Input length
const checkInputLength = (input, min, max = undefined) => {
  if (input.value.length) {
    if (input.value.trim().length < min) {
      showError(
        input,
        `${formatInputName(input)} must be at least ${min} characters`
      );
    } else {
      if (max) {
        if (input.value.trim() > max) {
          showError(
            input,
            `${formatInputName(input)} cannot exceed ${max} characters`
          );
        } else {
          showSuccess(input);
        }
      }
    }
  }
};
//Capitalize first letter of input id aka name
const formatInputName = (input) => {
  return `${input.id.charAt(0).toUpperCase()}${input.id.slice(1)}`;
};
//chech if passwords match
const checkPasswordMatch = (password1, password2, message) => {
  if (password1.value !== "") {
    if (password1.value !== password2.value) {
      showError(password2, message);
    }
  } else {
    checkRequired([password1, password2]);
  }
  if (password1.value === "" && password2.value.length > 0) {
    showError(password2, message);
  }
};
// Add Submit event to form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkInputLength(username, 4, 20);
  checkInputLength(password, 6);
  emailValidator(email, `${formatInputName(email)} is invalid`);
  checkPasswordMatch(password, password2, "Passwords do not match");
});
