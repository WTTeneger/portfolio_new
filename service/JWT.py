import jwt
import json
import base64
import time

from settings import env



class tokinService():
    def __init__(self):
        """ Конструктор 
        
        При создание принимает ключ шифровки
        """

    def generateTokins(self, payload) -> json:
        """
        Генерит пару ключей

        Returns:
            json: [description]
        """
        data = { "payload":{
            'data': payload,
            'expiresIn': '30m',
            'time_create': time.time()
        }}
        ACCESS = jwt.encode(data, env.JWT_ACCESS_SECRET, algorithm="HS256")

        data['payload']['expiresIn'] = '30d'
        
        REFRESH = jwt.encode(data, env.JWT_REFRESH_SECRET, algorithm="HS256")

        data_re = {
            'accessTokin':ACCESS,
            'refreshTokin':REFRESH
        }
        return(data_re)


    
    def decodeTokins(self, type_sc:str = 'ACCESS', JWT_text:str = '') -> json:
        if(type_sc =="ACCESS"):
            q = jwt.decode(JWT_text, env.JWT_ACCESS_SECRET, algorithms=["HS256"])
        else:
            q = jwt.decode(JWT_text, env.JWT_REFRESH_SECRET, algorithms=["HS256"])
        return(q)
        
