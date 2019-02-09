from flask import Flask, render_template, request, jsonify, redirect, url_for
import requests
from flask import send_from_directory
from CategoryClassification import isOffTopic
import os
import io
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types
import json

client = speech.SpeechClient()
category = ""
runningtext = ""

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
@app.route("/")
def hello():
    return render_template('./public/index.html')

@app.route("/processaudio", methods=['PUT'])
def process():
	data = request.form
	requests.put("https://speech.googleapis.com/v1/speech:longrunningrecognize", data)

@app.route('/cat', methods=['POST'])
def cat():
    print(request.form) #request.form, request.files
    global category
    category = request.form["cat"]
    #offTopic = isOffTopic(category, "seaweed puffer fish sharks whales i like hobbies and leisure seahorses swimming through the water. submarines exploring plankton. Something fish swim bubbles i go to the beach ocean things she sells sea shells by the seashore spongebob patrick the star barnacle boy")
    #print("offTopic", offTopic)
    #return jsonify({'offT': offTopic})
    return "NO RESPONSE" #required return

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route("/speechdata", methods=["POST"])
def speechdata():
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16, #encoding, representing audio in bits
        language_code='en-US') #IN ENGLISH
    audio = types.RecognitionAudio(content = request.data) #turn bytes to other type
    response = client.recognize(config, audio) #call to google server
    print("response: ")
    print(response.results)
    for result in response.results: #list of results (possible transcriptions)
        print('Transcript: {}'.format(result.alternatives[0].transcript)) #print out
    if (len(response.results) != 0):
        global runningtext
        runningtext += " "+response.results[0].alternatives[0].transcript
        print("runningtext: "+runningtext)
        if (len(runningtext.split(" ")) >= 21):
            offTopic = isOffTopic(category, runningtext)
            print("offTopic", offTopic)
            runningtext = ""
            return jsonify({'offT': offTopic})
    return jsonify({}) #required return
