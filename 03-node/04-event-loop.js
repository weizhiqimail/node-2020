/*
    Node 事件环 https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
    本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
   ┌───────────────────────────┐
┌─>│           timers          │    定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
│  └─────────────┬─────────────┘
|   执行延迟到下一个循环迭代的 I/O 回调。
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │    待定回调：执行延迟到下一个循环迭代的 I/O 回调。
│  └─────────────┬─────────────┘
|   仅系统内部使用。
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │    idle, prepare：仅系统内部使用。
│  └─────────────┬─────────────┘
|  检索新的I/O事件;执行与 I/O相关的回调   ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │ 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
│  └─────────────┬─────────────┘      │   data, etc.  │
│  setImmediate() 回调函数在这里执行。   └───────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │    检测：setImmediate() 回调函数在这里执行。
│  └─────────────┬─────────────┘
|  一些关闭的回调函数
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │    关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。
   └───────────────────────────┘
*/

// node 中的事件环和浏览器中的区别
// setTimeout 0 和 setImmediate 执行结果顺序不一样的原因是，node 程序开始执行时会耗费一些时
// 他们基于被调用的时机，会有不同的表现
// setTimeout 在最小阈值 ms 过后执行
// setImmediate 为一旦在当前轮询阶段，就执行
// 但是如果把这两个方法放入同一个 IO 循环内调用，那么 setImmediate 总是被优先调用
// 使用 setImmediate 的优势是在 IO 周期内被调度，那么它家境会在其中任何的定时器之前执行

setTimeout(() => {
    console.log('setTimeout');
    Promise.resolve().then(() => {
        console.log('promise then');
    });

    process.nextTick(() => {
        console.log('nextTick');
    });

}, 0);

setImmediate(() => {
    console.log('setImmediate');
});

// process.nextTick 不属于事件环，在本轮事件环结束后执行

/*
* 宏任务
* script ui setTimeout setInterval requestFrameAnimation setImmediate ajax
*
* 微任务
* Promise.then mutationObserver process.nextTick
*
* */

