// таймер обратного отсчета

const mainDivRef = document.querySelector(".timer");

class CountdownTimer {
  constructor() {}

  start() {}

  stop() {}

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

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("August 08, 2021"),
});

// selector - селектор плагина
// targetDate - конечная дата, до которого будет распродажа

// отсчет до распродажи
// когда будет вызываться таймер, класс ваш, то вы будете передавать время до которого будет распродажа, а потом будет от туда считать вниз
// будет конечное время и текущее и надо будет выбрать разницу между конечным и текущим

function updateClockface({ days, hours, mins, secs }) {
  mainDivRef.textContent = `${days}:${hours}:${mins}:${secs}`;
}
