
import requests
import time
from fake_useragent import UserAgent
ua = UserAgent()
domen = 'https://kinopoiskapiunofficial.tech'
# key_api = '8ddff7e1-d699-4f01-aaf6-a98347651223'
# key_api = '6c78c319-3562-4d75-bd42-e40cee7a7010'
key_api = '9788bb82-dfcd-408e-8a86-49f8834b9540'
h = {
    'X-API-KEY': key_api,
}
# print(h)
class API_Cinema():
    """ Films """
    def get_by_keyword(self, text, page=1):
        """Get list of films by keyword
        Args:
            text ([str]): [Текст который ввел пользователь]
        """
        urls = domen + f'/api/v2.1/films/search-by-keyword?keyword={text}&page={page}'
        #print(urls +'\n\n\n\n')
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False

    
    def get_data_film(self, id_kinopoisk, append_to_response='RATING'):
        """Get data of film

        Получаем информацию о фильме

        Args:
            id_kinopoisk ([int]): [id Kinopoisk]
        """
        if(append_to_response == ''):
             urls = domen + f'/api/v2.1/films/{id_kinopoisk}'
        else:
            urls = domen + f'/api/v2.1/films/{id_kinopoisk}?append_to_response={append_to_response}'
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    def get_frame_film(self,id_kinopoisk):
        """Get frame from film
        
        Получаем кадрый из фильма

        Args:
            id_kinopoisk ([int]): [id Kinopoisk]
        """
        urls = domen + f'/api/v2.1/films/{id_kinopoisk}/frames'
        #print(urls)
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    def get_trailer_film(self, id_kinopoisk):
        """Get trailer film
        
        Получаем трейлер фильма

        Args:
            id_kinopoisk ([int]): [id Kinopoisk]
        """
        urls = domen + f'/api/v2.1/films/{id_kinopoisk}/videos'
        # print(urls)
        request = requests.get(urls, headers=h)
        # print(request.status_code)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    def get_sequels_and_prequels_film(self, id_kinopoisk):
        """Get tsequels and prequels film
        
        Получаем сиквелев и приквелев фильма

        Args:
            id_kinopoisk ([int]): [id Kinopoisk]
        """
        urls = domen + f'/api/v2.1/films/{id_kinopoisk}/sequels_and_prequels'
        #print(urls)
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    def get_filters(self):
        """Get filters
        
        Получаем список фильмов фильма
        """
        urls = domen + f'/api/v2.1/films/filters'
        #print(urls)
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    def get_film_in_filters(self, counry=[], genre=[], order = 'RATING', types='ALL', ratingFrom=0, ratingTo=10, yearFrom=1888, yearTo=2021, page=1):
        """Get films in filter
        ~~~
        
        Получаем список фильмов по фиьтру

        Args:
            counry (list, optional): [Страны]. Defaults to [].
            genre (list, optional): [жанры]. Defaults to [].
            order (str, optional): [Соритировать по [RATING, NUM_VOTE, YEAR]]. Defaults to 'RATING'.
            types (str, optional): [Тип программы [ALL, FILM, TV_SHOW]]. Defaults to 'ALL'.
            ratingFrom (int, optional): [Минимальный рейтинг]. Defaults to 0.
            ratingTo (int, optional): [Максимальный рейтинг]. Defaults to 10.
            yearFrom (int, optional): [Минимальный год]. Defaults to 1888.
            yearTo (int, optional): [максимальный год]. Defaults to 2021.
            page (int, optional): [Колличество страниц]. Defaults to 1.

        Returns:
            [(list, optional)]: Данные по поиску
        """
        urls = domen + f'/api/v2.1/films/search-by-filters?'

        for el in genre:
            urls += f'genre={el}&'
        for el in counry:
            urls += f'country={el}&'
        urls += f'order={order}&type={types}&ratingFrom={ratingFrom}&ratingTo={ratingTo}&yearFrom={yearFrom}&yearTo={yearTo}&page={page}'

        print(urls)
        p = {}


        request = requests.get(urls, headers=h, params=p)
        # #print(request.text)
        if(request.status_code == 200):
            return((request.json()))
        elif(request.status_code == 404):
            return('Нечего не нашёл')
        else:
            return False


    def get_top_films(self, types='TOP_100_POPULAR_FILMS', page=1):
        """[Возвращает топ фильмов относительно типа поиска]

        Args:
            type (str, optional): [Тип поиска [TOP_100_POPULAR_FILMS, TOP_AWAIT_FILMS, TOP_250_BEST_FILMS]]. Defaults to 'TOP_100_POPULAR'.
            page (int, optional): [Колличество страницу]. Defaults to 1 на 1 странице 20 фильмов.

        Returns:
            [type]: [description]
        """
        urls = domen + f'/api/v2.2/films/top?type={types}&page={page}'
        #print(urls)
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False

    
    def get_similars_film(self, id_kinopoisk):
        """Получаем похожие фильмы на запрошенный

        Args:
            id_kinopoisk ([int]): id_kinopoisk 

        Returns:
            [list]: similars film
        """
        
        urls = domen + f'/api/v2.2/films/{id_kinopoisk}/similars'
        #print(urls)
        request = requests.get(urls, headers=h)
        #print(request)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    def get_releaze_film(self, year = 2021, month = 'JANUARY', page=1):
        """Получаем релизы по запрошенной дате

        Args:
            id_kinopoisk ([int]): id_kinopoisk 

        Returns:
            [list]: similars film
        """
        
        urls = domen + f'/api/v2.1/films/releases?year={year}&month={month}&page={page}'
        #print(urls)
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    def get_studios_date(self, id_kinopoisk):
        """Get studios data
        
        Данные о студии

        Args:
            id_kinopoisk ([int]): [id Kinopoisk]
        """
        urls = domen + f'/api/v2.1/films/{id_kinopoisk}/studios'
        #print(urls)
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    """ Reviews """    
    def get_reviews(self, id_kinopoisk, page=1):
        """Return set of reviews with pagination. Each page contains no more than 20 reviews.
        
        Отзывы

        Args:
            id_kinopoisk ([int]): [id Kinopoisk]
        """
        urls = domen + f'/api/v1/reviews?filmId={id_kinopoisk}&page={page}'
        #print(urls)
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    def get_reviews_details(self, id_reviews):
        """Return full data for particular review id
        
        Полное описание отзыва

        Args:
            id_reviews ([int]): [id_reviews from get_reviews()]
        """
        urls = domen + f'/api/v1/reviews/details?reviewId={id_reviews}'
        #print(urls)
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    """ Staff """ 
    def get_staff(self, id_kinopoisk):
        """Return list staffs.
        
        Отзывы

        Args:
            id_kinopoisk ([int]): [id Kinopoisk]
        """
        urls = domen + f'/api/v1/staff?filmId={id_kinopoisk}'
        #print(urls)
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False


    def get_staff_details(self, id_person):
        """Return details staff.
        
        Все работы сотрудника - актёра

        Args:
            id_person ([int]): [id person get in get_staff()]
        """
        urls = domen + f'/api/v1/staff/{id_person}'
        #print(urls)
        request = requests.get(urls, headers=h)
        if(request.status_code == 200):
            return((request.json()))
        else:
            return False

