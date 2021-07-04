data_user = {}

class user_servise():
    def get(self, hashz):
        # Если нет пользователя то создаёт его
        print(data_user)
        if not hashz in data_user:
            # print('Нет') 
            data_user[hashz] = {
                'id':'',
                'name':'',
                'valk':'',
                'jwt':''
            }
            data_user[hashz]['id'] = hashz
            
        return data_user[hashz]
