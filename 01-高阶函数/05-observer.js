// 观察者模式

// 观察者和被观察者
// 观察者需要放到被观察者中，被观察者的状态发生了变化，需要通知观察者。
// 内部基于发布订阅模式

// 被观察者，小宝宝
class Subject {
  constructor(name) {
    this.name = name;
    this.state = '开心';
    this.observers = [];
  }

  // 订阅
  attach(observer) {
    this.observers.push(observer);
  }

  // 更新状态
  setState(newState) {
    this.state = newState;
    console.log(`${this.name} 的 state 状态发生了变化`);
    this.observers.forEach(fn => fn.update(this));
  }
}

// 观察者，妈妈
class Observer {
  constructor(name) {
    this.name = name;
  }

  update(subject) {
    console.log(`${this.name} 被通知了，${subject.name} ${subject.state}`);
  }

}

let baby = new Subject('小宝宝');
let mother = new Observer('妈妈');
let father = new Observer('爸爸');

baby.attach(mother);
baby.attach(father);

baby.setState('饿了');





