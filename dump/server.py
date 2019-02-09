from flask import Flask, render_template, request, redirect, url_for
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types
import json

# instantiates a client
client = speech.SpeechClient()

# app configuration
app = Flask(__name__)
app.debug = False
PORT = 8080

# routing
@app.route("/")
def homePage():
    return render_template("index.html")

@app.route("/speechdata", methods=["POST"])
def speechdata():
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16, #encoding, representing audio in bits
        language_code='en-US') #IN ENGLISH
    audio = types.RecognitionAudio(content = request.data) #turn bytes to other type
    response = client.recognize(config, audio) #call to google server
    print('hi')
    print(response.results)
    for result in response.results: #list of results (possible transcriptions)
        print('Transcript: {}'.format(result.alternatives[0].transcript)) #print out
    return "NO RESPONSE" #required return

# start the app if we're directly running this file
if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = PORT)
