document.addEventListener('DOMContentLoaded', function() {
    const authToken = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const userData = localStorage.getItem('userData');
    const loginButton = document.querySelector('.login-button');
    const registerButton = document.querySelector('.register-button');
    const userProfile = document.querySelector('.user-profile');
    const mobileUserProfile = document.querySelector('.mobile-user-profile');
    const userNameElement = document.getElementById('user-name');
    const mobileUserNameElement = document.getElementById('mobile-user-name');

    if (authToken) {
        if (loginButton) loginButton.parentElement.style.display = 'none';
        if (registerButton) registerButton.parentElement.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
        if (mobileUserProfile) mobileUserProfile.style.display = 'flex';

        if (userNameElement && userData) {
            try {
                const user = JSON.parse(userData);
                if (userType === 'student') {
                    const name = user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Profile';
                    userNameElement.textContent = `👤 ${name}`;
                    if (mobileUserNameElement) mobileUserNameElement.textContent = `👤 ${name}`;
                } else if (userType === 'company') {
                    const companyName = user.companyName || 'Company';
                    userNameElement.textContent = `🏢 ${companyName}`;
                    if (mobileUserNameElement) mobileUserNameElement.textContent = `🏢 ${companyName}`;
                }
            } catch (e) {
                userNameElement.textContent = '👤 Profile';
                if (mobileUserNameElement) mobileUserNameElement.textContent = '👤 Profile';
            }
        }
    } else {
        if (loginButton) loginButton.parentElement.style.display = 'block';
        if (registerButton) registerButton.parentElement.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
        if (mobileUserProfile) mobileUserProfile.style.display = 'none';
    }

    setupUserProfileDropdown();
});

function setupUserProfileDropdown() {
    const userProfileBtns = document.querySelectorAll('.user-profile-btn');
    const userDropdowns = document.querySelectorAll('.user-profile .user-dropdown');
    const logoutBtns = document.querySelectorAll('.logout-btn');

    if (userProfileBtns.length === 0 || userDropdowns.length === 0) return;

    userProfileBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdowns[index].classList.toggle('show');
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-profile')) {
            userDropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    const dropdownItems = document.querySelectorAll('.user-dropdown-item');
    dropdownItems.forEach(item => {
        if (item.id !== 'user-name' && item.id !== 'mobile-user-name') {
            item.addEventListener('click', function() {
                userDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            });
        }
    });

    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('authToken');
            localStorage.removeItem('userType');
            localStorage.removeItem('userData');
            sessionStorage.removeItem('loginType');
            window.location.reload();
        });
    });
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('open');
}

window.addEventListener('storage', function(e) {
    if (e.key === 'authToken') {
        window.location.reload();
    }
});
