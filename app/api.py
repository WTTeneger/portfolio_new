from app import app

from service import JWT, data_base, theards, user_server_data
from app import *

from settings import env
# tokin_service = JWT.tokinService(env)


# resp.set_cookie('sessionID', '', expires=0)   #Сбросить куки
tokinService = JWT.tokinService()


import random, datetime




@app.route('/api/v0.1/register', methods=['POST', "GET"])
def api_register_user():
    req = request.data.decode()
    # print('v,',req)
    if(req != ''):
        f = json.loads(req)
        print(f)
        if('data' in f and ('login' and 'password' and 'email' in f['data'])):
            result = data_base.DB.GET(f""" SELECT id FROM users WHERE `e-mail` = "{f['data']['email']}" or `login` = "{f['data']['login']}" """)
            print(result)
            if(len(result) > 0):
                return({'errors':'аккаунт с такими данными уже существует'}, 405)
            else:
                password_hash = JWT.password_cache.hash_password(None, f['data']['password'])
                cod_ = random.randint(100, 999)
                print('код', cod_)
                data_base.DB.POST(f"""INSERT INTO users VALUES(Null, '{f['data']['login']}', '{password_hash}', '{f['data']['email']}', '{cod_}', 0)""")
                return({'text':'Аккаунт создан','lg':f['data']['login']}, 200)
        else:
            abort(400)
    else:
        abort(404)

@app.route('/api/v0.1/verificate', methods=['POST', "GET"])
def api_verificate_user():
    req = request.data.decode()
    if(req != ''):
        f = json.loads(req)
        if('data' in f and ('login' and 'code' in f['data'])):
            result = data_base.DB.GET(f""" SELECT code_mail FROM users WHERE login = '{f['data']['login']}' and validation = 0 """)
            if(len(result) > 0):
                if(int(f['data']['code']) == int(result[0][0])):
                    data_base.DB.POST(f""" UPDATE users SET validation = 1, code_mail = 0 WHERE login = '{f['data']['login']}' """)
                    return({'errors':'Верный код'}, 200)
                else:
                    return({'errors':'Не верный код'}, 400)
            else:
                return({'errors':'Нет проверяемого аккаунта'}, 400)
    else:
        abort(404)

@app.route('/api/v0.1/login', methods=['POST', "GET"])
def api_login_user():
    qr_next = False
    if request.cookies.get('refreshToken'):
        result = tokinService.decodeTokins(type_sc='REFRASH', JWT_text=request.cookies.get('refreshToken'))
        print(result)
        result_db = data_base.DB.GET(f""" SELECT * FROM `auth_data` WHERE `id_user` = {result['payload']['data']['id_user']} and `refreshToken` = '{request.cookies.get('refreshToken')}' """)
        print('result_db', result_db)
        if(len(result_db) == 0):
            # res = make_response('Устарел')
            # res.set_cookie('refreshToken', '', 0)
            # return(res, 402)
            qr_next = True
        else:
            print('Повторная авторизация, перезапись')
            # qr_next = True
            return({'errors':'вы уже вошли'}, 400)
    if not request.cookies.get('refreshToken') or qr_next == True:
        req = request.data.decode()
        if(req != ''):
            f = json.loads(req)
            daq ={
                'password':'pass',
                'login':'qwe',
            }
            if('data' in f and ('login' and 'password' in f['data'])):
                if(qr_next == False):
                    daq['password'] = f['data']['password']
                    daq['login'] = f['data']['login']
                    results_db = data_base.DB.GET(f""" SELECT * FROM users WHERE `login` = '{daq['login']}' """)
                else:
                    daq['password'] = result['payload']['data']['password']
                    daq['login'] = result['payload']['data']['id_user']
                    results_db = data_base.DB.GET(f""" SELECT * FROM users WHERE `id` = '{daq['login']}' """)

                print('_________', qr_next, results_db)
                if(len(results_db) > 0):
                    print('Есть аккаунт такой')
                    print(daq)
                    if(JWT.password_cache.check_password(None, results_db[0][2], daq['password'])):
                        print('Все верно')
                        jwts = tokinService.generateTokins({"id_user": results_db[0][0], 'password': daq['password']})
                        print(jwts)
                        res = make_response({'accessToken' : jwts['accessTokin']})
                        res.set_cookie('refreshToken', jwts['refreshTokin'], 60*60*24*30)
                        data_base.DB.POST(f""" INSERT INTO auth_data VALUES(null, {results_db[0][0]}, '{request.remote_addr}', '{jwts['refreshTokin']}', '{jwts['accessTokin']}', '{datetime.datetime.now()}') """)
                        return(res, 200)
                    else:
                        res = make_response({'errors':'Не верный пароль'})
                        res.set_cookie('refreshToken', 's', 0)
                        return(res, 400)
                else:
                    return({'errors':'Нет такого пользователя'}, 400)
            else:
                return({'errors':'Не верный формат'}, 400)
        else:
            abort(404)



@app.route('/api/v0.1/replace_pass', methods=['POST', "GET"])
def api_replace_password_user():
    req = request.data.decode()
    
    if(req != ''):
        f = json.loads(req)
        if('data' in f and ('now_password' and 'access_tokin' and 'new_password' and 'type_access' in f['data'])):
            print('Все есть')
            if(f['data']['type_access'] == 'mail'):
                print('По почте')
                #Сразу меняем
            else:
                print('По паролю')
                #Правильный ли старый пароль
                otv = JWT.tokinService.decodeTokins(None, type_sc="ACCESS", JWT_text=f['data']['access_tokin'])
                print(otv)

                status_tokin, types_status = JWT.tokinService.checkTokins(None, otv)
                print(status_tokin, types_status)
                if(status_tokin):
                    data_base.DB.POST(f"""UPDATE users SET password = '{JWT.password_cache.hash_password(None, f['data']['new_password'])}' WHERE id={otv['payload']['data']['id_user']} """)
                    data_base.DB.POST(f""" DELETE FROM `auth_data` WHERE id_user = {otv['payload']['data']['id_user']} """)
                    # return redirect('/auth')
                else:
                    print('Устарел')  
                    return({'errors':'Токин устарел'}, 400)
                    
    return(req)



@app.route('/api/v0.1/refresh_tokin', methods=['POST', "GET"])
def api_refresh_tokin_user():
    if(request.cookies.get('refreshToken')):
        otv = JWT.tokinService.decodeTokins(None, type_sc="REFRESH", JWT_text=request.cookies.get('refreshToken'))
        results_db = data_base.DB.GET(f""" SELECT * FROM users WHERE `id` = '{otv['payload']['data']['id_user']}' """)
        if(len(results_db)>0):
            if(JWT.password_cache.check_password(None, results_db[0][2], otv['payload']['data']['password'])):
                jwts = tokinService.generateTokins({"id_user": results_db[0][0], 'password': otv['payload']['data']['password']})
                # print(jwts)
                res = make_response({'accessToken' : jwts['accessTokin']})
                res.set_cookie('refreshToken', jwts['refreshTokin'], 60*60*24*30)
                otvs = data_base.DB.GET(f"""SELECT * FROM auth_data WHERE refreshToken = '{request.cookies.get('refreshToken')}'""")
                if(len(otvs)>0):
                    print('Обновляем текущий')
                    data_base.DB.POST(f""" UPDATE auth_data SET refreshToken = '{jwts['refreshTokin']}', accessToken = '{jwts['accessTokin']}' """)
                else:
                    print('Добавляем новый')
                    data_base.DB.POST(f""" INSERT INTO auth_data VALUES(null, {results_db[0][0]}, '{request.remote_addr}', '{jwts['refreshTokin']}', '{jwts['accessTokin']}', '{datetime.datetime.now()}') """)
                return(res, 200)
            else:
                res = make_response({'errors':'Не верный пароль'})
                res.set_cookie('refreshToken', 0, 0)
                return(res, 400)
        else:
            res = make_response({'errors':'Нет аккаунта'})
            res.set_cookie('refreshToken', 0, 0)
            return(res, 400)
    else:
        res = make_response({'errors':'Не авторизирован'})
        res.set_cookie('refreshToken', 0, 0)
        return(res, 400)






@app.route('/api/v0.1/users', methods=['POST', "GET"])
def api_get_test():  
    f = json.loads(request.data.decode())
    if('refreshTokin' in f):
        jwts = tokinService.decodeTokins('REFRESH', f['refreshTokin'])
    elif('accessTokin' in f):
        jwts = tokinService.decodeTokins('ACCESS', f['accessTokin'])
    else:
        abort(400)
    return(jwts)









#Авторизация, регистрация
@app.route('/api/v0.1/users', methods=['POST', "GET"])
def api_auths():
    print('as')
    return('as')  