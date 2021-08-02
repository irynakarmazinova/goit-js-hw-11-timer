// таймер обратного отсчета (отсчет до распродажи)

const refs = {
  // mainDivRef: document.querySelector(".timer"),
  mainDivRef: document.getElementById("timer-1"),
  daysRef: document.querySelector('[data-value="days"]'),
  hoursRef: document.querySelector('[data-value="hours"]'),
  minsRef: document.querySelector('[data-value="mins"]'),
  secsRef: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ deadline, onTick }) {
    //зачем здесь деструктуризация
    this.deadline = deadline;
    this.onTick = onTick; //что такое онтик, пересмотреть репету?
  }

  init() {
    const time = this.getTimeComponents(0); //зачем инит, пересмотреть репету?
    this.onTick(time);
  }

  start() {
    setInterval(() => {
      const deltaTime = this.deadline - new Date(); // Mon Aug 02 2021 22:14:43
      // const deltaTime = this.deadline - Date.now(); // 1627931668237
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1", //зачем это нужно?
  deadline: new Date("August 08, 2021"),
  onTick: updateClockface,
});

// window.addEventListener("click", timer.start.bind(timer)); //байнд не нужен?
// document.addEventListener("DOMContentLoaded", timer.start(timer)); //как правильно?
window.addEventListener("load", timer.start(timer));

function updateClockface({ days, hours, mins, secs }) {
  refs.daysRef.textContent = `${days}`;
  refs.hoursRef.textContent = `${hours}`;
  refs.minsRef.textContent = `${mins}`;
  refs.secsRef.textContent = `${secs}`;
}

// -----------------------------------------------------------------------
// selector - селектор плагина

// когда будет вызываться таймер, класс ваш, то вы будете передавать время до которого будет распродажа, а потом будет от туда считать вниз
// будет конечное время и текущее и надо будет выбрать разницу между конечным и текущим
// -----------------------------------------------------------------------
// new Date ()
// 1) 2 авг 21:03:36
// 2) 2 авг 21:03:37
// 1 сек

// Date.now()
// 1) 12345678980
// 2) 1234567891
// 1 сек
// -----------------------------------------------------------------
// по вебинару 02.08.2021

// let startDate = null;
// let result = null;
// let seconds = null;
// let minutes = null;

// function start() {
//   startDate = new Date();
//   setInterval(timer, 1000);
// }
// window.addEventListener("load", start);

// function timer() {
//   result = Math.floor((new Date() - startDate) / 1000);

//   seconds = result % 60;
//   minutes = Math.floor(result / 60);

//   refs.secsRef.textContent = seconds < 10 ? `0${seconds}` : seconds;
//   refs.minsRef.textContent = minutes < 10 ? `0${minutes}` : minutes;
// }
