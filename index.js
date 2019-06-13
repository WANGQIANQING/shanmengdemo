let flag = 'gaoji'; //定义一个全局变量，用来保存当前是高级还是定制
let left = document.getElementsByClassName("left")[0];
let right = document.getElementsByClassName("right")[0];
let liList = document.getElementsByTagName('li');
left.addEventListener('touchstart', function () {
    flag = 'gaoji';
    right.style.color = 'black';
    right.style.backgroundColor = '#f5f5f5';
    right.style.border = '1px solid #e9e9e9';
    left.style.color = 'rgba(233, 10, 0, 0.69)';
    left.style.backgroundColor = 'rgba(255, 79, 0, 0.04)';
    left.style.border = '1px solid rgba(249, 0, 3, 0.42)';
    for (let li of liList) {
        if (li.className === 'gaoji') {
            li.style.opacity = '1';
        } else {
            li.style.opacity = '0.4';
        }
    }
});
right.addEventListener('touchstart', function () {
    flag = 'dingzhi';
    left.style.color = 'black';
    left.style.backgroundColor = '#f5f5f5';
    left.style.border = '1px solid #e9e9e9';
    right.style.color = 'rgba(233, 10, 0, 0.69)';
    right.style.backgroundColor = 'rgba(255, 79, 0, 0.04)';
    right.style.border = '1px solid rgba(249, 0, 3, 0.42)';
    for (let li of liList) {
        li.style.opacity = '1';
    }
});

let close = document.getElementById('close');
close.addEventListener('touchstart', function () {
    toggleDialog(false);
});

let divUl = document.querySelector('.body .itemList');
divUl.addEventListener('touchstart', function (event) {
    let node = event.target;
    if (node.className === 'iconfont') {
        let xmlhttp;
        if (window.XMLHttpRequest) {
            // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp = new XMLHttpRequest();
        }
        else {
            // IE6, IE5 浏览器执行代码
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        switch (flag) {
            case 'gaoji':
                if (node.id === 'title1' || node.id === 'title3' || node.id === 'title4'
                    || node.id === 'title8' || node.id === 'title10')
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            document.getElementById('alertHeader').innerHTML = JSON.parse(xmlhttp.responseText)[flag][node.id].head;
                            document.getElementById('alertContent').innerHTML = JSON.parse(xmlhttp.responseText)[flag][node.id].body;
                            toggleDialog(true);
                        }
                    };
                xmlhttp.open("GET", "./static/data.json", true);
                xmlhttp.send();
                break;
                break;
            case 'dingzhi':
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        document.getElementById('alertHeader').innerHTML = JSON.parse(xmlhttp.responseText)[flag][node.id].head;
                        document.getElementById('alertContent').innerHTML = JSON.parse(xmlhttp.responseText)[flag][node.id].body;
                        toggleDialog(true);
                    }
                };
                xmlhttp.open("GET", "./static/data.json", true);
                xmlhttp.send();
                break;
        }
    }
});

function toggleDialog(show) {
    let animationClass = show ? "slipUp" : "slipBottom";
    let animation = function () {
        document.getElementById('alertHeader').style.display = 'block';
        document.getElementById('alertContent').style.display = 'block';
        document.getElementById('close').style.display = 'block';

        let ele = document.getElementById("dialog-face");
        ele.className = "dialog-face " + animationClass;
        ele = document.getElementById("dialog");
        ele.className = "dialog-root " + animationClass;
        ele = document.getElementById("dialog-wrapper");
        ele.className = "dialog-wrapper " + animationClass;
    };

    setTimeout(animation, 100);
}
