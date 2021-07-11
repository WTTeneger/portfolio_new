block_1_poze = 0
block_2_poze = 0

// var er1;

function roll(poz, from, er) {
    width_ = 0;

    main_parent = document.getElementsByClassName('slick-track')[from - 1]
    pozq = (main_parent.style.transform).replace('translate3d(', '').replace('px, 0px, 0px)', '')
        //console.log('pozq', pozq);
    width_ = main_parent.children[0].offsetWidth
    block_1_poze = pozq / (width_ * -1)
    if (poz == 'left' && block_1_poze > 0) {
        //console.log('Свайп влево');
        //console.log(width_, block_1_poze - 1);
        qpx = (parseInt(width_) * parseInt(block_1_poze - 1)) * -1
        block_1_poze -= 1
            //console.log(qpx);
        main_parent.style.transform = "translate3d(" + qpx + "px, 0px, 0px)"
    }
    // 
    // 
    else
    if (poz == 'right' && block_1_poze < main_parent.childElementCount - 1) {
        //console.log('Свайп вправо');
        //console.log(width_, block_1_poze + 1);
        qpx = (parseInt(width_) * parseInt(block_1_poze + 1)) * -1
        block_1_poze += 1
            //console.log(qpx);
        main_parent.style.transform = "translate3d(" + qpx + "px, 0px, 0px)"
    }
    //console.log('block_1_poze', block_1_poze);
    if (block_1_poze > 0 || block_1_poze < main_parent.childElementCount - 1) {
        document.getElementsByName('roll_seting_' + from)[0].style.opacity = 1
        document.getElementsByName('roll_seting_' + from)[1].style.opacity = 1
    }
    if (block_1_poze <= 0) document.getElementsByName('roll_seting_' + from)[1].style.opacity = 0.3;
    if (block_1_poze >= main_parent.childElementCount - 1) document.getElementsByName('roll_seting_' + from)[0].style.opacity = 0.3;

    if (from == 3 || from == 4) {
        as_100 = main_parent.childElementCount
        strs = as_100
        if (as_100 % 2 != 0) strs = parseInt(strs + 1)

        proz = 100 / strs
            //console.log(proz, block_1_poze);
        nowP = block_1_poze * proz;
        //console.log('nowP', nowP);
        document.getElementsByClassName('b-control__progressbar-value')[from - 3].style.width = proz + '%';
        document.getElementsByClassName('b-control__progressbar-value')[from - 3].style.left = nowP + '%'
            //console.log('sss', block_1_poze, main_parent.childElementCount - 1);
        if (block_1_poze > 0 || block_1_poze < main_parent.childElementCount - 1) {
            document.getElementsByName('roll_seting_' + from)[0].style.opacity = 1
            document.getElementsByName('roll_seting_' + from)[1].style.opacity = 1
        }
        if (block_1_poze <= 0) document.getElementsByName('roll_seting_' + from)[0].style.opacity = 0.3;
        if (block_1_poze >= main_parent.childElementCount - 1) document.getElementsByName('roll_seting_' + from)[1].style.opacity = 0.3;
    }

    // 
}


dataq = ''


function change_data(param) {
    //console.log(param);
    doc = document.getElementsByClassName('b-tabs__head js-custom-scrollbar')[0]
    main_data = document.getElementsByClassName('b-tabs__body')[0]

    doc.children[0].classList.remove('active')
    doc.children[1].classList.remove('active')
    doc.children[2].classList.remove('active')
    doc.children[param - 1].classList.add('active')
        //console.log(doc);
        //console.log(main_data);
    main_data.children[0].classList.remove('active')
    main_data.children[1].classList.remove('active')
    main_data.children[2].classList.remove('active')
    main_data.children[param - 1].classList.add('active')


}



(function() {
    let x = null;
    document.addEventListener('touchstart', e => x = e.touches[0].clientX);
    document.addEventListener('touchmove', e => {;
        if (!x) return;
        x = x - e.touches[0].clientX < 0 ? 0 : -90;
        //console.log('x_Swipe', x);
        if ('div.slick-track.animation-slick-track' in e) {

        }
        // test.style.transform = `translate(${x}%,0)`;
        x = null;
    });
})();


localStorage.setItem('find_data', '')
localStorage.setItem('last_find', 0)

function finders(text) {
    //console.log(text.value);
    localStorage.setItem('find_data', text.value)
    d_film = '';
    //console.log(Date.now() - localStorage.getItem('last_find'));
    if (Date.now() - localStorage.getItem('last_find') > 200) {
        localStorage.setItem('last_find', Date.now())
        $.ajax({
            type: "POST",
            url: '/FilmAPI/v2.1/get_in_text',

            data: {
                'text': text.value,
                'timeN': Date.now()
            },
            async: true,
            success: function(datas) {
                //console.log('return -- ', datas);
                document.getElementById('list_finded_block').innerHTML = ''
                for (key in datas['films']) {
                    if (datas['films'][key]['nameRu']) {
                        //console.log();
                        obj = `
                    <div class="shop-item" title='${datas['films'][key]['nameRu']}' style='height: 100%;'>
                        <a class="shop-item__image" href="/infofilm/${datas['films'][key]['filmId']}">
                        <img class="loaded" style='-webkit-mask:none; width:100%' src="${datas['films'][key]['posterUrl']}" alt="${datas['films'][key]['nameRu']}">
                        <div class="b-card__img-ratinglabels">
                            <div class="b-ratinglabel" style="cursor: pointer;">

                                <div class="b-ratinglabel__value">${datas['films'][key]['rating']}</div>
                                <div class="b-ratinglabel__title">IMDb</div>
                            </div>
                        </div>
                        </a>
                        <a class="shop-item__name" href="/infofilm/${datas['films'][key]['filmId']}">${datas['films'][key]['nameRu']}</a>
                        <div class="shop-item__price">
                            <div class="shop-item__price-current"></div>
                            <div class="shop-item__price-discount">${datas['films'][key]['year']}</div>
                        </div>
                        <span class="btn btn--primary js-addToCart" onclick='window.open("/infofilm/${datas['films'][key]['filmId']}"")' name='bqwe' id='open_window_film' film_id=${datas['films'][key]['filmId']} data-item-id="950">Перейти</span>
                    </div>`
                        document.getElementById('list_finded_block').innerHTML += obj
                    }
                }
                document.getElementById('count_rez').innerText = datas['searchFilmsCountResult']



            }
        });
    }
    // return data_film_now
    //console.log('d_film', d_film);


}

$(document).ready(function() {
    $(form).keydown(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});

var dq;
var changess = false

function set_size(q = 0) {
    changess = false
        //console.log('ass')
    dq = document.querySelector('#film-iframe').contentDocument;
    //console.log(dq.getElementById('bqs').offsetHeight);
    var url = window.location;
    if (url.pathname.indexOf('infofilm') > 0 || url.pathname.indexOf('datafilm') > 0) {
        document.getElementById('Starter_dev_s').style.height = dq.getElementById('bqs').offsetHeight + 'px';
    } else if (url.pathname.indexOf('film') > 0 || true) {
        document.getElementById('film_block_v').style.height = dq.getElementById('bqs').offsetHeight + 'px';
    }
}

$(window).resize(function() {
    if (changess == false) {
        //console.log('true')
        changess = true
        setTimeout(set_size, 3000, 0);
    }


});
setTimeout(set_size, 4000, 0);




$(document).ready(function() {
    function send_history() {
        // console.log('Отправляем историю');
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
                        "type": "watch_page_film",
                        "id_film": document.getElementById('botton_like').getAttribute('data-item-id'),
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
                },
                400: function(data) {
                    console.error(data['responseJSON']['errors'])
                    alert('войдите или зарегайтесь');
                },
                402: function(data) {
                    console.error(data['responseJSON']['errors'])
                    jwt_new_get()
                }
            }

        });
    }
    setTimeout(send_history, 20000);
});