from app import app

from service import JWT, data_base, theards, user_server_data
from app import *

from settings import env
# tokin_service = JWT.tokinService(env)


# resp.set_cookie('sessionID', '', expires=0)   #Сбросить куки
tokinService = JWT.tokinService()


@app.route('/api/v0.1/login', methods=['POST', "GET"])
def api_jwt_get_11244():
    if request.cookies.get('refreshToken'):
        abort(405)
    if not request.cookies.get('refreshToken'):
        req = request.data.decode()
        print(req)
        if(req != ''):
            f = json.loads(req)
            print(f)
        jwts = tokinService.generateTokins({"dq":'qwe'})
        print(jwts)
        res = make_response({'accessToken' : jwts['accessTokin']})
        res.set_cookie('refreshToken', jwts['refreshTokin'], 60*60*24*30)

    return res

@app.route('/api/v0.1/users', methods=['POST', "GET"])
def api_jwt_test_11244():  
    f = json.loads(request.data.decode())
    if('refreshTokin' in f):
        jwts = tokinService.decodeTokins('REFRESH', f['refreshTokin'])
    elif('accessTokin' in f):
        jwts = tokinService.decodeTokins('ACCESS', f['accessTokin'])
    else:
        abort(400)
    return(jwts)