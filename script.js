document.addEventListener('DOMContentLoaded', function() {
    // Page Elements
    const questionPage = document.getElementById('question-page');
    const celebrationPage = document.getElementById('celebration-page');
    const bookingPage = document.getElementById('booking-page');
    const confirmationPage = document.getElementById('confirmation-page');
    
    // Container Elements
    const questionContainer = document.getElementById('question-container');
    const celebrationContainer = document.getElementById('celebration-container');
    const bookingContainer = document.getElementById('booking-container');
    const confirmationContainer = document.getElementById('confirmation-container');
    
    // Button Elements
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const continueBtn = document.getElementById('continue-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const clickCounter = document.getElementById('click-counter');
    
    // Other Elements
    const selectedDateSpan = document.getElementById('selected-date');
    const selectedTimeSpan = document.getElementById('selected-time');
    const timeSelect = document.getElementById('time-select');
    
    // Variables
    let yesBtnClickCount = 0;
    let yesBtnSize = 1;
    let selectedDate = null;

    // Handle No button click - now makes the button move to a random position
    noBtn.addEventListener('click', function() {
        // Get the viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Get the button dimensions
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;
        
        // Calculate safe boundaries (keep button fully visible)
        const maxX = viewportWidth - buttonWidth;
        const maxY = viewportHeight - buttonHeight;
        
        // Get a random position within the viewport
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        
        // Apply the new position with a smooth transition
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
        noBtn.style.zIndex = '9999';
        
        // Add a smooth transition for the movement
        noBtn.style.transition = 'all 0.3s ease';
        
        // Reset the question with a shake animation
        const question = document.querySelector('.question');
        question.classList.remove('animate__heartBeat');
        void question.offsetWidth; // Trigger reflow to restart animation
        question.classList.add('animate__animated', 'animate__shakeX');
        
        // Make the Yes button bigger each time No is pressed
        yesBtnSize *= 2;
        // Limit the maximum size to prevent it from getting too big
        if (yesBtnSize > 16) {
            yesBtnSize = 16;
        }
        yesBtn.style.transform = `scale(${yesBtnSize})`;
        yesBtn.style.transition = 'transform 0.3s ease';
        
        // Add a quick pulse animation to draw attention to the growing Yes button
        yesBtn.classList.remove('animate__pulse');
        void yesBtn.offsetWidth; // Trigger reflow to restart animation
        yesBtn.classList.add('animate__animated', 'animate__pulse');
        
        setTimeout(() => {
            question.classList.remove('animate__shakeX');
            question.classList.add('animate__heartBeat');
        }, 1000);
    });

    // Handle Yes button click
    yesBtn.addEventListener('click', function() {
        // Add a quick animation before proceeding
        yesBtn.classList.add('animate__animated', 'animate__pulse');
        
        // Go directly to booking screen after a short animation delay
        setTimeout(() => {
            // Hide question page, show booking page
            questionPage.classList.add('hidden');
            bookingPage.classList.remove('hidden');
            
            // Initialize the calendar
            initCalendar();
            
            // Ensure we're at the top of the view
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 300);
    });

    // Show celebration screen
    function showCelebration() {
        questionContainer.classList.add('hidden');
        celebrationContainer.classList.remove('hidden');
        
        // Add confetti effect
        createConfetti();
        
        // Automatically proceed to booking after 2 seconds
        setTimeout(() => {
            celebrationContainer.classList.add('hidden');
            bookingContainer.classList.remove('hidden');
            initCalendar();
            
            // Ensure we're at the top of the booking view
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 2000);
    }

    // Confetti effect
    function createConfetti() {
        const confettiCount = 200;
        const container = document.querySelector('.container');
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random styling
            confetti.style.background = randomColor();
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.position = 'absolute';
            confetti.style.top = '-10px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.zIndex = '0';
            
            // Animation
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Random color for confetti
    function randomColor() {
        const colors = ['#ff6b6b', '#7971ea', '#4bc0c0', '#ff9ff3', '#feca57', '#48dbfb'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Continue button click - show booking page
    continueBtn.addEventListener('click', function() {
        celebrationPage.classList.add('hidden');
        bookingPage.classList.remove('hidden');
        
        // Initialize the simple calendar
        initCalendar();
    });

    // Simple calendar implementation
    function initCalendar() {
        const calendarElement = document.getElementById('calendar');
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        // Create the calendar
        generateCalendar(currentMonth, currentYear, calendarElement);
    }

    function generateCalendar(month, year, container) {
        // Clear existing calendar
        container.innerHTML = '';
        
        // Create month/year header
        const monthNames = ["January", "February", "March", "April", "May", "June",
                             "July", "August", "September", "October", "November", "December"];
        
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `<h2>${monthNames[month]} ${year}</h2>`;
        container.appendChild(header);
        
        // Create calendar table
        const table = document.createElement('table');
        table.className = 'calendar-table';
        
        // Create header row with day names
        const daysHeader = document.createElement('tr');
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
        // For mobile screens, use shorter day names
        if (window.innerWidth < 500) {
            days = ["S", "M", "T", "W", "T", "F", "S"];
        }
        
        days.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            daysHeader.appendChild(th);
        });
        
        table.appendChild(daysHeader);
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        
        // Create calendar days
        let date = 1;
        for (let i = 0; i < 6; i++) {
            // Create a week row
            const row = document.createElement('tr');
            
            // Create 7 days in each row
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                
                if (i === 0 && j < firstDay) {
                    // Empty cells before the first day
                    cell.textContent = '';
                } else if (date > totalDays) {
                    // Empty cells after the last day
                    cell.textContent = '';
                } else {
                    // Valid day cells
                    cell.textContent = date;
                    
                    // Add click event handler
                    cell.addEventListener('click', function() {
                        // Remove selection from previously selected date
                        const selectedCells = document.querySelectorAll('.selected-date');
                        selectedCells.forEach(cell => cell.classList.remove('selected-date'));
                        
                        // Mark this date as selected
                        this.classList.add('selected-date');
                        
                        // Store the selected date
                        selectedDate = new Date(year, month, parseInt(this.textContent));
                    });
                    
                    date++;
                }
                
                row.appendChild(cell);
            }
            
            table.appendChild(row);
            
            // Break if all days have been created
            if (date > totalDays) {
                break;
            }
        }
        
        // Add styles for the calendar
        const style = document.createElement('style');
        style.textContent = `
            .calendar-header {
                margin-bottom: 15px;
                color: #673AB7;
            }
            
            .calendar-table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .calendar-table th {
                padding: 10px;
                background: #f0f0f0;
                color: #555;
            }
            
            .calendar-table td {
                padding: 10px;
                text-align: center;
                cursor: pointer;
                border-radius: 50%;
                transition: all 0.2s;
            }
            
            .calendar-table td:hover:not(:empty) {
                background-color: #f0f0f0;
            }
            
            .selected-date {
                background-color: #FF4081 !important;
                color: white !important;
                font-weight: bold;
            }
            
            @keyframes fall {
                to {
                    top: 100%;
                    transform: rotate(720deg);
                }
            }
        `;
        
        document.head.appendChild(style);
        container.appendChild(table);
    }

    // Confirm date button click
    confirmBtn.addEventListener('click', function() {
        if (!selectedDate) {
            alert('Please select a date first!');
            return;
        }
        
        const selectedTime = timeSelect.value;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        // Format the date and time for display
        const formattedDate = selectedDate.toLocaleDateString('en-US', options);
        const formattedTime = formatTime(selectedTime);
        
        selectedDateSpan.textContent = formattedDate;
        selectedTimeSpan.textContent = formattedTime;
        
        // Send confirmation email
        const templateParams = {
            to_email: 'anson20037@gmail.com',
            date: formattedDate,
            time: formattedTime,
        };

        // Show loading state
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'Sending...';

        // Check if EmailJS is initialized
        if (typeof emailjs === 'undefined') {
            alert('Email service is not initialized. Please refresh the page.');
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Confirm Date';
            return;
        }

        emailjs.send('service_exr2amy', 'template_isf0f6m', templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response);
                // Show confirmation page
                bookingPage.classList.add('hidden');
                confirmationPage.classList.remove('hidden');
                
                // Ensure we're at the top of the view
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, function(error) {
                console.error('Failed to send email:', error);
                if (error.text.includes('insufficient authentication scopes')) {
                    alert('Please check your EmailJS Gmail service configuration. The service needs to be reconnected with proper permissions.');
                } else {
                    alert('Failed to send confirmation email. Error: ' + error.text);
                }
            })
            .finally(function() {
                // Reset button state
                confirmBtn.disabled = false;
                confirmBtn.textContent = 'Confirm Date';
            });
    });

    // Format time from 24h to 12h format
    function formatTime(time24) {
        const [hours, minutes] = time24.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes} ${period}`;
    }
}); 