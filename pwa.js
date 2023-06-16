if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
}

function iOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}



let buttonInstall = document.getElementById("buttonInstall");
const isInstalledIOS = 'standalone' in window.navigator && window.navigator.standalone === true;

if (iOS() && !isInstalledIOS) {
    buttonInstall.removeAttribute('hidden');
    buttonInstall.addEventListener('click', async () => {
        alert("To install the application on your home screen, on safari click on the share button and then 'Add to Home Screen'")
    });
} else {
    // Initialize deferredPrompt for use later to show browser install prompt.
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        buttonInstall.removeAttribute('hidden');
        // Optionally, send analytics event that PWA install promo was shown.
        console.log(`'beforeinstallprompt' event was fired.`);
    });

    buttonInstall.addEventListener('click', async () => {
        // Hide the app provided install promotion
        buttonInstall.setAttribute('hidden', true);
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
    });
};