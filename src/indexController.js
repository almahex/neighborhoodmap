//Register service worker at the begging
export default function register() {
	if (navigator.serviceWorker) {
	  navigator.serviceWorker.register('/sw.js')
	  .then(function(registration) {
	    console.log('Service worker regisregistered:', registration);
	  })
	  .catch(function(error) {
	    console.log('Service worker registration failed:', error);
	  });
	} else {
	  console.log('Service workers are not supported.');
	}
}