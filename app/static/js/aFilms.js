changes = false

function sliders_(ids) {
    // //console.log(ids);
    var id = 'films_selection'
        // //console.log(id);
    doq = document.getElementById(id)
        // //console.log('odq', doq);
    var poz = doq.offsetTop;
    $("body,html").animate({ "scrollTop": poz }, 200);
}


function _resizes(dats) {
    // //console.log(dats);
    try {

        q = false
        if (q == true) {
            var yi = document.querySelector(dats);
            if (!yi || !yi.parentNode || !yi.parentNode.parentNode || !yi.parentNode.parentNode.offsetWidth) return;
            var w = parseInt(yi.parentNode.parentNode.offsetWidth);
            yi.style.width = w + 'px';
            yi.setAttribute('width', w.toString());
            yi.parentNode.style.width = w + 'px';
            // //console.log('Изменён');


        }
        qeqwer = ''
        eqwe = ''
        if (dats == '#trailer-iframe') {
            // //console.log('tr');
            eqwe = 'trailer-iframe'
            qeqwer = 'trailer_block_v'
        } else {
            // //console.log('film');
            qeqwer = 'film_block_v'
            eqwe = 'film-iframe'
        }
        w = document.getElementById(qeqwer).offsetWidth;
        h = document.getElementById(qeqwer).offsetHeight;
        add = document.getElementById(eqwe).contentWindow
        add._resize(w, h, true)
        changes = false
        return true
    } catch {
        return false
    }
}



function search_main(el) {
    data_film_now = ''
    $.ajax({
        type: "POST",
        url: '/FilmAPI/v2.1/search',

        data: {
            'code_film': el,
            'timeN': Date.now()
        },
        async: false,
        success: function(data) {
            //console.log('return -- ', data);
            data_film_now = data
        }
    });
    return data_film_now
}



function searchs_T(el) {
    a = document.getElementsByName('trailer_frame')
        // //console.log('trailer  ', a.length);
    if (a.length >= 1) {
        document.getElementById('trailer-iframe').remove()
    } else {
        //console.log('нет объектов trailer')
    }
    main = document.getElementById('trailer_block_v')
    i = document.createElement('iframe');
    i.setAttribute('id', 'trailer-iframe');
    i.setAttribute('frameborder', '0');
    i.setAttribute('name', 'trailer_frame');
    i.setAttribute('class', 'fframe');
    i.setAttribute('allowfullscreen', 'allowfullscreen');

    i.setAttribute('src', decodeURIComponent('/FilmAPI/trailer/3&' + el));

    main.appendChild(i);

    setTimeout(_resizes, 3000, '#trailer-iframe');

}

function searchs_F(el) {
    // //console.log(el);
    a = document.getElementsByName('film_frame')
        // //console.log('Films  ', a.length);
    if (a.length >= 1) {
        document.getElementById('film-iframe').remove()
    } else {
        //console.log('нет объектов FILM')
    }
    main = document.getElementById('film_block_v')
    i = document.createElement('iframe');
    i.setAttribute('id', 'film-iframe');
    i.setAttribute('frameborder', '0');
    i.setAttribute('name', 'film_frame');
    i.setAttribute('allowfullscreen', 'allowfullscreen');
    i.setAttribute('class', 'fframe');
    i.setAttribute('src', decodeURIComponent('/FilmAPI/film/8&' + el));

    main.appendChild(i);
    setTimeout(_resizes, 1000, '#film-iframe');




}

function get_sequels_and_prequels_film(id_film) {
    data_sequels_and_prequels = ''
    $.ajax({
        type: "POST",
        url: '/FilmAPI/v2.1/get_preq',

        data: {
            'code_film': id_film,
            'timeN': Date.now()
        },
        async: false,
        success: function(data) {
            // //console.log('return -- ', data);
            data_sequels_and_prequels = data
        }
    });
    return data_sequels_and_prequels
}


function operator_film_poster(types, el = '') {
    //console.log('ell', types);
    data = types.split('-')
        //console.log(data);
    if ('type' == data[0] || 'year' == data[0]) {
        console.log('Переход на раздел по этому фильтру');
    } else {
        //console.log('data', data[1]);
        //console.log(window.innerWidth);
        if (window.innerWidth <= 768) {
            //console.log('мобилка', el);

            na = el.getAttribute('name')
            el_job = document.getElementById('button_in_poster_' + na);
            //console.log('Стиль пустой', el_job);


            if (el_job.style.opacity == "") {
                //console.log('Ага');
                eq = document.getElementsByName('block_in_poster')
                    //console.log(eq);
                QE = 0
                for (el in eq) {
                    if (QE == eq.length) {
                        break
                    }
                    QE += 1
                    eq[el].style.opacity = ''
                }
                el_job.style.opacity = 1
            } else {
                if (data[1] == 'kinopoisk') {
                    id = el.getAttribute('fid')
                        //console.log('перейти на страницу кинопоиска пока что');
                    window.open("http://kinopoisk.ru/film/" + id);
                } else if (data[1] == 'films') {
                    id = el.getAttribute('fid')
                        //console.log('перейти на страницу фильма');
                    document.location.href = "/film/" + id;
                }
                eq = document.getElementsByName('block_in_poster')
                for (el in eq) {
                    if (el == eq.length - 1) {
                        break
                    }
                    eq[el].style.opacity = ''
                }
                el_job.style.opacity = ''

            }
            document.getElementsByName('block_in_poster')
        } else {
            if (data[1] == 'kinopoisk') {
                id = el.getAttribute('fid')
                    //console.log('перейти на страницу кинопоиска пока что');
                window.open("http://kinopoisk.ru/film/" + id);
            } else if (data[1] == 'films') {
                id = el.getAttribute('fid')
                    //console.log('перейти на страницу фильма');
                document.location.href = "/film/" + id;
            }
        }


    }
}


async function fill_block_films(data_film_now) {
    // //console.log('fill_block_films', data_film_now);
    data_sequels_and_prequels = get_sequels_and_prequels_film((data_film_now['data']['filmId']));
    //console.log(data_sequels_and_prequels);
    docEll = document.getElementById('sequels_and_prequels_films')
    docEll.innerHTML = ''
    for (el in data_sequels_and_prequels) {
        counts = el
        el = (data_sequels_and_prequels[el]);
        genres = ``
        for (es in el['data']['genres']) {
            if (es > 1) {
                break
            }
            eb = el['data']['genres'][es]['genre']
                //console.log(eb);
            genres += `<span onclick="operator_film_poster('type-${eb}')">${eb}</span> `
            scores_ = ''
            ra = parseFloat(el['rating']['ratingImdb'])
                //console.log(ra);
            if (ra > 6.5) {
                scores_ = `<span class="ear_div ege_span rait_6_plus fonts_v1">${ra}</span>`
            } else {
                scores_ = `<span class="ear_div ege_span rait_6_minus fonts_v1">${ra}</span>`
            }
        }
        q = `
        <div class="carusel_item">
            <div class="carusel_item_mb">
                <div fid='${el['data']['filmId']}'>
                    <div class="films_poster">
                        ${scores_}
                        <img class="photo_in_poster" alt="${el['data']['nameRu']}" src="${el['data']['posterUrl']}" srcset="${el['data']['posterUrlPreview']} 2x">

                        <!-- <div class="buttons_div photo_hover"></div> -->
                        <div name='block_in_poster' id="button_in_poster_qe_${counts}" class="Button_in_film button_in_poster">
                            <div name='qe_${counts}' class="kinop" fid='${el['data']['filmId']}' onclick="operator_film_poster('open-kinopoisk', this)">
                                <h1>Кинопоиск</h1>
                            </div>

                            <div name='qe_${counts}' class="button_watcher" fid='${el['data']['filmId']}' onclick="operator_film_poster('open-films', this)">
                                <h1>Смотреть</h1>
                            </div>
                        </div>
                    </div>
                    
                    <div class="div_text_info">
                        <h1>${el['data']['nameRu']}</h1>
                    </div>
                </div>
                <div class="type_film">
                    <span onclick="operator_film_poster('year-${el['data']['year']}')">${el['data']['year']}</span>,
                    ${genres}
                </div>

            </div>
        </div>
        `
        docEll.innerHTML += q
    }


}


function search_(data) {
    // //console.log(data);
    if (data != '') {
        data_film_now = search_main(data)
            // console.log('data_film_now');
        if (data_film_now == '') {
            console.log('Потом писать что нет такого фильма');
        } else {
            id_film = (data_film_now['data']['filmId']);

            searchs_F(id_film);
            // searchs_T(id_film);
            document.getElementById('films_selection').style = ('display: block;');
            fill_block_films(data_film_now)


            setTimeout(_resizes, 5000, '#trailer-iframe');
            setTimeout(_resizes, 5000, '#film-iframe');
            sliders_('films_selection')
        }
    }
}

function button_watcher(el) {
    //console.log('asdasdasd', el);
}

function resizes_in_start() {
    $(window).resize(function() {
        if (changes == false) {
            changes = true
            setTimeout(_resizes, 5000, '#trailer-iframe');
            setTimeout(_resizes, 5000, '#film-iframe');
        }

    });
};
resizes_in_start();
(function() {
    v = document.getElementById('idkfilm').getAttribute('id_film')
        //console.log(v);
    if (v != null) {
        search_(v)
    }
})();