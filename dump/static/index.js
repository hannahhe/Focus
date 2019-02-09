navigator.mediaDevices.getUserMedia({ //get access to user's microphone/cam
  'audio': true,
  'video': false, //don't need cam
} ).then((stream) => {
  const audioContext = new AudioContext(); //OBJECT
  const input = audioContext.createMediaStreamSource(stream); //Get a stream source
  const recorder = new WebAudioRecorder(input, { //from library
    'workerDir': '/static/', //1. provides audio reorder and access
    'numChannels': 1, //want monosound and not stero
  }); //CHROME AND FIREFOX HAPPY
  recorder.onComplete = (rec, blob) => {  //what to do when finished recording?
    const url = '/speechdata';
    fetch(url, {
      method: 'POST', //SHOVE TO SERVER
      body: blob,
    });
  };
  recorder.startRecording();
  setTimeout(() => { recorder.finishRecording(); }, 2000); //set how long it's recording
}).catch((err) => {
  console.log("There was an error", err); //WHAT HAPPENS WHEN YOU'RE MICLESS?
});
