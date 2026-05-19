console.log("Math Toolkit Loaded Successfully");

function copyFooterEmail() {
    const emailText = document.getElementById('footer-email').innerText;
    const toast = document.querySelector('.footer-copy-toast');

    navigator.clipboard.writeText(emailText).then(() => {
        // Show the "Copied!" message
        toast.classList.add('show');
        
        // Hide it after 2 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    });
}