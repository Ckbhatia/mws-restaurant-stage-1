//Checking for service worker.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('../sw.js', {
            scope: '../'
        });
    });
}

//registering service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
        .then(function(registration) {
            console.log('Registration worked!,scope is:', registration.scope);
        })
        .catch(function(error) {
            console.log('Registration failed!', error);
        });
}