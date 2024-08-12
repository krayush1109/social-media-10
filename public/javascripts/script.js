console.log("JS FILE IS WORKING!");
console.log(window.location.pathname);

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
