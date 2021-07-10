from flask import *
from flask_cors import CORS
application = Flask(__name__)
CORS(application)
from app import views, api, errors, film_api