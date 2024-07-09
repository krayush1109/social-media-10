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
if (window.location.pathname == '/user/profile') {
    const avatar_img = document.querySelector('#avatar-img');
    const avatar_input = document.querySelector('#avatar-input');
    const avatar_form = document.querySelector('#avatar-form');

    // console.log(avatar_img, avatar_input)

    avatar_img.addEventListener('click', () => {
        avatar_input.click();
    })

    avatar_input.addEventListener('change', () => {
        avatar_form.submit();
    })
}
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


// ACTIVE LINK - sidebar 
if (true) {
    const links_sidebar = document.querySelectorAll('#sidebar-in > a')
    links_sidebar.forEach((e) => {

        const pathName = window.location.pathname;
        // console.log("Path Name", pathName);
        // console.log(e.getAttribute('href'));
        // console.log("side bar link : ", e);
        if (e.getAttribute('href') == pathName) {
            e.classList.add('bg-gray-200')
        }
    })
}
// ACTIVE LINK - sidebar

// ACTIVE LINK - NAVBAR

const nav_links = document.querySelectorAll('#navbar a');
nav_links.forEach((e) => {
    const pathname = window.location.pathname;

    if (e.getAttribute('href') == pathname)
        e.classList.add('bg-gray-300');
})

// ACTIVE LINK - NAVBAR

// upload btn - clicking
const handlePostUpload = () => {
    const upload_post_inp = document.querySelector('#upload_post_inp');
    upload_post_inp.click();


    upload_post_inp.addEventListener('change', (e) => {
        const postUploadMsg = document.querySelector('#postUploadMsg');
        if (e.target.files[0]) {
            console.log(e.target.files[0].name);
            postUploadMsg.textContent = e.target.files[0].name;
        }
    })
}
// upload btn - clicking



