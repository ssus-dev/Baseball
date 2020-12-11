import React, { useState } from 'react';
import Start from './Start';
import Play from './Play';


let Game = () => {
    const [viewName, changeView] = useState("Start");
    let view; //화면 변수

    let randomNum = new Array(); //난수

    // 첫번째자리 -> 1 ~ 9 까지 뽑기  두·세번째자리 -> 0 ~ 9 까지 뽑기 
    let getRandomNums = (num = 3, isOverlap = false) => {
        if (randomNum.length == num) { return randomNum;}
        randomNum.push(Math.floor(Math.random() * 10));
        if(isOverlap) randomNum = randomNum.filter((item,index) => randomNum.indexOf(item) === index); 


        return getRandomNums(num, isOverlap);
    };

    switch (viewName) {
        case "Start": view = <Start changeView={changeView}/>; break;
        case "Play": view = <Play changeView={changeView} getNum={getRandomNums()}/>; break;
    }

    return (
        <>{view}</>
    );
}

export default Game;
