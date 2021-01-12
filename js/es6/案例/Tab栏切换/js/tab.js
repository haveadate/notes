var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector(".tabadd");
        // li的父元素
        this.ul = this.main.querySelector(".firstnav ul:first-child");
        // section的父元素
        this.fsection = this.main.querySelector(".tabscon");
        this.init();
    }

    // 获取所有的li和section（因为我们动态添加元素，需要重新获取对应的元素）
    updateNode() {
        this.lis = this.main.querySelectorAll("li");
        this.sections = this.main.querySelectorAll("section");
        this.remove = this.main.querySelectorAll(".icon-guanbi");
        this.spans = this.main.querySelectorAll(".firstnav li span:first-child");
    }

    // 初始化操作：让相关的元素绑定事件
    init() {
        this.updateNode();
        // 绑定tab栏点击事件
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
        // 绑定添加tab页面事件
        this.add.onclick = this.addTab;
    }

    // 清楚lis和sections的样式
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = "";
            this.sections[i].className = "";
        }
    }

    // 切换功能
    toggleTab() {
            that.clearClass();
            this.className = "liactive";
            that.sections[this.index].className = "conactive";
        }
        // 添加功能
    addTab() {
            that.clearClass();

            var li = '<li class="liactive"><span>测试' + (that.lis.length + 1) + '</span><span class="iconfont icon-guanbi"></span></li>';
            var section = '<section class="conactive">测试' + (that.lis.length + 1) + '</section>'
            that.ul.insertAdjacentHTML("beforeend", li);
            that.fsection.insertAdjacentHTML("beforeend", section);
            that.init();
        }
        // 删除功能
    removeTab(e) {
            e.stopPropagation(); // 阻止冒泡，防止触发li的切换点击事件
            var index = this.parentNode.index;
            that.lis[index].remove(); //remove()方法可以直接删除指定的元素
            that.sections[index].remove();
            that.init();
            // 当我们删除的不是选中状态时，原来的选中状态保持不变
            if (document.querySelector(".liactive")) return;
            // 当删除了选中状态的li时，让它的前一个li处于选定状态
            index--;
            // 手动调用点击事件(这个用法很特别，也很有用)
            that.lis[index] && that.lis[index].click();
        }
        // 修改功能
    editTab(e) {
        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // 双击禁止选定文字
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select(); // 让文本框中的文字处于选中状态
        // 当我们离开文本框就把文本框里面的值给span
        input.onblur = function() {
                this.parentNode.innerHTML = this.value;
            }
            // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                this.blur(); //手动调用表单失去焦点事件
            }
        }
    }
}

var tab = new Tab("#tab");
// tab.init();