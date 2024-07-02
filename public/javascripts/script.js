console.log("JS FILE IS WORKING!");

// ------------ DROPDOWN BUTTON ------------
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function (dropdown) {
        const dropdownBtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropdownBtn.addEventListener('mouseenter', function () {
            dropdownContent.classList.remove('hidden');
        });

        dropdown.addEventListener('mouseleave', function () {
            dropdownContent.classList.add('hidden');
        });
    });
});
// ------------ DROPDOWN BUTTON ------------

// PROFILE IMAGE CLICKING ON - SETTING PAGE
const avatar_img = document.querySelector('#avatar-img');
const avatar_input = document.querySelector('#avatar-input');
const avatar_form = document.querySelector('#avatar-form');

console.log(avatar_img, avatar_input)

avatar_img.addEventListener('click', () => {
    avatar_input.click();
})

avatar_input.addEventListener('change', () => {
    avatar_form.submit();
})
// PROFILE IMAGE CLICKING ON - SETTING PAGE

// ------------ Handle - Edit bio ------------
const bio_input = document.querySelector('#bio-input');
const edit_btn = document.querySelector('#edit-btn');
const save_btn = document.querySelector('#save-btn');

const handleBio = () => {
    bio_input.toggleAttribute('disabled');

    // Toggle visibility of buttons
    edit_btn.classList.toggle('hidden');
    save_btn.classList.toggle('hidden');
}
// ------------ Handle - Edit bio ------------


