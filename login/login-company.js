window.addEventListener('DOMContentLoaded', function() {
  const loginType = sessionStorage.getItem('loginType');
  if (!loginType || loginType !== 'company') {
    alert('Please select your login type first');
    window.location.href = 'start.html';
  }
});

async function validateForm() {
  const emailOrPhone = document.getElementById("emailOrPhone").value.trim();
  const password = document.getElementById("password").value;

  if (!emailOrPhone) {
    alert("Please enter email or phone");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
    alert("Please enter a valid email or 10-digit phone number");
    return false;
  }

  if (!password) {
    alert("Please enter password");
    return false;
  }

  const loginData = {
    emailOrPhone: emailOrPhone,
    password: password
  };

  try {
    const submitBtn = document.querySelector('.submit-button');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';

    const response = await fetch('http://localhost:8000/api/v2/companies/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      alert(result.message || "Login successful!");
      
      if (result.token) {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('userType', 'company');
        localStorage.setItem('userData', JSON.stringify(result.data));
      }
      
      sessionStorage.removeItem('loginType');
      window.location.href = '../index.html';
    } else {
      alert(result.message || "Login failed. Please try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = 'Login';
    }
  } catch (error) {
    console.error('Error:', error);
    alert("An error occurred. Please make sure the server is running and try again.");
    const submitBtn = document.querySelector('.submit-button');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Login';
  }

  return false;
}
