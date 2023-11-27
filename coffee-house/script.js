const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-list__wrapper');
const navLinks = document.querySelectorAll('.menu__link');


// burger menu

burger.addEventListener('click', function () {
    this.classList.toggle('active');
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      nav.classList.add('open');
    }
  });

function closeMenu() {
    nav.classList.remove('open');
    burger.classList.remove('active');
    nav.classList.add('close');
  
    setTimeout(() => {
      nav.classList.remove('close');
    }, 300);
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-list__wrapper').classList.remove('open');
    document.querySelector('.burger').classList.remove('active');
    nav.classList.add('close');

    setTimeout(() => {
      nav.classList.remove('close');
    }, 300);
  });
});


// carusel
const btnPrev = document.querySelector('.left-arrow');
const btnNext = document.querySelector('.right-arrow');
const slider = document.querySelector('.slider-track__width');
const sliderItems = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-container');
const slidesToScroll = 1;
const slidesToShow = 1;
const itemsCount = items.length;
let position = 0;
const totalItems = document.querySelectorAll('.slider-container').length;
const slideWidth = 100 / totalItems;
sliderItems.style.width = `${totalItems * 100}%`;
items.forEach(item => {
    item.style.width = `${slideWidth}%`;
});


const moveToNextSlide = () => {
  position -= slidesToScroll;
  if (position < -(itemsCount - slidesToShow)) {
      position = 0;
  }
  setPosition();
};

const moveToPrevSlide = () => {
  position += slidesToScroll;
  if (position > 0) {
      position = -(itemsCount - slidesToShow);
  }
  setPosition();
};

const setPosition = () => {
    sliderItems.style.transform = `translateX(${position * slideWidth}%)`;
    updateRadioButtons(position);
    window.clearInterval(mainInterval);
    mainInterval = window.setInterval(moveToNextSlide, 5100);
};

btnNext.addEventListener('click', moveToNextSlide);
btnPrev.addEventListener('click', moveToPrevSlide);



const radioButtons = document.querySelectorAll('.favourite-pagination input[type="radio"]');

const updateRadioButtons = (index) => {
  radioButtons[Math.abs(index)].checked = true;
  radioButtons.forEach((rb) => {
    rb.disabled = rb.checked;
  });
};

let mainInterval = setInterval(function(){moveToNextSlide();}, 5100);
window.onload = mainInterval;

