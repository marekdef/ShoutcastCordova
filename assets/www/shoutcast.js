// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	
}

// Audio player
//
var my_media = null;
var mediaTimer = null;
var url = null;
var oldUrl = null;

// Play audio
//
function playAudio(src) {
	if (my_media == null || url != oldUrl) {
		// Create Media object from src
		if(my_media != null) {
			//my_media.stop();
			my_media.release();
			my_media = null;
		}
		my_media = new Media(src, onSuccess, onError);
	} // else play current audio
	// Play audio
	my_media.play();

	// Update my_media position every second
	if (mediaTimer == null) {
		mediaTimer = setInterval(function() {
			// get my_media position
			my_media.getCurrentPosition(
			// success callback
			function(position) {
				if (position > -1) {
					setAudioPosition("Position: " + (position) + " sec");
				}
			},
			// error callback
			function(e) {
				console.log("Error getting pos=" + e);
				setAudioPosition("Error: " + e);
			});
		}, 1000);
	}
}

// Pause audio
//
function pauseAudio() {
	if (my_media) {
		my_media.pause();
	}
}

// Stop audio
//
function stopAudio() {
	if (my_media) {
		//my_media.stop();
		my_media.release();
		my_media = null;
	}
	clearInterval(mediaTimer);
	mediaTimer = null;
}

// onSuccess Callback
//
function onSuccess() {
	oldUrl = url;
	console.log("playAudio():Success");
}

// onError Callback
//
function onError(error) {
	console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

// Set audio position
//
function setAudioPosition(position) {
	document.getElementById('audio_position').innerHTML = position;
}

// changeUrl
//
function changeUrl(newUrl) {
	console.log("changeUrl():newUrl = " + newUrl);
	url = newUrl;
	document.getElementById('inputUrl').value = newUrl;
}

// changePlayingUrl
//
/*
function changePlayingUrl(newUrl) {
	url = newUrl;
	my_media.play(url);
}
*/