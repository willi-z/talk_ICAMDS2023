import { injectAll } from "./modular.js";

injectAll();


let slidesParentDiv = document.querySelector('.slides');
let slides = document.querySelectorAll('.slide');
let currentSlide = document.querySelector('.slide.show');

var slideCounter = document.querySelector('.counter');
var leftBtn = document.querySelector('#left-btn');
var rightBtn = document.querySelector('#right-btn');

let presentation = document.querySelector('#presentation');
var fullScreenBtn = document.querySelector('#full-screen');
var smallScreenBtn = document.querySelector('#small-screen');


var screenStatus = 0;
var currentSlideNo = 1
var totalSlides = 0;

leftBtn.addEventListener('click', moveToLeftSlide);
rightBtn.addEventListener('click', moveToRightSlide);
fullScreenBtn.addEventListener('click', fullScreenMode);
smallScreenBtn.addEventListener('click', smallScreenMode);

function moveToLeftSlide() {
    if (currentSlideNo === 1){
        return;
    }
    var tempSlide = currentSlide;
    currentSlide = currentSlide.previousElementSibling;
    tempSlide.classList.remove('show');
    currentSlide.classList.add('show');
    update();
}
  
function moveToRightSlide() {
    if (currentSlideNo === totalSlides){
        return;
    }
    var tempSlide = currentSlide;
    currentSlide = currentSlide.nextElementSibling;
    tempSlide.classList.remove('show');
    currentSlide.classList.add('show');
    update();
}
  
function fullScreenMode() {
    presentation.classList.add('full-screen');
    fullScreenBtn.classList.remove('show');
    smallScreenBtn.classList.add('show');
    screenStatus = 1;
}
  
function smallScreenMode() {
    presentation.classList.remove('full-screen');
    fullScreenBtn.classList.add('show');
    smallScreenBtn.classList.remove('show');
    screenStatus = 0;
}
  


function hideLeftButton() {
    if(currentSlideNo == 1) {
        leftBtn.classList.remove('show');
    } else {
        leftBtn.classList.add('show');
    }
}
  
function hideRightButton() {
    if(currentSlideNo === totalSlides) {
        rightBtn.classList.remove('show');
    } else {
        rightBtn.classList.add('show');
    }
}
  
function getCurrentSlideNo() {
    let counter = 0;
    slides.forEach((slide, i) => {
    counter++
    if(slide.classList.contains('show')){
      currentSlideNo = counter;
    }
  });
}
  
function setSlideNo() {
    slideCounter.innerText = `${currentSlideNo} of ${totalSlides}`
}

  
function update() {
    totalSlides = slides.length;
    getCurrentSlideNo();
    setSlideNo();
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