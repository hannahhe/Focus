navigator.mediaDevices.getUserMedia({
  'audio': true,
  'video': false,
} ).then((stream) => {
  const audioContext = new AudioContext();
  const input = audioContext.createMediaStreamSource(stream);
  const recorder = new WebAudioRecorder(input, {
    'workerDir': '/static/',
    'numChannels': 1,
  });
  recorder.onComplete = (rec, blob) => {
    const url = '/speechdata';
    fetch(url, {
      method: 'POST',
      body: blob,
    });
  };
  recorder.startRecording();
  setTimeout(() => { recorder.finishRecording(); }, 2000);
}).catch((err) => {
  console.log("There was an error", err);
});
