document.addEventListener('DOMContentLoaded', function() {
    const authToken = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const userData = localStorage.getItem('userData');
    const loginButton = document.querySelector('.login-button');
    const registerButton = document.querySelector('.register-button');
    const userProfile = document.querySelector('.user-profile');
    const userNameElement = document.getElementById('user-name');

    if (authToken) {
        if (loginButton) loginButton.parentElement.style.display = 'none';
        if (registerButton) registerButton.parentElement.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';

        if (userNameElement && userData) {
            try {
                const user = JSON.parse(userData);
                if (userType === 'student') {
                    const name = user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Profile';
                    userNameElement.textContent = `👤 ${name}`;
                } else if (userType === 'company') {
                    const companyName = user.companyName || 'Company';
                    userNameElement.textContent = `🏢 ${companyName}`;
                }
            } catch (e) {
                userNameElement.textContent = '👤 Profile';
            }
        }
    } else {
        if (loginButton) loginButton.parentElement.style.display = 'block';
        if (registerButton) registerButton.parentElement.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
    }

    setupUserProfileDropdown();
});

function setupUserProfileDropdown() {
    const userProfileBtn = document.querySelector('.user-profile-btn');
    const userDropdown = document.querySelector('.user-dropdown');
    const logoutBtn = document.querySelector('.logout-btn');

    if (!userProfileBtn || !userDropdown) return;

    userProfileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-profile')) {
            userDropdown.classList.remove('show');
        }
    });

    const dropdownItems = document.querySelectorAll('.user-dropdown-item');
    dropdownItems.forEach(item => {
        if (item.id !== 'user-name') {
            item.addEventListener('click', function() {
                userDropdown.classList.remove('show');
            });
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('authToken');
            localStorage.removeItem('userType');
            localStorage.removeItem('userData');
            sessionStorage.removeItem('loginType');
            window.location.reload();
        });
    }
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('open');
}

window.addEventListener('storage', function(e) {
    if (e.key === 'authToken') {
        window.location.reload();
    }
});
