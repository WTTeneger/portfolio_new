from flask import *
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
from app import views, api, errors, film_api