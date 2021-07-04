from app import *

from service import JWT, data_base, theards, user_server_data, API_Yandex

from settings import env

@app.route('/')
def index():
    access = True
    return render_template('main.html', access = access)


@app.route('/film')
def film_new():
    
    Top_now = API_Yandex.API_Cinema.get_top_films(None)
    Top_wating = API_Yandex.API_Cinema.get_top_films(None, types='TOP_AWAIT_FILMS')
    Top_clasic = API_Yandex.API_Cinema.get_top_films(None, types='TOP_250_BEST_FILMS')

    # print(Top_now['films'][0]['filmId'])
    mPhoto = API_Yandex.API_Cinema.get_frame_film(None, Top_now['films'][0]['filmId'])
    info_films = API_Yandex.API_Cinema.get_data_film(None, Top_now['films'][0]['filmId'])
    access = True
    print(info_films)
    genres = API_Yandex.API_Cinema.get_filters(None)
    descrt = info_films['data']['description'].split('.')
    description = descrt[0] +'.' + descrt[1] +'.'
    Main_poster = {
        'data':{
            'description': description,
            'nameRu': info_films['data']['nameRu'],
            'filmId': info_films['data']['filmId'],
            'image': mPhoto['frames'][0]['image']
        }
        
    }
    # if not request.cookies.get('account_hash'):
        # account_hash = generate_account_hash(hash)
        # res = make_response(render_template('watch_films.html',test=False, Main_poster=Main_poster, genres=genres, Top_now=Top_now, Top_wating=Top_wating, Top_clasic=Top_clasic))
        # res.set_cookie('account_hash', account_hash, 60*60*200)
    # else
    res = render_template('watch_films.html',test=False, Main_poster=Main_poster, genres=genres, Top_now=Top_now, Top_wating=Top_wating, Top_clasic=Top_clasic)
    return res


@app.route('/datafilm/<id>')
@app.route('/infofilm/<id>')
def info_film(id):
    code = id
    test = False
    ty = 'name'
    try:
        code = int(code)
        ty = 'id'
    except:
        ty='name'
    data = {'data':{}}
    photo_data='photo_data'
    trailer_data = 'trailer_data'
    sequels_data='sequels_data'
    similars_data='similars_data'
    genres='genres'
    # print(ty)
    if(ty == 'name'):
        f = API_Yandex.API_Cinema.get_by_keyword(None, text=str(code))['films'][0]['filmId']
    else:
        f = code
    data = API_Yandex.API_Cinema.get_data_film(None, f)

    try:
        # data = API_Yandex.API_Cinema.get_data_film(None, f)
        d = data['data']
        photo_data = API_Yandex.API_Cinema.get_frame_film(None, f)
        
        trailer_data = API_Yandex.API_Cinema.get_trailer_film(None, f)
        sequels_data = API_Yandex.API_Cinema.get_sequels_and_prequels_film(None, f)
        similars_data = API_Yandex.API_Cinema.get_similars_film(None, f)
        genres = API_Yandex.API_Cinema.get_filters(None)

        
    except:
        return redirect('/')
    '. '
    co = 0
    try:
        for el in trailer_data['trailers']:
            if(el['site'] == 'YouTube' or el['site'] == 'YOUTUBE'):
                code = el['url'].replace('https://www.youtube.com/watch?v=','').replace('https://www.youtube.com/v/','')
                el['prevew'] = f'https://img.youtube.com/vi/{code}/maxresdefault.jpg'
    except:
        trailer_data = None
    
    try:
        photo_data['frames'][0]
    except:
        photo_data = False
    print(data)
    return render_template('main_info.html', test=test, data=data, photo_data=photo_data, trailer_data = trailer_data, sequels_data=sequels_data, similars_data=similars_data, genres=genres, film_id = f)


