#!flask/bin/python
from app import application 

if __name__=="__main__":
    # application.run(host='localhost', debug=True,threaded=True)
    application.run(host='0.0.0.0', threaded=True, debug=True)