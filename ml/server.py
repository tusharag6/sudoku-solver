from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from Sudoku_Main import solve_sudoku_from_image
import base64

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Hello World!'})


@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        # Get base64-encoded image from the request
        image_base64 = request.json['image64']

        # Process the image using solve_sudoku_from_image function
        solved_sudoku_image = solve_sudoku_from_image(image_base64)

        if solved_sudoku_image is not None:
            # Convert the solved Sudoku image to base64
            _, solved_image_encoded = cv2.imencode(".png", solved_sudoku_image)
            solved_image_base64 = base64.b64encode(
                solved_image_encoded).decode('utf-8')
            # print(solved_image_base64)
            return jsonify({'solved_image64': solved_image_base64, 'mime_type': 'image/png'})
        else:
            print("No Sudoku Found")
            return jsonify({'error': 'No Sudoku Found'})

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, )
