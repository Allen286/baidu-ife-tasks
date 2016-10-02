/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

function $(id) {
    return document.getElementById(id);
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = $('aqi-city-input').value.trim();
    var aqi = parseInt($('aqi-value-input').value.trim());
    if (city !== '' && !isNaN(aqi)) {
        aqiData[city] = aqi;
    } else {
        alert('输入有误，城市名不能为空，空气质量值必须正整数，请重新输入');
    }
}

/**
 * 渲染aqi-table表格
 */
// 频繁dom方法
/*function renderAqiList() {
    var table = $('aqi-table');
    table.innerHTML = '';
    for (var c in aqiData) {
        if (table.children.length === 0) {
            table.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
        }
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerHTML = c;
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        td2.innerHTML = aqiData[c];
        tr.appendChild(td2);
        var td3 = document.createElement('td');
        td3.innerHTML = '<button class="del-btn">删除</button>';
        tr.appendChild(td3);
        table.appendChild(tr);
    }

}*/

// 字符串一次添加
function renderAqiList() {
    var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (var city in aqiData) {
        items += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button data-city='" + city + "'>删除</button></td></tr>"
    }
    document.getElementById("aqi-table").innerHTML = city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $('add-btn').onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    $('aqi-table').addEventListener('click', function(e) {
        if (e.target.nodeName.toLowerCase() === 'button') {
            delBtnHandle(e.target.dataset.city);
        }
    });
}

init();