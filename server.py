from flask import Flask, render_template, request, jsonify
import requests
from flask import send_from_directory
import io
import os

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('./public/index.html')

@app.route("/processaudio", methods=['PUT', 'POST'])
def process():
    print(type(request.data))
    print(len(request.data))

    #data = dict(request.data)["audio"]
    #for i in data:
    #    print(i)
    #print("data: "+str(data))
    transcribe_file(request.data)
    #requests.put("https://speech.googleapis.com/v1/speech:longrunningrecognize", data)
    return ""

def transcribe_file(speech_file):
    """Transcribe the given audio file."""
    from google.cloud import speech
    from google.cloud.speech import enums
    from google.cloud.speech import types
    client = speech.SpeechClient()

    with io.open('/Users/Chittesh/Downloads/Testaudio.m4a', 'rb') as audio_file: #change to speech_file
        content = audio_file.read()

    audio = types.RecognitionAudio(content=content)
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.OGG_OPUS,
        sample_rate_hertz=16000,
        language_code='en-US')

    response = client.recognize(config, audio)
    print(response)

    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    for result in response.results:
        # The first alternative is the most likely one for this portion.
        print(u'Transcript: {}'.format(result.alternatives[0].transcript))

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
