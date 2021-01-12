// 在定义函数或者类时，如果遇到类型不明确就可以使用泛型
// 泛型指代字母是任意的，并没有明确规定是 T
function print1<T>(data: T): void {
	console.log(data);
}

print1('hello, typescript'); // 不指定泛型，TS 可以自动对类型进行判断
print1<number>(123); // 显示指定泛型，不容易出错

// 指定多个泛型
function print2<T, K>(data1: T, data2: K) {
	console.log(data1, data2);
}

print2<string, number>('张三', 22);

// 对泛型进行限制
interface IIntroduce {
	introduce(): void;
}

// T extends IToString 表示泛型 T （数据 data）必须实现 IToString 接口
function print3<T extends IIntroduce>(data: T): void {
	console.log(data);
	data.introduce();
}

class Person implements IIntroduce {
	private name: string;
	private age: number;
	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	introduce(): void {
		console.log(`你好，我叫${this.name}，今年${this.age}岁。`);
	}
}

const lisi = new Person('李四', 20);
print3<Person>(lisi);

// 在类中同样也可以使用泛型
class MyClass<T> {
	info: T;
	constructor(info: T) {
		this.info = info;
	}
	getType(): void {
		console.log(typeof this.info);
	}
}

const mc = new MyClass<string>('张三');
mc.getType();
