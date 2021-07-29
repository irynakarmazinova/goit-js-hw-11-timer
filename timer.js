// таймер отсчет вперед
const startBtn = document.querySelector("button[data-action-start]");
const stopBtn = document.querySelector("button[data-action-stop]");
const clockface = document.getElementById("js-clockface");

const timer = {
  start() {
    const startTime = Date.now();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const { days, hours, mins, secs } = getTimeComponents(deltaTime);

      console.log(`${days}:${hours}:${mins}:${secs}`);
    }, 1000);
  },
};
timer.start();

// принимает врмея в милисекундах
// высчитывает сколько в них вмещается часов/минут/секунд
// рисует интерфейс
function updateClockface({ days, hours, mins, secs }) {
  clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
}

// метод pad(написал репета), приводит к строке и добавляет в начало 0, если число меньше 2-х знаков
// если 1 -> то вернет 01; 7 -> 07; 12 -> 12
function pad(value) {
  return String(value).padStart(2, "0");
}

// принимает время в милисекундах
// высчитывает сколько в них вмещается часов/минут/секунд
// возвращает объект со свойствами days, hours, mins, secs
// формулы скопированы с стаоверфлоу
function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}
