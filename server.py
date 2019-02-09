from flask import Flask, render_template, request, jsonify
from flask import send_from_directory
import os

app = Flask(__name__)

@app.route("/")
def hello():
        return render_template('./public/index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
