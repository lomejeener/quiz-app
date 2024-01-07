import { domElements } from "./dom-elements.js";

const { questionText, answerText, answerTextContainer, spinnerLoader, spinnerText, spinnerContainer, progressBarMover, questionTimerMover, nextButton, resetButton, startButton, timer, progressBar, correctAnswerElement, incorrectAnswerElement, unansweredQuestionElement, scoreElement, welcomeBox, guideContainer } = domElements;

//for loading spinner
export function spinnerLoaderFunc(containerDisplay, justifyContent, loaderDisplay, textDisplay) {
    spinnerContainer.style.display = containerDisplay;
    spinnerContainer.style.justifyContent = justifyContent;
    spinnerLoader.style.display = loaderDisplay;
    spinnerText.style.display = textDisplay;
}
//--------------------------------------

//for making choices visible
export function choicesDisplayVisibleFunc() {
    answerTextContainer.classList.add("choices-container-flex");
    answerTextContainer.classList.add("choices-container-responsive");
    answerTextContainer.classList.remove("choices-container-invisible");
}
//----------------------------------------

//visibility or invisibility of progress bar
export function progressBarDisplay(displayStyle) {
    progressBarMover.style.display = displayStyle;
}
//-----------------------------------------

//timer
export function timerDisplay(displayStyle) {
    timer.style.display = displayStyle;
}