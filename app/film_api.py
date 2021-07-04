from app import *

from service import JWT, data_base, theards, user_server_data, API_Yandex
import time
from settings import env

@app.route('/FilmAPI/v2.1/search', methods=["POST"])
def search_film():
    f = request.form
    code = f['code_film'] 
    print('as',code)
    ty = 'name'
    try:
        code = int(code)
        ty = 'id'
    except:
        ty='name'

    print(ty)

    if(ty == 'name'):
       f = API_Yandex.API_Cinema.get_by_keyword(None, text=str(code))['films'][0]['filmId']
    else:
        f = code
    qe = API_Yandex.API_Cinema.get_data_film(None, f)
    return(qe)
    
    
    
@app.route('/FilmAPI/film/<apiK>&<Fname>')
def get_films(apiK, Fname):
    if(apiK):
        f = ''
        types = 'id' #id, name
        try:
            f = int(Fname)
            print('int', f)  
            types = 'id'
        except:
            f = Fname
            print('str', f)
            types = 'name'
        print(types, f)
        return render_template('film.html', type=types, dt = f)



@app.route('/filters', methods=['GET','POST'])
def film_filters():
    print('rb',request.method )
    filters =request.args.get('ProductFilter')
    page = 1
    page = request.args.get('page')
    genres = API_Yandex.API_Cinema.get_filters(None)
    # print(genres)
    name = ''
    print(filters)
    if('top_' in filters):
        els = filters.replace('top_','')
        if(els == 'main'):
            #[TOP_100_POPULAR_FILMS, TOP_AWAIT_FILMS, TOP_250_BEST_FILMS]
            data = API_Yandex.API_Cinema.get_top_films(None, types='TOP_250_BEST_FILMS', page=page)
            name = 'Самая настоящая классика'
        elif(els == 'now'):
            data = API_Yandex.API_Cinema.get_top_films(None, types='TOP_100_POPULAR_FILMS', page=page)
            name = 'Сейчас популярно'
        elif(els == 'await'):
            data = API_Yandex.API_Cinema.get_top_films(None, types='TOP_AWAIT_FILMS', page=page)
            name = 'Ожидает весь мир'
    
    
    elif('person_' in filters):
        els = filters.replace('person_','')
        data = API_Yandex.API_Cinema.get_staff_details(None, els)
        count_general = 0
        name = data['nameRu']
        das = {'films':[]}
        c = 0
        count_films = 0
        ln = ''
        # print(page)
        if(int(page) <= 5):
            for el in data['films']:
                # print('el',el)
                # print(c)
                if el['professionKey'] == 'ACTOR': #and el['general'] == True:
                    if(c > (int(page)-1) * 10):
                        # print(c, (int(page)-1) * 10)
                        elss = API_Yandex.API_Cinema.get_data_film(None, el['filmId'])['data']
                        if(elss['type'] == 'FILM' and el['rating'] != str(0.0)):
                            elss['rating'] = el['rating']
                            das['films'].append(elss)
                        
                            count_films += 1
                        time.sleep(0.3)
                    if((c >= int(page) * 10 and count_films >= 10)):
                        break           
                    c += 1
            data = das
        else:
            data = 'None'        # print(data)


    elif('allFilm_' in filters):
        els = filters.replace('allFilm_','')
        data = API_Yandex.API_Cinema.get_by_keyword(None, els, page)
        name = f'Поиск по ({els})'
    
    
    else:
        for el in genres['genres']:
            
            # print(int(el['id']) , int(filters), int(el['id']) == int(filters))
            # print(el)
            try:
                int(filters)
                if int(el['id']) == int(filters):
                    name = el['genre']
                    idqq = el['id']
                    break
            except:
                if(filters == el['genre']):
                    name = el['genre']
                    idqq = el['id']
        # print(idqq, name)
        data = API_Yandex.API_Cinema.get_film_in_filters(None, genre=[idqq], page=page)
    if(request.method =='GET'):
        return render_template('FILTER_LIST.html', data = data, genres = genres, name = name, filters=filters)
    else:
        return(data)



@app.route('/FilmAPI/v2.1/get_in_text', methods=["POST"])
def get_in_text():
    qe = ''
    if request.method == 'POST':
        f = request.form
        text = f['text'] 
        qe = API_Yandex.API_Cinema.get_by_keyword(None, text)
        
    else:
        qe = False
    # print(qe)

    return(qe)



@app.route('/catalogFilter')
def catalogFilter():
    filters =request.args.get('ProductFilter')
    page = request.args.get('page')
    genres = API_Yandex.API_Cinema.get_filters(None)
    name = 'Жанры'
    return render_template('catalogFilter.html', genres = genres, name = name)



@app.route('/film/torrentcatalog/<fid>')
def torrentcatalog(fid):
    print(fid)
    genres = API_Yandex.API_Cinema.get_filters(None)
    return render_template('torrent_catalog.html', film_id =fid, genres = genres)
