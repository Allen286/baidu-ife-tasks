/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

//跨浏览器事件绑定
function addEventHandler(ele, event, hanlder) {
  if (ele.addEventListener) {
    ele.addEventListener(event, hanlder, false);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + event, hanlder);
  } else {
    ele["on" + event] = hanlder;
  }
}

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

var formGraTime = document.getElementById('form-gra-time');
var citySelect = document.getElementById('city-select');
var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];

/**
 * 渲染图表
 */
function renderChart() {
  var text = '',
    color = '';
  for (var item in chartData) {
    color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    text += '<div style="background-color:' + color + ';height:' + chartData[item] + 'px"></div>';
  }
  aqiChartWrap.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if (pageState.nowGraTime === this.value) {
    return;
  } else {
    pageState.nowGraTime = this.value;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  // if (pageState.nowSelectCity === this.value) {return;} 
  // change事件只有在select选项变化时才触发，选择相同选项不会触发，所以上面的判断省略
  pageState.nowSelectCity = this.value;

  // 设置对应数据
  initAqiChartData;
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  addEventHandler(formGraTime, 'click', function(e) {
    if (e.target.type === 'radio') {
      graTimeChange.call(e.target);
    }
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityList = '';
  for (var city in aqiSourceData) {
    cityList += '<option>' + city + '</option>';
    citySelect.innerHTML = cityList;
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEventHandler(citySelect, 'change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var nowCityData = aqiSourceData[pageState.nowSelectCity];
  // 处理好的数据存到 chartData 中
  if (pageState.nowGraTime == 'day') {
    chartData = nowCityData;
  }
  
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm(); //给日月年三个单选按钮添加事件侦听器
  initCitySelector(); //dom添加城市列表，并给下拉框里每个选项添加时间侦听器
  initAqiChartData(); //根据城市及时间间隔的不同来初始化成不同数据
  renderChart(); //渲染初始数据对应的图表
}

init();