function send_form(el) {
    d = document.getElementById(el.id).getElementsByTagName('input')
    if (el.id == 'form_sended_1') {
        // console.log('auth');
        $.ajax({
            type: "POST",
            url: '/api/v0.1/login',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "data": {
                    "login": document.getElementById('lg_1').value,
                    "password": document.getElementById('lg_2').value
                }
            }),
            async: true,

            success: function(data) {
                // console.log(data);
                localStorage.setItem('accessToken', data['accessToken'])
            },
            statusCode: {
                405: function(data) {
                    document.getElementsByClassName('alert')[0].innerHTML = `
                    <span class="closebtn" onclick="cl()">×</span>
                    <strong>Ошибочка!</strong> ${data.responseJSON['errors']}.
                    `
                    document.getElementsByClassName('alert')[0].style.opacity = "1";
                    console.log(data.responseJSON);

                },
                400: function(data) {
                    document.getElementsByClassName('alert')[0].innerHTML = `
                    <span class="closebtn" onclick="cl()">×</span>
                    <strong>Ошибочка!</strong> ${data.responseJSON['errors']}.
                    `
                    document.getElementsByClassName('alert')[0].style.opacity = "1";
                    console.log(data.responseJSON);

                }
            }

        });



    } else if (el.id == 'form_sended_2') {
        // console.log('reg');
        $.ajax({
            type: "POST",
            url: '/api/v0.1/register',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "data": {
                    "login": d[0].value,
                    "password": d[1].value,
                    "email": d[2].value,
                },
                "data_now": Date().toLocaleString("en-US")
            }),
            async: true,

            success: function(data) {
                console.log(data);
                document.getElementsByClassName('main_div_auth')[0].style = 'transform: translateX(-66.6%);'
                localStorage.setItem('lg', data['lg'])

            },
            statusCode: {
                405: function(data) {
                    document.getElementsByClassName('alert')[0].innerHTML = `
                    <span class="closebtn" onclick="cl()">×</span>
                    <strong>Ошибочка!</strong> ${data.responseJSON['errors']}.
                    `
                    document.getElementsByClassName('alert')[0].style.opacity = "1";
                    console.log(data.responseJSON);

                },
                400: function(data) {
                    document.getElementsByClassName('alert')[0].innerHTML = `
                    <span class="closebtn" onclick="cl()">×</span>
                    <strong>Ошибочка!</strong> ${data.responseJSON['errors']}.
                    `
                    document.getElementsByClassName('alert')[0].style.opacity = "1";
                    console.log(data.responseJSON);

                }
            }

        });



    } else if (el.id == 'form_sended_3') {
        // console.log('code');
        var codes = document.getElementById('num1').value +
            document.getElementById('num2').value +
            document.getElementById('num3').value
        console.log(codes);
        $.ajax({
            type: "POST",
            url: '/api/v0.1/verificate',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "data": {
                    "login": localStorage.getItem('lg'),
                    "code": codes
                }
            }),
            async: true,

            success: function(data) {
                console.log(data);
                document.getElementsByClassName('main_div_auth')[0].style = 'transform: translateX(0%);'
                localStorage.removeItem('lg')
                document.getElementsByClassName('alert')[0].innerHTML = `
                    <span class="closebtn" onclick="cl()">×</span>
                    <strong>Верный код!</strong> ${data.responseJSON['errors']}.
                    `
                document.getElementsByClassName('alert')[0].style.opacity = "1";

            },
            statusCode: {
                405: function(data) {
                    document.getElementsByClassName('alert')[0].innerHTML = `
                    <span class="closebtn" onclick="cl()">×</span>
                    <strong>Ошибочка!</strong> ${data.responseJSON['errors']}.
                    `
                    document.getElementsByClassName('alert')[0].style.opacity = "1";
                    console.log(data.responseJSON);

                },
                400: function(data) {
                    document.getElementsByClassName('alert')[0].innerHTML = `
                    <span class="closebtn" onclick="cl()">×</span>
                    <strong>Ошибочка!</strong> ${data.responseJSON['errors']}.
                    `
                    document.getElementsByClassName('alert')[0].style.opacity = "1";
                    console.log(data.responseJSON);

                }
            }

        });
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