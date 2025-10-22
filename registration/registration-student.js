window.addEventListener('DOMContentLoaded', function() {
  const registrationType = sessionStorage.getItem('registrationType');
  if (!registrationType || registrationType !== 'student') {
    alert('Please select your registration type first');
    window.location.href = 'start.html';
  }
});

const yesRadio = document.getElementById("yes");
const noRadio = document.getElementById("no");
const kiitEmail = document.getElementById("kiitEmail");
const nonKiitEmail = document.getElementById("nonKiitEmail");

kiitEmail.disabled = true;
nonKiitEmail.disabled = true;

yesRadio.addEventListener("change", function() {
  if (this.checked) {
    kiitEmail.disabled = false;
    nonKiitEmail.disabled = true;
    nonKiitEmail.value = ""; 
  }
});

noRadio.addEventListener("change", function() {
  if (this.checked) {
    nonKiitEmail.disabled = false;
    kiitEmail.disabled = true;
    kiitEmail.value = ""; 
  }
});

async function validateForm() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const internshipType = document.getElementById("typeintern").value;
  const password = document.getElementById("password").value;
  const kiitEmailValue = document.getElementById("kiitEmail").value.trim();
  const nonKiitEmailValue = document.getElementById("nonKiitEmail").value.trim();
  const isKiit = document.getElementById("yes").checked;
  const isNotKiit = document.getElementById("no").checked;

  if (!firstName || !lastName) {
    alert("Please enter both first and last name");
    return false;
  }

  if (!isKiit && !isNotKiit) {
    alert("Please select whether you are from KIIT or not");
    return false;
  }

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

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phoneNumber)) {
    alert("Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)");
    return false;
  }

  if (!internshipType) {
    alert("Please select an internship type");
    return false;
  }

  if (!password || password.length < 6) {
    alert("Please enter a password with at least 6 characters");
    return false;
  }

  const studentData = {
    firstName: firstName,
    lastName: lastName,
    isFromKiit: isKiit,
    emailKiit: isKiit ? kiitEmailValue : null,
    emailNonKiit: isNotKiit ? nonKiitEmailValue : null,
    phone: phoneNumber,
    internshipType: internshipType,
    password: password
  };

  try {
    const submitBtn = document.querySelector('.submit-button');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const response = await fetch('https://icamp-test.onrender.com/api/v1/student/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      alert(result.message || "Registration successful! Welcome aboard!");
      sessionStorage.removeItem('registrationType');
      window.location.href = '../index.html';
    } else {
      alert(result.message || "Registration failed. Please try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  } catch (error) {
    console.error('Error:', error);
    alert("An error occurred. Please make sure the server is running and try again.");
    const submitBtn = document.querySelector('.submit-button');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
  }

  return false;
}

function toggleMenu() {
            document.querySelector('.nav-links').classList.toggle('open');
        }