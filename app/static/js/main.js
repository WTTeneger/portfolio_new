function goTohtml(b) {
    console.log('das', b)
}

$(document).ready(function() {
    //Обработка нажатия на кнопку "Вверх"
    $("#menu").on("click", 'a', function(event) {
        //Необходимо прокрутить в начало страницы
        event.preventDefault();
        //console.log(event)
        var id = $(this).attr('href');
        if (id != '#color') {
            var poz = $(id).offset().top;
            if (id != '#m') {
                poz += 0
            }
            //console.log('ppos ', poz)
            $("body,html").animate({ "scrollTop": poz }, 500);
        }
    });

    //Обработка нажатия на кнопку "Вниз"
});
let openblock = 0;

function BRe() {
    blockColor = document.getElementById('TransformColor')
    col = document.getElementById('MainBody').style.color;


    if (col == 'rgb(0, 0, 0)') {
        blockColor.style = "animation: TransformColorAnimR .8s";;
        document.getElementById('FaR').style = 'transform: rotate(0deg);'
        document.getElementById('FaR').classList.add('fa-moon-o');
        document.getElementById('FaR').classList.remove('fa-sun-o');
        document.getElementById('MainBody').style = 'color: #fff; background-color: #000;';
    } else if (col == 'rgb(255, 255, 255)') {
        blockColor.style = "animation: TransformColorAnimL .8s";
        //console.log('22');
        document.getElementById('FaR').style = 'transform: rotate(360deg);'
        document.getElementById('FaR').classList.add('fa-sun-o');
        document.getElementById('FaR').classList.remove('fa-moon-o');
        document.getElementById('MainBody').style = 'color: #000; background-color: #fff;';
    }

}


$(document).ready(function() {
    //Обработка нажатия на кнопку "Вверх"
    $("#Workss").on("click", 'a', function(event) {
        event.preventDefault();
        var html = $(this)[0].href;
        window.open(html, '_blank');

    });
    $("#Workss").on("click", 'div', function(event) {
        //Необходимо прокрутить в начало страницы
        event.preventDefault();
        var id = $(this).attr('id');
        openblock = id;
        //console.log("sd  ", id);

        DM = id.slice(4);

        vb = document.getElementsByClassName('bobr')
        lengVB = (vb.length)
        for (const item of vb) {
            if (item.id != id) {
                //console.log(item);
                item.style = 'opacity: 0;'
            }
        }
        StartersPointsd = 938
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            busters = 55
            StartersPointsd += 300
        } else {
            busters = 20
        }
        //console.log(busters)
        //console.log(lengVB)
        //console.log(DM)

        br = (((parseInt(DM) * 52) * -1) + (busters))
            // br = ((parseInt(DM) + busters) * -7)
            //console.log('ass', br)

        document.getElementById(id).style = 'transform: scale(1.2) translate3d(0px, ' + br + 'px, -80px); position: relative; z-index: 11;'
            //document.getElementById(id).getElementsByClassName('workBlock')[0].style.height="300px";
        document.getElementById(id).getElementsByTagName('h1')[0].style = 'display: block;'
        try {
            document.getElementById(id).getElementsByTagName('a')[0].style = 'display: block;'
        } catch {}
        $("body,html").animate({ "scrollTop": StartersPointsd }, 500);
        document.getElementById(id).getElementsByClassName('workBlock')[0].classList.add('heightMaxPhoto');
        document.getElementById(id).getElementsByClassName('workBlock')[0].getElementsByTagName('div')[0].getElementsByTagName('cite')[0].style = 'opacity: 1';
        // document.getElementById(id).getElementsByClassName('workBlock')[0].getElementsByTagName('div')[0].getElementsByTagName('cite')[1].style = 'opacity: 1';
        document.getElementById('ExitBlock').style = 'display:block';
    });
});

function bars(event) {
    //console.log(event);
    var id = $(event).attr('id');
    vb = document.getElementsByClassName('bobr')
    for (const item of vb) {
        item.style = 'opacity: 1;'
    }
    document.getElementById(id).style = 'display: none';
    d = document.getElementById(openblock).getElementsByClassName('workBlock')
    d[0].classList.remove('heightMaxPhoto');
    d[0].getElementsByTagName('div')[0].getElementsByTagName('cite')[0].style = '';
    // d[0].getElementsByTagName('div')[0].getElementsByTagName('cite')[1].style = '';
    document.getElementById(openblock).getElementsByTagName('h1')[0].style = 'display: none;'
    try {
        document.getElementById(openblock).getElementsByTagName('a')[0].style = 'display: none;'
    } catch {}
    document.getElementById(openblock).style = 'transform: scale(1) translate3d(0px, 64px, -80px);';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let obj = document.getElementById('textLegBlock');
textHi = ['Привет', 'Hi', 'Hola', 'Ave', 'salut', 'Hallo', 'Cześć', 'Ola'];
lastM = 0;

function GetWord() {
    if (lastM >= textHi.length - 1) {
        lastM = -1;
    }
    lastM += 1;
    word = textHi[lastM];

    return word;
}

async function DelText() {
    await sleep(2000);
    while (true) {
        await sleep(3000);
        text = obj.textContent || obj.innerText;
        textnew = text
        for (const item of text) {
            textnew = textnew.slice(0, -1)
            obj.innerText = textnew;
            await sleep(200);
        }
        await sleep(200);
        var NewsTexts = GetWord();
        rb = ''
        for (const buka of NewsTexts) {
            rb += buka;
            obj.innerText = rb;
            await sleep(200);
        }
    }
};
DelText();
// await sleep(2000);
//DelText();