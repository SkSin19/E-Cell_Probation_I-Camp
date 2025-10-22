window.addEventListener('DOMContentLoaded', function() {
  const registrationType = sessionStorage.getItem('registrationType');
  if (!registrationType || registrationType !== 'company') {
    alert('Please select your registration type first');
    window.location.href = 'start.html';
  }
});

async function validateForm() {
  const companyName = document.getElementById("companyName").value.trim();
  const contactDetails = document.getElementById("contactDetails").value.trim();
  const emailAddress = document.getElementById("emailAddress").value.trim();
  const internshipType = document.getElementById("internshipType").value;
  const password = document.getElementById("password").value;

  if (!companyName) {
    alert("Please enter company name");
    return false;
  }

  if (!contactDetails) {
    alert("Please enter contact details");
    return false;
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(contactDetails)) {
    alert("Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)");
    return false;
  }

  if (!emailAddress) {
    alert("Please enter email address");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailAddress)) {
    alert("Please enter a valid email address");
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

  const companyData = {
    companyName: companyName,
    email: emailAddress,
    phone: contactDetails,
    internshipType: internshipType,
    password: password
  };

  try {
    const submitBtn = document.querySelector('.submit-button');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const response = await fetch('http://localhost:8000/api/v2/companies/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(companyData)
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