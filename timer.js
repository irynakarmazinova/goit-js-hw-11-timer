// таймер отсчет вперед
const startBtn = document.querySelector("button[data-action-start]");
const stopBtn = document.querySelector("button[data-action-stop]");
const clockface = document.querySelector(".js-clockface");

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    // если мы запускаем таймер и он уже активный, то return из этого кода и больше ничего не выполняй
    // а если же он не активен, то мы делаем его активным, ставим буль(this.isActive = true) и запускаем setInterval
    if (this.isActive) {
      console.log("таймер запущен, кронка старт не активна");
      return;
    }

    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  // принимает время в милисекундах
  // высчитывает сколько в них вмещается часов/минут/секунд
  // возвращает объект со свойствами days, hours, mins, secs
  // формулы скопированы с стаоверфлоу
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  // метод pad(написал репета), приводит к строке и добавляет в начало 0, если число меньше 2-х знаков
  // если 1 -> то вернет 01; 7 -> 07; 12 -> 12
  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new Timer({ onTick: updateClockface });

startBtn.addEventListener("click", timer.start.bind(timer));
stopBtn.addEventListener("click", timer.stop.bind(timer));

// принимает время в милисекундах
// высчитывает сколько в них вмещается часов/минут/секунд
// рисует интерфейс
function updateClockface({ days, hours, mins, secs }) {
  clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
}
