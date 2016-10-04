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
//队列对象，单例模式
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
            tempstr += '<span data-index="' + index + '" style="height:' + element + 'px;"></span>';
        });
        wrap.innerHTML = tempstr;
        addDivDelEvent();
    },
    deleteIndex: function(index) {
        this.str.splice(index, 1);
        this.display();
    }

}

//这算闭包吗？函数作为参数传入另一个函数，也是闭包的一种形式吧？跟函数作为返回值返回类似
function pushNum(func) {
    var inputNum = parseInt(btnList[0].value);
    if (isNaN(inputNum) || inputNum > 200 || inputNum < 1) {
        alert('请输入1-200之间的整数');
    } else {
        func.call(queue, inputNum);
        //由于作用域链的关系，传入的func函数中的变量可以访问到外部函数pushNum内的各变量
        //func函数需要num形参，给该形参赋值了外部函数pushNum中的inputNUm变量值
        //内部函数引用了外部函数变量，于是形成闭包，外部函数不会被销毁    
    }
}

//为四个按钮绑定事件侦听函数
addEvent(btnList[1], 'click', function() {
    pushNum(queue.leftPush);
});
addEvent(btnList[2], 'click', function() {
    pushNum(queue.rightPush);
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

//方法二：利用闭包保存index
function addDivDelEvent() {
    for (var i = 0; i < wrap.children.length; i++) {
        //这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的cur值(length);
        addEvent(wrap.children[i], "click", function(cur) {
            return function() {
                return queue.deleteIndex(cur);
            };
        }(i));
    }
}


/*------------------------------task19部分的代码见下------------------------------*/
//随机数来初始化队列
function initQueue() {
    for (var i = 0; i < 30; i++) {
        queue.str[i] = Math.floor((Math.random() * 200)+1);
    }
    queue.display();
}

//交换函数。大错特错！！！
/*function swap(a, b) {
    var temp = a;
    a = b;
    b = temp;
}
var a = 2;
var b = 3;
swap(a, b);
console.log('a=', a); //a=2
console.log('b=', b); //b=3*/
// 完全没影响a和b的值。基本类型值参数按值传递，交换的只是函数内局部变量a和b的值。
// 函数swap执行完后，内部变量a和b即被销毁。外部作用域的a和b根本不会变化

//冒泡排序
function bubbleSort(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                queue.display();
            }
        }
        // console.log(arr[len - i - 1]);
    }
}

// 如何使冒泡排序有动画效果？定时器？
// 下面这种写法不太好，即循环时间是由定时器interval的间隔控制的，run函数每执行一次i++或j++
// 执行够相应次数后才会触发clearInterval清除定时器，所以执行时间固定，会出现“假完成状态”

function animateBubble1(arr) {
    clearInterval(timer);
    var i = 0,
        j = 1,
        temp = 0,
        len = arr.length;
    var timer = setInterval(run,10);
    // 版本1：第一个与后面每一个比较，哪个更小就把它的值换给第一个，最后效果是最小的先冒到前面
    function run() {
        if (i < len) {
            if (j < len) {
                if (arr[i] > arr[j]) {
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    queue.display();
                }
                j++;
            } else {
                i++;
                j = i + 1;
            }
        }else{
            clearInterval(timer);
            return;
        }
    }
}

function animateBubble2(arr) {
    clearInterval(timer);
    var i = 0,
        j = 1,
        temp = 0,
        len = arr.length;
    var timer = setInterval(run,10);
    // 版本2：相邻两两比较，较大值给后者，最后效果是最大的先冒到后面
    function run() {
        if (i < len) {
            if (j < len-i) {
                if (arr[j-1] > arr[j]) {
                    temp = arr[j-1];
                    arr[j-1] = arr[j];
                    arr[j] = temp;
                    queue.display();
                }
                j++;
            } else {
                i++;
                j=1;
            }
        }else{
            clearInterval(timer);
            return;
        }
    }
}

addEvent(btnList[5], 'click', function() {
    initQueue();
});
/*
// 无动画版本，最快速度排完序，然后再一次性渲染成图表
addEvent(btnList[6], 'click', function() {
    bubbleSort(queue.str);
    queue.display();
});
*/
addEvent(btnList[6],'click',function(){
    animateBubble1(queue.str);
});
addEvent(btnList[7],'click',function(){
    animateBubble2(queue.str);
});

/*有bug,排序动画执行中点击初始化或者其他排序方法会出现错乱？还有“假完成状态”
js函数执行是单线程的
动画处理函数按照时间间隔被添加到执行队列中
而点击初始化时，初始化函数也被添加到执行队列，但是不管前面动画有没全部执行，只要空闲就会立即添加
比如在20ms间隔中队列是空闲的，初始化函数立即加入队列，相当于插队，然后函数按队列顺序执行
比如在点击其他排序时同理，几种不同排序函数会同时(交替)添加到队列中，同时(交替)作用与被排序的数组
由于同时工作，排序加快，但该写法循环结束条件是由时间间隔控制的，还是需要时间间隔执行完
即此时处于“假完成状态”，进行其他操作如初始化可以看到，排序函数仍在被不断添加到执行队列中，因为interval还没完成*/

//不知道怎么改进，后续再说吧。。