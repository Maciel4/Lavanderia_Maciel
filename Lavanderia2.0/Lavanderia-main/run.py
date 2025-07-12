from app import create_app

app = create_app()

if __name__ == "__main__": 
    app.run(debug=True)

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  #