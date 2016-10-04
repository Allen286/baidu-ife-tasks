var wrap = document.getElementById('wrap');
var btnList = document.getElementsByTagName('input');
var textInput = document.getElementById('text-input');
var textArr = [];

function getInput() {
    textArr = textInput.value.trim().split(/[\s,.;，。；、]+/);
    //str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/)
    //上面那个正则是其他同学的写法，好像更全面一些
    //\w 或 \W 只会匹配基本的 ASCII 字符，要匹配其他语言中（如汉字）的字符需要使用 \uhhhh
    //\uhhhh，"hhhh" 表示以十六进制表示的字符的Unicode值，\u4e00-\u9fa5 代表中文汉字范围
    textArr = textArr.filter(function(e) {
        return e.length !== 0;
    });
    render();
}

function searchItem() {
    var searchInput = btnList[1].value.trim();
    render(searchInput);
}

function render(str) {;
    wrap.innerHTML = textArr.map(function(element) {
        if (str != null && str.length > 0) {
            element = element.replace(new RegExp(str, "g"), '<span>' + str + '</span>');
        }
        return '<div>' + element + '</div>';
    }).join('');
}

btnList[0].onclick = getInput;
btnList[2].onclick = searchItem;

// 改进：
// 1. 匹配时忽略大小写该怎么改？正则'gi'不行，会不管大小写一律替换成输入的字符。怎样不改变匹配位置的值？
// 2. 这3个练习都是每次一有一丁点数据修改，就全部重新渲染dom。
// 虽然这样很方便，不用考虑dom细节，但有没有更省资源的写法，能否每次只改动局部？