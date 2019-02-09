from flask import Flask, render_template, request, jsonify
import requests
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('./public/index.html')
    
@app.route("/processaudio", methods=['PUT'])
def process():
	data = request.form
	requests.put("https://speech.googleapis.com/v1/speech:longrunningrecognize", data)
	
	
	
