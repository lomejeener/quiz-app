//Modules
import { quizData } from "./utilities/quiz-questions.js";
import { domElements } from "./utilities/dom-elements.js";
import { spinnerLoaderFunc, choicesDisplayVisibleFunc } from "./utilities/functions.js";

//Variables
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
    appender: "",
    questionCounter: 0,
    initialObjectKeyAccessorIndex: 0,
    initialObjectValueAccessorIndex: 0,
    choicesArrayValueAccessorIndex: 0,
    correctAnswerCounter: 0,
    incorrectAnswerCounter: 0,
    questionCounterGap: 2,
    idealQuestionCounterLength: 32,
    answerAccessorIndex: 1,
    answerEvaluator: null,
    questionsLength: quizData.length - 1,
    nextButtonBlocker: false,
    clockChecker: false,
    resultSpinnerDuration: 2000,
    startSpinnerDuration: 2000,
    questionSpinnerDuration: 1000,
    intervalTimeSubtractionDuration: 1000
}

//Destructured Variables
const { questionText, answerText, answerTextContainer, spinnerLoader, spinnerText, spinnerContainer, progressBarMover, progressBarText, questionTimerMover, nextButton, resetButton, startButton, timer, progressBar, correctAnswerElement, incorrectAnswerElement, unansweredQuestionElement, scoreElement, welcomeBox, guideContainer } = domElements;
let { oneSecond, oneMinute, minuteIndex, intervalTimeSubtractionDuration, secondIndex, clockChecker, resultSpinnerDuration, startSpinnerDuration, questionSpinnerDuration, timeSubtractor, minuteHolder, secondHolder, endOfTime, shortLength, minuteHolderStringifier, secondHolderStringifier, appender, questionCounter, initialObjectKeyAccessorIndex, initialObjectValueAccessorIndex, choicesArrayValueAccessorIndex, correctAnswerCounter, incorrectAnswerCounter, questionCounterGap, idealQuestionCounterLength, answerAccessorIndex, answerEvaluator, questionsLength, nextButtonBlocker } = variables;

let scoreElementsArray = [correctAnswerElement, incorrectAnswerElement, unansweredQuestionElement, scoreElement];
let choiceAndQuestionArray = [questionText, answerTextContainer];
let timerTextSplitter = timer.textContent.split(":");

let minuteSeparator = Number(timerTextSplitter[minuteIndex]) * oneMinute * oneSecond;
let secondSeparator = Number(timerTextSplitter[secondIndex]) * oneSecond;
let timeAggregator = minuteSeparator + secondSeparator;
let questionTextReset = Object.keys(quizData[questionCounter])[initialObjectKeyAccessorIndex];
let choicesTextReset = Object.values(Object.values(quizData[questionCounter])[initialObjectValueAccessorIndex])[choicesArrayValueAccessorIndex];
let correctAnswerHolder = Object.values(Object.values(quizData[questionCounter])[initialObjectValueAccessorIndex])[answerAccessorIndex];

//Functions
function scoreGenerator() {
    correctAnswerElement.textContent = `Correct Answers: ${correctAnswerCounter}`;
    incorrectAnswerElement.textContent = `Incorrect Answers: ${incorrectAnswerCounter}`;
    unansweredQuestionElement.textContent = `Unanswered Questions: ${quizData.length - (correctAnswerCounter + incorrectAnswerCounter)}`;
    scoreElement.textContent = `Score: ${Math.round(correctAnswerCounter / quizData.length * 100)}%`;
}

//Next Button Section
nextButton.addEventListener("click", function () {
    if (minuteHolder === 0 && secondHolder === 0) nextButtonBlocker = false;

    if (nextButtonBlocker) {
        clockChecker = false;

        spinnerLoaderFunc("flex", "center", "block", "block");
        this.style.display = "none";
        progressBarMover.style.display = "none";
        timer.style.display = "none";
        questionText.style.display = "none";
        questionTimerMover.style.height = "0";

        answerTextContainer.classList.remove("choices-container-flex");
        answerTextContainer.classList.remove("choices-container-responsive");
        answerTextContainer.classList.add("choices-container-invisible");

        //Progress Bar Process
        if (questionCounter < questionsLength + questionCounterGap && timeSubtractor >= endOfTime) {
            progressBar.style.width = `${((questionCounter) / quizData.length) * 100}%`;
            progressBarText.textContent = `${Math.round(((questionCounter) / quizData.length) * 100)}%`;
        }

        //Correct & incorrect Answer Counter
        if (answerEvaluator && questionCounter < questionsLength + questionCounterGap && timeSubtractor >= endOfTime) {
            correctAnswerCounter++;
            answerEvaluator = null;
        }

        if (answerEvaluator === false && questionCounter < questionsLength + questionCounterGap && timeSubtractor >= endOfTime) {
            incorrectAnswerCounter++;
            answerEvaluator = null;
        }

        //End of The Questions Error 
        if (questionCounter > questionsLength) {
            if (questionCounter < idealQuestionCounterLength) questionCounter += questionCounterGap;

            spinnerLoaderFunc("flex", "center", "block", "block");
            for (let choiceAndQuestionDisplay of choiceAndQuestionArray) choiceAndQuestionDisplay.style.display = "none";
            this.style.display = "none";
            progressBarMover.style.display = "none";
            timer.style.display = "none";

            //End of The Questions Result Displayer
            setTimeout(() => {
                scoreGenerator();
                spinnerLoaderFunc("none", "none", "none", "none");
                for (let scoreElementsDisplay of scoreElementsArray) scoreElementsDisplay.style.display = "block";
                resetButton.style.display = "block";
            }, resultSpinnerDuration)
            throw new Error("enough question");
        }

        setTimeout(() => {
            clockChecker = true;

            choicesDisplayVisibleFunc();
            spinnerLoaderFunc("none", "none", "none", "none");
            this.style.display = "block";
            progressBarMover.style.display = "flex";
            timer.style.display = "block";
            questionText.style.display = "block";
            questionTimerMover.style.height = "18vh"

            if (questionsLength === questionCounter) this.textContent = "End";

            let questionTextModifier = Object.keys(quizData[questionCounter])[initialObjectKeyAccessorIndex];
            let choicesTextModifier = Object.values(Object.values(quizData[questionCounter])[initialObjectValueAccessorIndex])[choicesArrayValueAccessorIndex];

            if (nextButtonBlocker) {
                questionText.textContent = questionTextModifier;
                answerText.forEach((choices, choicesIndex) => choices.textContent = choicesTextModifier[choicesIndex]);
            };
            correctAnswerHolder = Object.values(Object.values(quizData[questionCounter])[initialObjectValueAccessorIndex])[answerAccessorIndex];
            questionCounter += 1;
        }, questionSpinnerDuration)
    }
})

//Answer Selection Section
answerTextContainer.addEventListener("click", event => {
    let revisedCorrectAnswerHolder = correctAnswerHolder.toLowerCase().trim();
    let revisedTargetAnswer = event.target.textContent.toLowerCase().trim();

    //Answer Correctness Evaluation
    answerText.forEach(val => {
        if (revisedTargetAnswer === revisedCorrectAnswerHolder && event.target === val) answerEvaluator = true;
        else if (revisedTargetAnswer !== revisedCorrectAnswerHolder && event.target === val) answerEvaluator = false;
    });
})

//Reset Button Section
resetButton.addEventListener("click", () => {
    if (timeSubtractor < endOfTime || questionCounter > questionsLength + questionCounterGap) location.reload();
})

//Start Button Section
startButton.addEventListener("click", function () {
    nextButtonBlocker = true;
    clockChecker = false;

    spinnerLoaderFunc("flex", "center", "block", "block");
    welcomeBox.style.display = "none";
    guideContainer.style.display = "none";
    this.style.display = "none";

    setTimeout(() => {
        clockChecker = true;

        choicesDisplayVisibleFunc();
        spinnerLoaderFunc("none", "none", "none", "none");
        nextButton.style.display = "block";
        progressBarMover.style.display = "flex";
        timer.style.display = "block";
        questionTimerMover.style.height = "18vh";

        questionText.textContent = questionTextReset;
        answerText.forEach((choices, choicesIndex) => choices.textContent = choicesTextReset[choicesIndex]);
        questionCounter += 1;
    }, startSpinnerDuration);

    //Countdown Timer
    setTimeout(() => {
        const intervalId = setInterval(() => {

            timeSubtractor = timeAggregator - oneSecond;

            //End of Time Error
            if (timeSubtractor < endOfTime) {
                clearInterval(intervalId);
                nextButtonBlocker = false;

                spinnerLoaderFunc("flex", "center", "block", "block");
                for (let choiceAndQuestionDisplay of choiceAndQuestionArray) choiceAndQuestionDisplay.style.display = "none";
                nextButton.style.display = "none";
                progressBarMover.style.display = "none";
                timer.style.display = "none";
                questionTimerMover.style.height = "0"

                //End of Time Result Displayer
                setTimeout(() => {
                    scoreGenerator();
                    spinnerLoaderFunc("none", "none", "none", "none");
                    for (let scoreElementsDisplay of scoreElementsArray) scoreElementsDisplay.style.display = "block";
                    resetButton.style.display = "block";
                }, resultSpinnerDuration);

                throw new Error("your time is up");
            };

            if (questionCounter < questionsLength + questionCounterGap && clockChecker) {
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
            }
        }, intervalTimeSubtractionDuration)
    }, startSpinnerDuration);
}, { once: true });
