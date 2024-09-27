/*Helper Functions or reusable code*/

export function setupButtonClickListener(buttonId, callback) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', callback);
    } else {
        console.error(`Button with ID "${buttonId}" not found.`);
    }
}
