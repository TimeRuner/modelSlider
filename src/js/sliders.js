const slides = document.querySelectorAll('.sliderContainer_item');
const dots = document.querySelector('.sliderContainer_dotsContainer');
const dotsArea = document.querySelectorAll('.sliderContainer_element');
const firstSlide = document.querySelector('.firstSlide_main');
const buttons = document.querySelector('.firstSlide_container');
const bgArr = [
    'img/first/firstPageBg.png',
    'img/fifth/lastSlideBg.png',
    'img/fifth/lastBg.png'
]
const sliderContainer = document.querySelector('.sliderContainer');
const header = document.querySelector('.header');

let slideIndex = 0;
let imgBgIndex = 0;
let wheelBottom = 0;
let wheelTop = 0;


if (sliderContainer.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+
      sliderContainer.addEventListener("wheel", wheelingSlider);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      sliderContainer.addEventListener("mousewheel", wheelingSlider);
    } else {
      // Firefox < 17
      sliderContainer.addEventListener("MozMousePixelScroll", wheelingSlider);
    }
  } else { // IE8-
    sliderContainer.attachEvent("onmousewheel", wheelingSlider);
  }


buttons.addEventListener('click', clikedSlideBtn);
dots.addEventListener('click', dotsSelect);
dots.addEventListener('scroll', scrollEvent);
// setTimeout(wheelingSlider, 5000);            
function showSlides(n){
    correctSlideLength(n);
    removeStyles();
    addCurrentStyles(slideIndex);
}
function currentSlide (n){
    showSlides(slideIndex = n);
}
function wheelSlide(n){
    showSlides(slideIndex+=n);
}

function correctSlideLength(number){
    const lastSlide = slides.length-1;
    return slideIndex = number < 0 ? 0 : number > lastSlide ? lastSlide : number;
}

function addCurrentStyles(slideIndex){
    switch(slideIndex){
        case 0:
            slides[slideIndex].classList.add('tranformTop');
            dotsArea[slideIndex].classList.add('dotsActiveWhite');
            dots.classList.add('dotsActiveFirst');
            break;
        case 4:
            slides[slideIndex].classList.add('tranformTop');
            dotsArea[slideIndex].classList.add('dotsActiveWhite');
            break;
        default:
            slides[slideIndex].classList.add('tranformTop');
            dotsArea[slideIndex].classList.add('dotsActiveBlack');
            break;

    }
}
function removeStyles(){
    if(dots.matches('.dotsActiveFirst')){ dots.classList.remove('dotsActiveFirst');}
    for(let i=0; i<slides.length; i++){
        slides[i].classList.remove('tranformTop');
    }
    for(let i=0;i<dotsArea.length;i++){
        if(i===0||i===4){dotsArea[i].classList.remove('dotsActiveWhite');}
        else{dotsArea[i].classList.remove('dotsActiveBlack');}
    }

}
function dotsSelect({target}){
    for(let i = 0; i < dotsArea.length+1; i++){
        if(target.classList.contains('sliderContainer_element')&&target==dotsArea[i]){
            currentSlide(i);
        }
    }
}
function checkBgArrLength(index){
    const lastElement = bgArr.length-1;
    return imgBgIndex = index < 0 ? lastElement : index > lastElement ? 0 : index;
}
function changeBg(indexImg){
    firstSlide.style.backgroundImage = 'url(' + bgArr[indexImg] + ')';
    switch(indexImg){
        case 0:
            firstSlide.style.backgroundPositionY = '-60px';
            break;
        case 1:
            firstSlide.style.backgroundPositionY = '-270px';  
            break;
        default:
            firstSlide.style.backgroundPositionY = '0';
            break;
    }
}
function clikedSlideBtn({target}){
    if(target.classList.contains('firstSlide_container_left')||target.classList.contains('leftImg')){
        imgBgIndex--;
    } else if (target.classList.contains('firstSlide_container_right')||target.classList.contains('rightImg')){
        imgBgIndex++;
    }
    checkBgArrLength(imgBgIndex);
    changeBg(imgBgIndex);
}

function wheelingSlider(e){
    if(e.deltaY<0){
        wheelBottom = 0;
        wheelTop += e.deltaY;
        header.classList.remove('displayNone');
        firstSlide.classList.remove('smolerHeight');
        if(wheelTop<-200){
            if(slideIndex<5){e.preventDefault();}
            toTop(wheelTop);
        }
        
    }else {
        wheelTop = 0;
        wheelBottom += e.deltaY;
        if(wheelBottom>200){
            header.classList.add('displayNone');
            firstSlide.classList.add('smolerHeight');
        }
        if(wheelBottom<3500){
            if(slideIndex<5){e.preventDefault();}
            toBottom(wheelBottom);
        }
    }
}
function toBottom(toBottom){
    if(toBottom%500===0){
        wheelSlide(1);
    }
}
function toTop(toTop){
    if(toTop%500===0){
        wheelSlide(-1);
    }
}


