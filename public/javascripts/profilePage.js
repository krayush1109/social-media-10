
// THREE DOTS OPTION OF MY POSTS -> edit post & delete post
const optionsMenu = document.querySelectorAll('.optionsMenu');
const optionBtns = document.querySelectorAll('.optionBtns');

optionBtns.forEach((optionBtn, idx) => {
    optionBtn.addEventListener('click', () => {
        optionsMenu[idx].classList.toggle('hidden');
    })
})

window.addEventListener('click', (e) => {
    optionBtns.forEach((optionBtn, idx) => {
        if (!optionBtn.contains(e.target) && !optionsMenu[idx].contains(e.target)) {
            optionsMenu[idx].classList.add('hidden');
        }
    })

})

// /* PROFILE IMAGE CLICKING ON - SETTING PAGE *\
if (window.location.pathname == '/user/profile') {
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
}

/* PROFILE IMAGE CLICKING ON - SETTING PAGE #/ */


// /* Handle - Edit bio *\
const bio_input = document.querySelector('#bio-input');
const edit_btn = document.querySelector('#edit-btn');
const save_btn = document.querySelector('#save-btn');

const handleBio = () => {
    bio_input.toggleAttribute('disabled');

    /* Toggle visibility of buttons */
    edit_btn.classList.toggle('hidden');
    save_btn.classList.toggle('hidden');
}
/* \* Handle - Edit bio */

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
