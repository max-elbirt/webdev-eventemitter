"use strict";
class EventEmitter {
    constructor() {
        this.subscriptions = {};
    }
    subscribe(event, callBackFunction) {
        this.subscriptions[event] = this.subscriptions[event] || [];
        this.subscriptions[event].push(callBackFunction);
        return ({
            unsubscribeCallBack: () => { this.unsubscribe(event, callBackFunction); }
        });
    }
    unsubscribe(event, callBackFunction) {
        //iterating over the callback list to find the correct index
        let index;
        const cbList = this.subscriptions[event];
        for (let i = 0; i < cbList.length; i++) {
            if (cbList[i] === callBackFunction) {
                index = i;
                break;
            }
        }
        //if no index was found return this
        if (index === undefined) {
            return this;
        }
        //if index found splice out the callBackFunction
        this.subscriptions[event].splice(index, 1);
    }
    emit(event, data) {
        this.subscriptions[event].forEach((cbFunction) => {
            cbFunction(data);
        });
    }
}
// section for testing the code below, just un-comment ----------------------------------------------->
//
// const myEmitter = new EventEmitter();
// const cb1 = (data) => { console.log('you', data) };
// const event1 = myEmitter.subscribe('keyDown', cb1);
// console.log(myEmitter.subscriptions);
// // event1.unsubscribeCallBack();
// console.log(myEmitter.subscriptions);
// myEmitter.emit('keyDown', 'hello')
