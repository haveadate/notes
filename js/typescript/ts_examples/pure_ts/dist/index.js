// 在定义函数或者类时，如果遇到类型不明确就可以使用泛型
// 泛型指代字母是任意的，并没有明确规定是 T
function print1(data) {
    console.log(data);
}
print1('hello, typescript'); // 不指定泛型，TS 可以自动对类型进行判断
print1(123); // 显示指定泛型，不容易出错
// 指定多个泛型
function print2(data1, data2) {
    console.log(data1, data2);
}
print2('张三', 22);
// T extends IToString 表示泛型 T （数据 data）必须实现 IToString 接口
function print3(data) {
    console.log(data);
    data.introduce();
}
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    introduce() {
        console.log(`你好，我叫${this.name}，今年${this.age}岁。`);
    }
}
const lisi = new Person('李四', 20);
print3(lisi);
// 在类中同样也可以使用泛型
class MyClass {
    constructor(info) {
        this.info = info;
    }
    getType() {
        console.log(typeof this.info);
    }
}
const mc = new MyClass('张三');
mc.getType();
