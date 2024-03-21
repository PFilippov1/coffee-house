/* eslint-disable indent */
/* eslint-disable quotes */
'use strict';

// import { hamburger, hamburgerCloseConditions, windowResizeHandler } from './burger.js';


window.onload = function () {
  //cross hamburger
  hamburger();
  hamburgerCloseConditions();
  //close burger (depends window width)
  windowResizeHandler();

};

// //hamburger button behavior
// const hamburger = () => {
//   const hamburgerElement = document.querySelector('.hamburger');
//   const burgerElement = document.querySelector('.burger-menu__wrapper');
//   hamburgerElement.addEventListener('click', function () {
//     hamburgerElement.classList.toggle('active');
//     burgerElement.classList.toggle('active');
//   });
//   return hamburgerElement;
// };

// const hamburgerCloseConditions = () => {
//   const hamburgerElement = document.querySelector('.hamburger');
//   const burgerElement = document.querySelector('.burger-menu__wrapper');

//   burgerElement.addEventListener('click', () => {
//     hamburgerElement.classList.remove('active');
//     burgerElement.classList.remove('active');
//   });

// };

// const windowResizeHandler=() => window.addEventListener('resize', function () {
//   const windowWidth = window.innerWidth;
//   const hamburgerElement = document.querySelector('.hamburger');
//   const burgerElement = document.querySelector('.burger-menu__wrapper');
//   // Если ширина окна больше, чем предыдущая ширина
//   if (windowWidth > 768) {
//     hamburgerElement.classList.remove('active');
//     burgerElement.classList.remove('active');
//   }
//  });
// change buttons
const sliderLine = document.querySelector('.row-slider');
const prevButton = document.querySelector('.left-button');
const nextButton = document.querySelector('.right-button');
const dots = document.querySelectorAll('.dot');
const coffeeSlides = document.querySelectorAll('.coffee-slide');
const progressBar = document.querySelector('.progress-bar');

let position = 0;
let dotIndex = 0;
const slideWidth = 1152;
const totalSlides = document.querySelectorAll('.slide').length;
const intervalDuration = 5000;
let intervalId; // Interval ID для автосмены
let progressIntervalId; // Interval ID для обновления интервала
let isPaused = false; // флаг паузы, пока толком как надо не работает((
let touchStartX;
let touchEndX;

const updateSlide = () => {
  sliderLine.style.transition = `transform 0.3s ease-in-out`;
  sliderLine.style.transform = `translateX(-${position}px)`;
};

const updateDot = () => {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === dotIndex);
  });
};

const updateProgressBar = () => {
  const activeProgressBar = document.querySelector('.dot.active .progress-bar');
  activeProgressBar.style.width = '0rem'; 

  setTimeout(() => {
    activeProgressBar.style.transition = 'width 5s ease-in-out';
    activeProgressBar.style.width = '4rem';

    setTimeout(() => {
      activeProgressBar.style.transition = 'none'; 
    }, 5000);
  }, 10); 
};

const nextSlide = () => {
  position += slideWidth;
  dotIndex++;
  if (dotIndex === totalSlides) {
    position = 0;
    dotIndex = 0;
  }
  updateProgressBar(); // Обновление прогресс-бара перед обновлением слайда
  updateSlide();
  updateDot();
};

const prevSlide = () => {
  dotIndex--;
  if (dotIndex < 0) {
    position = slideWidth * (totalSlides - 1);
    dotIndex = totalSlides - 1;
  } else {
    position -= slideWidth;
  }
  updateProgressBar(); // Обновление прогресс-бара перед обновлением слайда
  updateSlide();
  updateDot();
};

const startSlider = () => {
  if (!isPaused) {
    intervalId = setInterval(() => {
      nextSlide();
    }, intervalDuration);
    progressIntervalId = setInterval(() => {
      updateProgressBar();
    }, intervalDuration);
  }
};

const stopSlider = () => {
  clearInterval(intervalId);
  clearInterval(progressIntervalId);
};

// Вызываем карусель
startSlider();

// Add a handleSwipe() function to handle swipes
const handleSwipe = () => {
  const swipeThreshold = 100;

  if (touchStartX - touchEndX > swipeThreshold) {
    nextSlide();
    stopSlider();
    isPaused = false;
  } else if (touchEndX - touchStartX > swipeThreshold) {
    prevSlide();
    stopSlider();
    isPaused = false;
  }
};


// Add a listener for swipe events
sliderLine.addEventListener('touchend', handleSwipe);

// ручная прокрутка
nextButton.addEventListener('click', () => {
  nextSlide();
});

prevButton.addEventListener('click', () => {
  prevSlide();
});

// ручная прокрутка для мобилок
sliderLine.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

sliderLine.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();

  // Если свайп не был сделан, возобновляем автоматическую прокрутку слайдов
  if (!isPaused) {
    startSlider();
  }
});

// добавим листенеров 
coffeeSlides.forEach((coffeeSlide) => {
  coffeeSlide.addEventListener('mouseenter', () => {
    isPaused = true;
    stopSlider();
  });

  coffeeSlide.addEventListener('mouseleave', () => {
    isPaused = false;
    startSlider();
  });

  coffeeSlide.addEventListener('touchstart', () => {
    isPaused = true;
    stopSlider();
  });

  coffeeSlide.addEventListener('touchend', () => {
    isPaused = false;
    startSlider();
  });
});






