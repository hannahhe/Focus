from flask import Flask, render_template, request, jsonify
from flask import send_from_directory
import os

app = Flask(__name__)

@app.route("/")
def hello():
        return render_template('./public/index.html')
def text():
    print(request.form) #request.form, request.files
    
    if request.method == 'PUT' and 'GraphImage' in request.files:
        photo = request.files['GraphImage']
        in_memory_file = io.BytesIO()
        photo.save(in_memory_file)
        data = np.fromstring(in_memory_file.getvalue(), dtype=np.uint8)
        color_image_flag = 1
        img = cv2.imdecode(data, color_image_flag)
    if(isinstance(graph1, GraphTheory)):
        laTexCode = graph1.detectPointsAndAxes(img, numEdges)
    if(isinstance(graph1, ScatterPlot)):
        laTexCode = graph1.detectPointsAndAxes(img)
    if(isinstance(graph1, Function)):
        D1 =  request.form["D1"]
        D2 =  request.form["D2"]
        X1 =  request.form["X1"]
        X2 =  request.form["X2"]
        Y1 =  request.form["Y1"]
        Y2 =  request.form["Y2"]
        laTexCode = graph1.plotFunction(func, D1, D2, X1, X2, Y1, Y2)


    return jsonify({'latex': laTexCode}) #jsonify: turns python dictionaries into json

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
