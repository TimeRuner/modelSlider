const slides = Array.from(document.querySelectorAll('.sliderContainer_item'));
const dots = document.querySelector('.sliderContainer_dotsContainer');
const dotsArea = Array.from(document.querySelectorAll('.sliderContainer_element'));
let slideIdex = 1;


dots.addEventListener('click', dotsSelect);
dots.addEventListener('scroll', scrollEvent);
function showSlides(n){

    correctSlideLength(n);
    removeStyles();
    addCurrentStyles(slideIndex-1);

}
function currentSlide (n){
    showSlides(slideIndex = n);
}
function correctSlideLength(number){
    return slideIndex = number < 1 ? slides.length : number > slides.length ? 1 : number;
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
    if(dots.matches('dotsActiveFirst')){ dots.classList.remove('dotsActiveFirst');}
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
        if(target.classList.contains('sliderContainer_element')&&target==dotsArea[i-1]){
            currentSlide(i);
        }
    }
}

