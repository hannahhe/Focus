from flask import Flask, render_template, request, jsonify
from flask import send_from_directory
from CategoryClassification import isOffTopic
import os
import io

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
@app.route("/")
def hello():
        return render_template('./public/index.html')
@app.route('/cat', methods=['POST'])
def cat():
    print(request.form) #request.form, request.files
    category = request.form["cat"]
    offTopic = isOffTopic(category, "seaweed puffer fish sharks whales i like hobbies and leisure seahorses swimming through the water. submarines exploring plankton. Something fish swim bubbles i go to the beach ocean things she sells sea shells by the seashore spongebob patrick the star barnacle boy")
    print("offTopic", offTopic)
    return jsonify({'offT': offTopic})

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
