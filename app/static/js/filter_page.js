var data_page = 2
var tr = true
var badata = ''
var endB =
    $(window).scroll(function() {
        sliders = document.getElementsByName('Sliders_3')[0]
            //// console.log(sliders);
        block_width = sliders.offsetHeight;
        endB = (block_width) - ($(window).height()) - 700
            // console.log('sa', $(window).scrollTop(), endB, tr);
        if ($(window).scrollTop() > endB && tr == true) {
            // block_width = sliders.offsetHeight;
            tr = false

            //Пользователь долистал до низа страницы
            filter = document.getElementById('film_').getAttribute('name')
                // console.log('\n\n\nqwe\n\n\n' + data_page, tr);
                // console.log('data_page', data_page);
            url = '/filters?ProductFilter=' + filter + '&page=' + data_page
            $.ajax({
                url: url,
                method: 'post',
                dataType: 'json',
                async: true,
                data: {
                    'text': 's',
                    'timeN': Date.now()
                },
                success: function(data) {
                    // console.log('return -- ', data);
                    badata = data
                    qwe = ''
                    for (el of data['films']) {
                        //<div class="shop-item" title="${el['nameRu']}" style="height: auto;">
                        var div = document.createElement("div");
                        div.className = 'shop-item'
                        div.title = el['nameRu']
                        div.style = "height: auto"
                        if (el['rating'].indexOf("%") >= 0) {
                            div.innerHTML += `
                                <a class="shop-item__image" href="/infofilm/${el['filmId']}">
                                    <img class="loaded" style="-webkit-mask:none; width:100%; max-height: 370px;" src="${el['posterUrl']}" alt="${el['nameRu']}">
                                    <div class="b-card__img-ratinglabels">
                                        <div class="b-ratinglabel" style="cursor: pointer;">

                                            <div class="b-ratinglabel__value">${el['rating']}</div>
                                            <div class="b-ratinglabel__title">Ожидают</div>
                                        </div>
                                    </div>

                                </a>
                                <a class="shop-item__name Name_texts" href="/infofilm/${el['filmId']}">${el['nameRu']}</a>
                                <div class="shop-item__price">
                                    <div class="shop-item__price-discount">${el['year']}</div>
                                </div>
                                <span class="btn btn--primary js-addToCart" onclick="window.open(&quot;/infofilm/${el['filmId']})" name="bqwe" id="open_window_film" film_id="${el['filmId']}" data-item-id="${el['filmId']}">Перейти</span>
                        `
                        } else {
                            div.innerHTML += `
                                <a class="shop-item__image" href="/infofilm/${el['filmId']}">
                                    <img class="loaded" style="-webkit-mask:none; width:100%; max-height: 370px;" src="${el['posterUrl']}" alt="${el['nameRu']}">
                                    <div class="b-card__img-ratinglabels">
                                        <div class="b-ratinglabel" style="cursor: pointer;">

                                            <div class="b-ratinglabel__value">${el['rating']}</div>
                                            <div class="b-ratinglabel__title">rating</div>
                                        </div>
                                    </div>

                                </a>
                                <a class="shop-item__name Name_texts" href="/infofilm/${el['filmId']}">${el['nameRu']}</a>
                                <div class="shop-item__price">
                                    <div class="shop-item__price-discount">${el['year']}</div>
                                </div>
                                <span class="btn btn--primary js-addToCart" onclick="window.open(&quot;/infofilm/${el['filmId']})" name="bqwe" id="open_window_film" film_id="${el['filmId']}" data-item-id="${el['filmId']}">Перейти</span>
                            `
                        }

                        document.getElementsByName('Sliders_3')[0].appendChild(div);

                    }
                    tr = true
                    data_page += 1
                }

            });


        }
    });