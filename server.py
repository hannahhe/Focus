from flask import Flask, render_template, request, jsonify
import requests
from flask import send_from_directory
import os

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('./public/index.html')
    
@app.route("/processaudio", methods=['PUT'])
def process():
	data = request.form
	requests.put("https://speech.googleapis.com/v1/speech:longrunningrecognize", data)	

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
