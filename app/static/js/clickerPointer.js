var slov = {
    'open_m': {
        'find': false,
        'filter': false
    }
}
document.addEventListener('click', function() {
    // //console.log('sslov', slov);
    // //console.log(this, arguments);
    cid = arguments[0]['path'][0];
    //console.log(arguments[0]);
    // console.log(cid)
    if (cid.getAttribute('name')) {
        // //console.log('Нажал по смене меню');
        SNA = cid.getAttribute('name')
            //console.log('SNA', SNA);
        doc = document.getElementsByName(SNA)
            //console.log(doc);
        for (iterator in doc) {

            // //console.log(iterator);
            el = doc[iterator]
            el.classList.remove('active')
            if (iterator >= doc.length - 1) {
                //console.log('asd');
                break
            }
            // .classList.remove('active')
        }
        gq = ''
            //console.log('cs', cid.id);
        if (cid.id == "photo-slider") {
            document.getElementsByClassName('b-card__slider-wrapper')[0].children[0].classList.add('active')
            document.getElementsByClassName('b-card__slider-wrapper')[0].children[1].classList.remove('active')
        } else if (cid.id == "trailer-slider") {
            document.getElementsByClassName('b-card__slider-wrapper')[0].children[0].classList.remove('active')
            document.getElementsByClassName('b-card__slider-wrapper')[0].children[1].classList.add('active')

        } else if (cid.id == "similars-slider") {
            document.getElementsByClassName('b-card__slideritem-wrapper')[0].children[0].classList.add('active')
            document.getElementsByClassName('b-card__slideritem-wrapper')[0].children[1].classList.remove('active')

        } else if (cid.id == "sequels-slider") {
            document.getElementsByClassName('b-card__slideritem-wrapper')[0].children[1].classList.add('active')
            document.getElementsByClassName('b-card__slideritem-wrapper')[0].children[0].classList.remove('active')

        } else if (cid.id == "search_pc") {
            //console.log('cid.id', cid.id);
            //console.log('bar', document.getElementsByName('search_pc_div')[0].style.display);
            if ((document.getElementsByName('search_pc_div')[0].style.display == '' || document.getElementsByName('search_pc_div')[0].style.display == 'none') && slov['open_m']['find'] == false) {
                document.getElementsByName('search_pc_div')[0].style = 'display:block;'
                document.getElementById('CTLFilms').style = 'display:none';
                //console.log('Открыл');
                document.getElementsByTagName('body')[0].style = 'overflow: hidden;'
                slov['open_m']['find'] = true
                slov['open_m']['filter'] = false
            }
            // document.getElementsByClassName('search_pc_div').classList.remove('active')
        } else if (cid.id == 'close_search' || cid.id == 'b-search-result' || cid.id == 'main_search' || cid.id == 'closeButtons') {

            //console.log('as', window.innerWidth);
            document.getElementsByTagName('body')[0].style = ''
            document.getElementsByName('search_pc_div')[0].style = 'display:none';
            document.getElementById('CTLFilms').style = 'display:none';
            slov['open_m']['find'] = false
            slov['open_m']['find'] = false


            //console.log('выход');

            // }
        } else if (cid.id == 'catalog_films') {
            if (slov['open_m']['filter'] == false) {
                document.getElementsByName('search_pc_div')[0].style = 'display:none';
                slov['open_m']['find'] = false
                document.getElementById('CTLFilms').style = 'display:block';
                document.getElementsByTagName('body')[0].style = 'overflow: hidden;'
            }

        } else if (cid.id == 'open_window_film') {
            film_id = cid.getAttribute('film_id')
                //console.log('Открыть фильм  ' + film_id);
            document.location.href = "/infofilm/" + film_id;
        } else if (cid.id == 'search-btn close') {
            document.getElementById('search_phone').value = ''
            document.getElementById('search_pc').value = ''
            document.getElementById('list_finded_block').innerHTML = ''
            document.getElementById('count_rez').innerText = 0
        } else if (cid.id == 'all_films') {
            d = localStorage.getItem('find_data')
            document.location.href = '/filters?ProductFilter=allFilm_' + d + '&page=1'
        } else if (cid.id == 'info_page') {
            console.log('Открываем');
        } else if (cid.id == 'film_') {
            //console.log('Фильтр - ', cid.getAttribute('name'));
            document.location.href = '/filters?ProductFilter=' + cid.getAttribute('name') + '&page=1'
                // document.location.href = "/selection?filter=" + cid.getAttribute('name');
        } else if (cid.id == 'Slide_right' || cid.id == 'Slide_left') {
            mg = -1
            cid.name = cid.getAttribute('name');
            if (cid.id == 'Slide_left') {
                mg = 1
            } else {
                mg = -1

            }
            screen_width = window.innerWidth;
            naq = 'Sliders_' + cid.name.replace("Slide_", "");
            //console.log(naq);
            sliders = document.getElementsByName(naq)[0]
                //console.log(sliders);
            block_width = sliders.getElementsByClassName('shop-item')[0].offsetWidth + 20;

            count_viber = parseInt(screen_width / block_width)
            st = ((sliders.style.transform).replace('translateX(', '').replace('px)', ''))
            if (st == '') {
                //console.log('as');
                st = 0
            } else {
                st = parseInt(st)
            }

            splits = (count_viber * block_width * mg) + st
                //console.log(splits, sliders.offsetWidth * mg);
            if ((splits > sliders.offsetWidth * mg && cid.id == 'Slide_right') || (splits <= 0 && cid.id == 'Slide_left')) {
                sliders.style.transform = 'translateX(' + splits + 'px)';
                //console.log(cid.id, screen_width, block_width, count_viber, st);
            }

        } else if (cid.id == 'botton_like') {
            // console.log('работа с лайком');

            let st = false;
            if (cid.style.backgroundPosition == '22.8% 0%') {
                cid.style.backgroundPosition = '0% 16.6%'
                st = false;
            } else {
                cid.style.backgroundPosition = '22.8% 0%'
                st = true;
            }

            $.ajax({
                type: "POST",
                url: '/api/v0.1/post_new_history',
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "data": {
                        "access_tokin": localStorage.getItem('accessToken'),
                        "last_data": {
                            "type": "like_film",
                            "id_film": cid.getAttribute('data-item-id'),
                            "status": false
                        }
                    }
                }),
                async: true,

                success: function(data) {
                    console.log(data);
                },
                statusCode: {
                    405: function(data) {
                        console.error(data['responseJSON']['errors'])
                        cid.style.backgroundPosition = '0% 16.6%'
                    },
                    400: function(data) {
                        console.error(data['responseJSON']['errors'])
                        alert('войдите или зарегайтесь');
                        cid.style.backgroundPosition = '0% 16.6%'
                    },
                    402: function(data) {
                        console.error(data['responseJSON']['errors'])
                        cid.style.backgroundPosition = '0% 16.6%'
                        jwt_new_get()

                    }
                }

            });
        }


        cid.classList.add('active')

    }
});