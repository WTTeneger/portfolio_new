// var cod = 'ArrowUpArrowUpArrowDownKeyAKeyAKeyB'
var cod = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA'
    // var cod = 'ArrowUpArrowUpArrowDown'
var cod_now = ''

function del_code() {

    cod_now = ''
        // //console.log('Удалил', cod_now);
}

document.addEventListener('keydown', function(event) {
    //console.log(event.code);

    cod_now += event.code
        // //console.log(cod_now, '\n\n', cod);
    if (cod.indexOf(cod_now) >= 0) {
        if (cod_now == '') setTimeout(del_code, 8000);
        if (cod_now == cod) {
            //console.log('Ебац победа');
            // document.location.href = '/cona'
            for (en of document.getElementsByTagName('li')) {
                en.style = 'background-image: url(https://avatars.mds.yandex.net/get-zen_doc/1900274/pub_5cf640a2af7e3300afdfee1e_5cf81c3f253cb300aec633e8/scale_1200); background-color:#5c5c5c; background-size: cover;'
            }
            for (en of document.getElementsByTagName('img')) {
                en.src = 'https://avatars.mds.yandex.net/get-zen_doc/1900274/pub_5cf640a2af7e3300afdfee1e_5cf81c3f253cb300aec633e8/scale_1200'
            }
            document.getElementsByClassName('dancing-baby window')[0].style = 'background-image: url(https://avatars.mds.yandex.net/get-zen_doc/1900274/pub_5cf640a2af7e3300afdfee1e_5cf81c3f253cb300aec633e8/scale_1200);'
            document.getElementsByClassName('MainBody')[0].style = 'background-image: url(https://avatars.mds.yandex.net/get-zen_doc/1900274/pub_5cf640a2af7e3300afdfee1e_5cf81c3f253cb300aec633e8/scale_1200);'
                // document.getElementsByClassName('dancing-baby window')[0].style = 'display:none;'

        }
    } else {
        // //console.log('не верно');
        cod_now = ''
    }
});