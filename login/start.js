window.onload = function() {
  sessionStorage.removeItem('loginType');
  
  document.getElementById('studentBtn').classList.remove('selected');
  document.getElementById('companyBtn').classList.remove('selected');
};

window.addEventListener('pageshow', function(event) {
  if (event.persisted || performance.getEntriesByType("navigation")[0].type === 'back_forward') {
    sessionStorage.removeItem('loginType');
    
    document.getElementById('studentBtn').classList.remove('selected');
    document.getElementById('companyBtn').classList.remove('selected');
  }
});

let selectedType = null;

function selectStudent() {
  selectedType = 'student';
  sessionStorage.setItem('loginType', 'student');
  
  document.getElementById('studentBtn').classList.add('selected');
  document.getElementById('companyBtn').classList.remove('selected');
  
  setTimeout(() => {
    window.location.href = 'login-student.html';
  }, 300);
}

function selectCompany() {
  selectedType = 'company';
  sessionStorage.setItem('loginType', 'company');
  
  document.getElementById('companyBtn').classList.add('selected');
  document.getElementById('studentBtn').classList.remove('selected');
  
  setTimeout(() => {
    window.location.href = 'login-company.html';
  }, 300);
}
