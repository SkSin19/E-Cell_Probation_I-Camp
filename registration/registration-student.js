// Get radio buttons and email inputs
const yesRadio = document.getElementById("yes");
const noRadio = document.getElementById("no");
const kiitEmail = document.getElementById("kiitEmail");
const nonKiitEmail = document.getElementById("nonKiitEmail");

// Initially disable both email inputs
kiitEmail.disabled = true;
nonKiitEmail.disabled = true;

// Add event listeners to radio buttons
yesRadio.addEventListener("change", function() {
  if (this.checked) {
    kiitEmail.disabled = false;
    nonKiitEmail.disabled = true;
    nonKiitEmail.value = ""; // Clear non-KIIT email
  }
});

noRadio.addEventListener("change", function() {
  if (this.checked) {
    nonKiitEmail.disabled = false;
    kiitEmail.disabled = true;
    kiitEmail.value = ""; // Clear KIIT email
  }
});

function validateForm() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const internshipType = document.getElementById("typeintern").value;
  const kiitEmailValue = document.getElementById("kiitEmail").value;
  const nonKiitEmailValue = document.getElementById("nonKiitEmail").value;
  const isKiit = document.getElementById("yes").checked;
  const isNotKiit = document.getElementById("no").checked;

  if (!firstName || !lastName) {
    alert("Please enter both first and last name");
    return false;
  }

  // Check if KIIT option is selected
  if (!isKiit && !isNotKiit) {
    alert("Please select whether you are from KIIT or not");
    return false;
  }

  // Check email based on KIIT selection
  if (isKiit && !kiitEmailValue) {
    alert("Please enter your KIIT email address");
    return false;
  }

  if (isNotKiit && !nonKiitEmailValue) {
    alert("Please enter your email address");
    return false;
  }

  if (!phoneNumber) {
    alert("Please enter a phone number");
    return false;
  }

  if (!internshipType) {
    alert("Please select an internship type");
    return false;
  }

  alert("Form submitted successfully!");
  return true;
}