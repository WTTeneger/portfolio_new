
from app import app
from app import *

@app.errorhandler(404)
def page_not_found(e):
    return 'ОШИБОЧКА', e.code
    # return render_template("errors.html") #('404.html')


@app.errorhandler(400)
def page_not_found(e):
    return {
        'errors':'Введены неверные данные',
        'data': str(e)
        },e.code #('404.html')

@app.errorhandler(405)
def page_not_found(e):
    return {
        'errors':'Вы уже получили данные',
        'data': str(e)
        }, e.code #('404.html')


@app.errorhandler(500)
def page_not_found_500(e):
    return (e) #('404.html')
