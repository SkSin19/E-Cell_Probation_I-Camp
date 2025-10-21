window.onload = function() {
            // Remove any stored selection
            sessionStorage.removeItem('registrationType');
            
            // Reset button states
            document.getElementById('studentBtn').classList.remove('selected');
            document.getElementById('companyBtn').classList.remove('selected');
        };

        // Prevent back navigation to form pages - always return to start
        window.addEventListener('pageshow', function(event) {
            if (event.persisted || performance.getEntriesByType("navigation")[0].type === 'back_forward') {
                // Clear any stored data
                sessionStorage.removeItem('registrationType');
                
                // Reset button states
                document.getElementById('studentBtn').classList.remove('selected');
                document.getElementById('companyBtn').classList.remove('selected');
            }
        });

        let selectedType = null;

        function selectStudent() {
            selectedType = 'student';
            document.getElementById('studentBtn').classList.add('selected');
            document.getElementById('companyBtn').classList.remove('selected');
            
            // Redirect to student registration page
            setTimeout(() => {
                window.location.href = 'registration-student.html';
            }, 300);
        }

        function selectCompany() {
            selectedType = 'company';
            document.getElementById('companyBtn').classList.add('selected');
            document.getElementById('studentBtn').classList.remove('selected');
            
            // Redirect to company registration page
            setTimeout(() => {
                window.location.href = 'registration-company.html';
            }, 300);
        }