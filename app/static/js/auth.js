function send_form(el) {
    console.log(el);
    console.log(el.id);
    d = document.getElementById(el.id).getElementsByTagName('input')
    console.log(d);
    if (el.id == 'form_sended_1') {
        console.log('auth');

        $.ajax({
            type: "POST",
            url: '/accountAPI/auth',

            data: {
                'login': d[0].value,
                'password': d[1].value
            },
            async: true,
            success: function(data) {
                console.log(data);
                if (data['status'] == true) {
                    console.log('Входите');
                    document.getElementById(el.id + '_text').style.display = 'None'
                } else {
                    document.getElementById(el.id + '_text').style.display = 'block'
                }
            }
        });



    } else if (el.id == 'form_sended_2') {
        console.log('reg');
        $.ajax({
            type: "POST",
            url: '/accountAPI/create',

            data: {
                'login': d[0].value,
                'password': d[2].value,
                'email': d[1].value
            },
            async: true,
            success: function(data) {
                console.log(data);
                if (data['status'] == true) {
                    console.log('Успешно');
                    document.getElementById('form_sended_1').getElementsByTagName('input')[0].value = d[0].value
                    document.getElementById('form_sended_1').getElementsByTagName('input')[1].value = d[2].value

                    document.getElementsByClassName('main_div_auth')[0].style = 'transform: translateX(0%);'
                    document.getElementById('form_sended_1_con').style.display = 'block'
                    document.getElementById(el.id + '_text').style.display = 'none'
                } else {
                    document.getElementById(el.id + '_text').style.display = 'block'
                }
            }
        });



    } else if (el.id == 'form_sended_3') {
        console.log('reg');



    }
}

function trans(el) {
    console.log(el);
    document.getElementById('form_sended_1_text').style.display = 'none';
    if (el == 'reg_key') {
        document.getElementsByClassName('main_div_auth')[0].style = 'transform: translateX(-33.3%);'
    } else {
        document.getElementsByClassName('main_div_auth')[0].style = 'transform: translateX(0%);'
    }

}