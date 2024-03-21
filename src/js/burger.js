/* eslint-disable quotes */
/* eslint-disable indent */
'use strict';



window.onload = function () {
    //cross hamburger
    hamburger();
    hamburgerCloseConditions();
    //close burger (depends window width)
    windowResizeHandler();
  
  };

//hamburger button behavior

const hamburger = () => {
    const hamburgerElement = document.querySelector('.hamburger');
    const burgerElement = document.querySelector('.burger-menu__wrapper');
    hamburgerElement.addEventListener('click', function () {
        hamburgerElement.classList.toggle('active');
        burgerElement.classList.toggle('active');
        //scroll condition 
        if (!hamburgerElement.classList.contains('active')) {
            document.body.style.overflow = '';
        }
        else {
            document.body.style.overflow = 'hidden';
        }



    });
    // return hamburgerElement;
};

const hamburgerCloseConditions = () => {
    const hamburgerElement = document.querySelector('.hamburger');
    const burgerElement = document.querySelector('.burger-menu__wrapper');

    burgerElement.addEventListener('click', () => {
        hamburgerElement.classList.remove('active');
        burgerElement.classList.remove('active');
        document.body.style.overflow = '';
    });

};

const windowResizeHandler = () => window.addEventListener('resize', function () {
    const windowWidth = window.innerWidth;
    const hamburgerElement = document.querySelector('.hamburger');
    const burgerElement = document.querySelector('.burger-menu__wrapper');
    // Если ширина окна больше, чем предыдущая ширина
    if (windowWidth > 768) {
        hamburgerElement.classList.remove('active');
        burgerElement.classList.remove('active');
    }
});

