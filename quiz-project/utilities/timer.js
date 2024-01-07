const variables = {
    oneSecond: 1000,
    oneMinute: 60,
    minuteIndex: 0,
    secondIndex: 1,
    timeSubtractor: 0,
    minuteHolder: 0,
    secondHolder: 0,
    endOfTime: 0,
    shortLength: 1,
    minuteHolderStringifier: "",
    secondHolderStringifier: "",
    appender: ""
}

const { oneSecond, oneMinute, minuteIndex, secondIndex, timeSubtractor, minuteHolder, secondHolder, endOfTime, shortLength, minuteHolderStringifier, secondHolderStringifier, appender } = variables;

const timer = document.querySelector(".timer");
const timerTextSplitter = timer.textContent.split(":");
let minuteSeparator = Number(timerTextSplitter[minuteIndex]) * oneMinute * oneSecond;
let secondSeparator = Number(timerTextSplitter[secondIndex]) * oneSecond;
let timeAggregator = minuteSeparator + secondSeparator;

const intervalId = setInterval(() => {
    timeSubtractor = timeAggregator - oneSecond;

    if (timeSubtractor < endOfTime) {
        clearInterval(intervalId);
        throw new Error("your time is up");
    };

    minuteHolder = Math.floor(timeSubtractor / (oneMinute * oneSecond));
    secondHolder = Math.floor((timeSubtractor - (minuteHolder * oneSecond * oneMinute)) / oneSecond);

    timeAggregator = timeSubtractor;

    minuteHolderStringifier = String(minuteHolder);
    secondHolderStringifier = String(secondHolder);

    if (minuteHolderStringifier.length === shortLength) minuteHolderStringifier = "0" + minuteHolderStringifier;
    if (secondHolderStringifier.length === shortLength) secondHolderStringifier = "0" + secondHolderStringifier;

    timerTextSplitter[minuteIndex] = minuteHolderStringifier;
    timerTextSplitter[secondIndex] = secondHolderStringifier;

    appender = timerTextSplitter.join(":");
    timer.textContent = appender;
}, 1000)
