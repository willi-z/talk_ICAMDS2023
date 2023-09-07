import { injectAll } from "./modular.js";
import { getCookie, setCookie } from "./cookie.js";

function changeCurrentSlideNo(newSlideNumber){
    currentSlideNo = newSlideNumber
    setCookie("currentSlideNo", currentSlideNo);
}

injectAll();


let slidesParentDiv = document.querySelector('.slides');
let slides = document.querySelectorAll('.slide');


var currentSlideNo = 1;
if (getCookie("currentSlideNo")!=""){
    currentSlideNo = Number(getCookie("currentSlideNo"))
}
setCookie("currentSlideNo", currentSlideNo);
var totalSlides = 0;

let currentSlide = null;

function updateCurrentSlide() {
    currentSlide = slides[currentSlideNo];
}

updateCurrentSlide();
currentSlide.classList.add('show');


// let currentSlide = document.querySelector('.slide.show');

var slideCounter = document.querySelector('.counter');
var leftBtn = document.querySelector('#left-btn');
var rightBtn = document.querySelector('#right-btn');

let presentation = document.querySelector('#presentation');
var fullScreenBtn = document.querySelector('#full-screen');
var smallScreenBtn = document.querySelector('#small-screen');


leftBtn.addEventListener('click', moveToLeftSlide);
rightBtn.addEventListener('click', moveToRightSlide);
fullScreenBtn.addEventListener('click', fullScreenMode);
smallScreenBtn.addEventListener('click', smallScreenMode);

function moveToLeftSlide() {
    if (currentSlideNo == 0){
        return;
    }
    var tempSlide = currentSlide;
    currentSlide = currentSlide.previousElementSibling;
    tempSlide.classList.remove('show');
    currentSlide.classList.add('show');
    changeCurrentSlideNo(currentSlideNo-1);
    update();
}
  
function moveToRightSlide() {
    if (currentSlideNo == totalSlides-1){
        return;
    }
    var tempSlide = currentSlide;
    currentSlide = currentSlide.nextElementSibling;
    tempSlide.classList.remove('show');
    currentSlide.classList.add('show');
    changeCurrentSlideNo(currentSlideNo+1);
    update();
}
  
function fullScreenMode() {
    presentation.classList.add('full-screen');
    fullScreenBtn.classList.remove('show');
    smallScreenBtn.classList.add('show');
}
  
function smallScreenMode() {
    presentation.classList.remove('full-screen');
    fullScreenBtn.classList.add('show');
    smallScreenBtn.classList.remove('show');
}
  


function hideLeftButton() {
    if(currentSlideNo == 0) {
        leftBtn.classList.remove('show');
    } else {
        leftBtn.classList.add('show');
    }
}
  
function hideRightButton() {
    if(currentSlideNo == totalSlides-1) {
        rightBtn.classList.remove('show');
    } else {
        rightBtn.classList.add('show');
    }
}
  

  
function updateSlideNo() {
    slideCounter.innerText = `${currentSlideNo+1} of ${totalSlides}`
}

  
function update() {
    totalSlides = slides.length;
    updateCurrentSlide();
    updateSlideNo();
    hideLeftButton();
    hideRightButton();
}


document.addEventListener('keydown', function(event){
    switch (event.key) {
        case "ArrowLeft":
            moveToLeftSlide();
            break;
        case "ArrowRight":
            moveToRightSlide();
            break;
        case "ArrowUp":
            // Up pressed
            break;
        case "ArrowDown":
            // Down pressed
            break;
    }
})

update();