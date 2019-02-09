from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route("/")
def hello():
        return render_template('./public/index.html')
