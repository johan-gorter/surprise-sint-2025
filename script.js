// Get DOM elements
const snapchatIcon = document.getElementById('snapchat-icon');
const todoPage = document.getElementById('todo-page');
const closeBtn = document.getElementById('close-btn');

// Open TODO page when Snapchat icon is clicked/touched
snapchatIcon.addEventListener('click', function() {
    todoPage.classList.remove('hidden');
    // Prevent scrolling on the body when TODO page is open
    document.body.style.overflow = 'hidden';
});

// Close TODO page when close button is clicked
closeBtn.addEventListener('click', function() {
    todoPage.classList.add('hidden');
    // Re-enable scrolling on the body
    document.body.style.overflow = 'auto';
});

// Also handle touch events for mobile devices
snapchatIcon.addEventListener('touchstart', function(e) {
    // Prevent default to avoid double-firing on devices that support both
    e.preventDefault();
    todoPage.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    todoPage.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Handle checkbox changes for TODO items
const checkboxes = document.querySelectorAll('.todo-item input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Add a little animation or feedback
        const todoItem = this.closest('.todo-item');
        if (this.checked) {
            todoItem.style.opacity = '0.7';
        } else {
            todoItem.style.opacity = '1';
        }
    });
});

// Ensure portrait mode is maintained
function lockOrientation() {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch(err => {
            console.log('Screen orientation lock not supported:', err);
        });
    }
}

// Try to lock orientation when page loads
window.addEventListener('load', lockOrientation);
