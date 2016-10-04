//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}

var wrap = document.getElementById('wrap');
var btnList = document.getElementsByTagName('input');

var queue = {
    str: [],

    leftPush: function(num) {
        this.str.unshift(num);
        this.display();
    },
    rightPush: function(num) {
        this.str.push(num);
        this.display();
    },
    isEmpty: function() {
        return (this.str.length === 0);
    },
    leftPop: function() {
        if (!this.isEmpty()) {
            this.str.shift();
            this.display();
        } else {
            alert('The queue is already empty!');
        }
    },
    rightPop: function() {
        if (!this.isEmpty()) {
            this.str.pop();
            this.display();
        } else {
            alert('The queue is already empty!');
        }
    },
    display: function() {
        var tempstr = '';
        this.str.forEach(function(element, index) {
            tempstr += '<span data-index="' + index + '">' + element + '</span>';
        });
        wrap.innerHTML = tempstr;
        addDivDelEvent();
    },
    deleteIndex: function(index) {
        this.str.splice(index, 1);
        this.display();
    }

}

// 为四个按钮绑定事件侦听函数
addEvent(btnList[1], 'click', function() {
    var input = btnList[0].value;
    if ((/^[0-9]+$/).test(input)) {
        queue.leftPush(parseInt(input));
    } else {
        alert('Please enter an interger!');
    }
});
addEvent(btnList[2], 'click', function() {
    var input = btnList[0].value;
    if ((/^[0-9]+$/).test(input)) {
        queue.rightPush(parseInt(input));
    } else {
        alert('Please enter an interger!');
    }
});
addEvent(btnList[3], 'click', function() {
    queue.leftPop();
});
addEvent(btnList[4], 'click', function() {
    queue.rightPop();
});

//为wrap中的每个div绑定删除函数
//方法一：利用html5的dataset属性。但兼容性太差，ie11及以上才支持
/*addEvent(wrap,'click',function(e){
    if (e.target.nodeName==='SPAN') {
        queue.deleteIndex(e.target.dataset.index);
    }
});*/

//利用闭包！！！第一次用闭包。。。
function addDivDelEvent(){
    for (var i = 0; i < wrap.children.length; i++) {
        //这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的cur值(length);
        addEvent(wrap.children[i], "click", function(cur) {
            return function() {
                return queue.deleteIndex(cur);
            };
        }(i));
    }
}
