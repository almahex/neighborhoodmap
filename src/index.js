import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

var registerSw = function() {
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

ReactDOM.render(
	<BrowserRouter><App /></BrowserRouter>,
	document.getElementById('root')
	);
registerSw();
