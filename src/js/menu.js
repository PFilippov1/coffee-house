/* eslint-disable quotes */
/* eslint-disable indent */
'use strict';
// import { hamburger, hamburgerCloseConditions, windowResizeHandler } from './burger.js';

// window.onload = function () {
//     //cross hamburger
//     hamburger();
//     hamburgerCloseConditions();
//     //close burger (depends window width)
//     windowResizeHandler();


//     //первоначальная загрузка элементов кофе
//     fetchDataCoffee();
//     menuDisplayContent();
//     //refresh button for all elements
//     refreshElements();
// };


window.addEventListener('DOMContentLoaded', () => {
    hamburger();
    hamburgerCloseConditions();
    windowResizeHandler();
    menuDisplayContent();
    firstCoffeeClickEmulation();
    // fetchDataCoffee();
    refreshElements();

});

// почему-то не заимпортился файл...
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

    burgerElement.addEventListener('click', function () {
        hamburgerElement.classList.remove('active');
        burgerElement.classList.remove('active');
        document.body.style.overflow = '';

    });


    burgerElement.addEventListener('click', () => {
        hamburgerElement.classList.remove('active');
        burgerElement.classList.remove('active');
        // document.body.style.overflow = 'auto';
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


// ----------------


const firstCoffeeClickEmulation = () => {
    const element = document.querySelector('.cofee-button');
    element.click();

};

setTimeout(() => {
    firstCoffeeClickEmulation();
}, 100);


// change buttons

const menuDisplayContent = () => {
    document.querySelector('.coffee-button__wrapper').addEventListener('click', (event) => {
        const clickedElement = event.target.closest('.tab-button');
        // Check if the clicked element is a tab button
        if (clickedElement) {
            // Remove the 'active' class from all tab buttons
            removeSelectedTag();
            // Add the 'active' class to the clicked tab button
            clickedElement.classList.add('active');
            if (clickedElement.innerText === 'Coffee') {
                removeExistingElements();
                fetchDataCoffee();

                refreshElements();
                // refreshButtonAppearance();
            } else if (clickedElement.innerText === 'Tea') {
                removeExistingElements();
                fetchDataTea();
                // refreshButtonAppearance();

            } else if (clickedElement.innerText === 'Dessert') {
                removeExistingElements();
                fetchDataDessert();
                refreshElements();
                // refreshButtonAppearance();
            }
        }
    });
};

const removeSelectedTag = () => {
    let tags = document.querySelectorAll('.coffee-button__wrapper .tab-button');
    tags.forEach(tag => {
        tag.classList.remove('active');
    });
};


// start create json elements

// Создание новых JSON массивов с объектами
const coffee = [];
const tea = [];
const desserts = [];

readAndParseJSONFile();


async function readAndParseJSONFile() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();

        console.log(data);
        // Разделение объектов по категориям
        data.forEach((item) => {
            if (item.category === 'coffee') {
                coffee.push(item);
            } else if (item.category === 'tea') {
                tea.push(item);
            } else if (item.category === 'dessert') {
                desserts.push(item);
            }
        });
    } catch (error) {
        console.error('Ошибка при чтении и распарсивании JSON файла:', error);
    }
}

console.log(coffee);
console.log(tea);
console.log(desserts);

//функция для создания таблицы с кофе

async function fetchDataCoffee() {
    try {
        // const response = await fetch('products.json');
        // const data = await response.json();
        const wrapper = document.querySelector('.images__wrapper');

        // console.log(data);
        // Разделение объектов по категориям
        coffee.forEach((item) => {
            if (item.category === 'coffee') {

                //данные для динамического посторения класса
                const coffeeIndex = coffee.indexOf(item) + 1; // Get the coffee index (starting from 1)
                const coffeeClass = `coffee-${coffeeIndex}`; // Construct the dynamic coffee class

                const divElement = document.createElement('div');
                divElement.classList.add('drink-dessert__wrapper', coffeeClass);

                const divElement2 = document.createElement('div');
                divElement2.classList.add('drink-dessert__img', 'img-cofee');
                divElement.appendChild(divElement2);

                const imgElement = document.createElement('img');
                imgElement.src = `asset/img/coffee-${coffeeIndex}.jpg`;
                imgElement.alt = 'coffee';
                divElement2.appendChild(imgElement);

                const divElement3 = document.createElement('div');
                divElement3.classList.add('description-drink-dessert__wrapper');

                const h3Element = document.createElement('h3');
                h3Element.textContent = item.name; // Use the name property from the coffee array
                divElement3.appendChild(h3Element);

                const h4Element = document.createElement('h4');
                h4Element.textContent = item.description; // Use the description property from the coffee array
                divElement3.appendChild(h4Element);

                const h3Element2 = document.createElement('h3');
                h3Element2.textContent = '$' + item.price; // Use the price property from the coffee array
                divElement3.appendChild(h3Element2);

                divElement.appendChild(divElement3);
                divElement.setAttribute('id', coffee.indexOf(item) + 1);
                // Update the DOM
                // wrapper.appendChild(divElement);
                const refreshButtonWrapper = document.querySelector('.refresh-button__wrapper');
                refreshButtonWrapper.insertAdjacentElement('beforebegin', divElement);
                refreshButtonAppearance();


            }
        });
    } catch (error) {
        console.error('Ошибка при чтении и распарсивании JSON файла:', error);
    }
}

//функция для создания таблицы с чаем

async function fetchDataTea() {
    try {
        const wrapper = document.querySelector('.images__wrapper');

        // Разделение объектов по категориям
        tea.forEach((item) => {
            if (item.category === 'tea') {

                //данные для динамического посторения класса
                const teaIndex = tea.indexOf(item) + 1; // Get the coffee index (starting from 1)
                const teaClass = `tea-${teaIndex}`; // Construct the dynamic coffee class

                const divElement = document.createElement('div');
                divElement.classList.add('drink-dessert__wrapper', teaClass);

                const divElement2 = document.createElement('div');
                divElement2.classList.add('drink-dessert__img', 'img-tea');
                divElement.appendChild(divElement2);

                const imgElement = document.createElement('img');
                imgElement.src = `asset/img/tea-${teaIndex}.png`;
                imgElement.alt = 'tea';
                divElement2.appendChild(imgElement);

                const divElement3 = document.createElement('div');
                divElement3.classList.add('description-drink-dessert__wrapper');

                const h3Element = document.createElement('h3');
                h3Element.textContent = item.name;
                divElement3.appendChild(h3Element);

                const h4Element = document.createElement('h4');
                h4Element.textContent = item.description;
                divElement3.appendChild(h4Element);

                const h3Element2 = document.createElement('h3');
                h3Element2.textContent = '$' + item.price;
                divElement3.appendChild(h3Element2);

                divElement.appendChild(divElement3);
                divElement.setAttribute('id', tea.indexOf(item) + 9);
                // Update the DOM
                // wrapper.appendChild(divElement);
                const refreshButtonWrapper = document.querySelector('.refresh-button__wrapper');
                refreshButtonWrapper.insertAdjacentElement('beforebegin', divElement);
                hideRefreshButton();

            }
        });
    } catch (error) {
        console.error('Ошибка при чтении и распарсивании JSON файла:', error);
    }
}


async function fetchDataDessert() {
    try {
        const wrapper = document.querySelector('.images__wrapper');

        // Разделение объектов по категориям
        desserts.forEach((item) => {
            if (item.category === 'dessert') {

                //данные для динамического посторения класса
                const dessertsIndex = desserts.indexOf(item) + 1; // Get the coffee index (starting from 1)
                const dessertsIndexClass = `dessert-${dessertsIndex}`; // Construct the dynamic coffee class

                const divElement = document.createElement('div');
                divElement.classList.add('drink-dessert__wrapper', dessertsIndexClass);

                const divElement2 = document.createElement('div');
                divElement2.classList.add('drink-dessert__img', 'img-tea');
                divElement.appendChild(divElement2);

                const imgElement = document.createElement('img');
                imgElement.src = `asset/img/dessert-${dessertsIndex}.png`;
                imgElement.alt = 'tea';
                divElement2.appendChild(imgElement);

                const divElement3 = document.createElement('div');
                divElement3.classList.add('description-drink-dessert__wrapper');

                const h3Element = document.createElement('h3');
                h3Element.textContent = item.name; // Use the name property from the coffee array
                divElement3.appendChild(h3Element);

                const h4Element = document.createElement('h4');
                h4Element.textContent = item.description; // Use the description property from the coffee array
                divElement3.appendChild(h4Element);

                const h3Element2 = document.createElement('h3');
                h3Element2.textContent = item.price; // Use the price property from the coffee array
                divElement3.appendChild(h3Element2);

                divElement.appendChild(divElement3);
                divElement.setAttribute('id', desserts.indexOf(item) + 13);
                // Update the DOM

                const refreshButtonWrapper = document.querySelector('.refresh-button__wrapper');
                refreshButtonWrapper.insertAdjacentElement('beforebegin', divElement);
                refreshButtonAppearance();
                // wrapper.appendChild(divElement);
            }
        });
    } catch (error) {
        console.error('Ошибка при чтении и распарсивании JSON файла:', error);
    }
}

//очищаем элементы таблицы 
const removeExistingElements = () => {
    // Clear existing coffee elements
    const existingElements = document.querySelectorAll('.drink-dessert__wrapper');
    existingElements.forEach((element) => {
        element.parentNode.removeChild(element);
    });
};

// refresh button behavior
const refreshElements = () => {
    const refreshButtonWrapper = document.querySelector('.refresh-button__wrapper');
    refreshButtonWrapper.addEventListener('click', () => {
        const elemWrapper = document.querySelectorAll('.drink-dessert__wrapper');

        elemWrapper.forEach((elem) => {
            elem.style.display = 'block';

        });
        refreshButtonWrapper.style.display = 'none';
    });
};

// const refreshButtonAppearance = () => {
//     const refreshButtonWrapper = document.querySelector('.refresh-button__wrapper');
//     const elemWrapper = document.querySelectorAll('.drink-dessert__wrapper');
//     const elemWrapperArray = Array.from(elemWrapper);
//     console.log(elemWrapperArray.length);

//     if (elemWrapperArray.length <= 4) {
//         refreshButtonWrapper.style.display = 'none';
//     } else if (elemWrapperArray.length > 4) {
//         refreshButtonWrapper.style.display = 'flex';
//     }

// };

// refreshButtonAppearance();



const refreshButtonAppearance = () => {
    const refreshButtonWrapper = document.querySelector('.refresh-button__wrapper');
    const screenWidth = window.innerWidth;
    if (screenWidth < 769) {
        refreshButtonWrapper.style.display = 'flex';
    } else {
        refreshButtonWrapper.style.display = 'none';
    }
    // Добавляем обработчик события resize при загрузке страницы, чтобы установить начальное состояние кнопки
    window.addEventListener('resize', refreshButtonAppearance);
    window.addEventListener('load', refreshButtonAppearance);
};


const hideRefreshButton = () => {
    const imagesWrapper = document.querySelector('.images__wrapper');
    const refreshButtonWrapper = document.querySelector('.refresh-button__wrapper');
    const tea1 = document.querySelector('.tea-1');

    if (imagesWrapper.contains(tea1)) {
        refreshButtonWrapper.style.display = 'none';
    }
};


const modalAppearance = () => {
    const images__wrapper = document.querySelector('.images__wrapper');
    const modalOverlay = document.querySelector('.modal__overlay');
    images__wrapper.addEventListener('click', (e) => {
        // Получаем элемент, на который был произведен щелчок
        const clickedElement = e.target;
        // Получаем ближайший родительский элемент, который имеет класс 'drink-dessert__wrapper'
        const drinkDessertElement = clickedElement.closest('.drink-dessert__wrapper');

        //получаем значение id 
        // const idElement = drinkDessertElement.getAttribute('id');
        const idElement = drinkDessertElement.id;
        console.log(idElement);
        // Проверяем, содержит ли элемент класс 'drink-dessert__wrapper'

        if (drinkDessertElement && drinkDessertElement.classList.contains('drink-dessert__wrapper')) {
            //получаем данные из файла и потом добавляем их в модалку 
            showModalInfo(drinkDessertElement.id);
            modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // появлении модального окна делаем активным первую кнопку
            activateFirstButton();




        }
    });
};

modalAppearance();
const activateFirstButton = () => {
    const sizeWrapper = document.querySelector('.tabs-size__wrapper');
    sizeWrapper.querySelectorAll('.tab-button')[0].classList.add('active');
};

const modalClose = () => {
    const modalOverlay = document.querySelector('.modal__overlay');
    modalOverlay.addEventListener('click', (e) => {
        // Получаем элемент, на который был произведен щелчок
        const clickedElement = e.target;
        // console.log(e.target);
        if (clickedElement.classList.contains('close-modal__button') || clickedElement.classList.contains('modal__overlay')) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
            removeSelectedModalTagSizeButton();
        }
    });
};

modalClose();

// надо сделать чтобы по таргету можно было найти id и потом распарсить


async function showModalInfo(idElement) {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        // Разделение объектов по категориям
        data.forEach((item) => {
            if (item.id === idElement) {
                //данные для динамического посторения класса
                const modalImg = document.querySelector('.modal__wrapper .drink-dessert__img img');
                modalImg.innerHTML = '';
                modalImg.src = item.image;

                const modalItemName = document.querySelector('.modal-description__wrapper .drink-dessert__name');
                modalItemName.innerHTML = '';
                modalItemName.textContent = item.name;

                const modalTitle = document.querySelector('.modal-description__wrapper .description-title');
                modalTitle.innerHTML = '';
                modalTitle.textContent = item.description;

                const modaSizeS = document.querySelector('.s-size__button .icon__name');
                modaSizeS.innerHTML = '';
                modaSizeS.textContent = item.sizes.s.size;

                const modaSizeM = document.querySelector('.m-size__button .icon__name');
                modaSizeM.innerHTML = '';
                modaSizeM.textContent = item.sizes.m.size;

                const modaSizeL = document.querySelector('.l-size__button .icon__name');
                modaSizeL.innerHTML = '';
                modaSizeL.textContent = item.sizes.l.size;

                const modalAdditivesFirst = document.querySelector('.first-additives__button .icon__name');
                modalAdditivesFirst.innerHTML = '';
                modalAdditivesFirst.textContent = item.additives[0].name;

                const modalAdditivesSecond = document.querySelector('.second-additives__button .icon__name');
                modalAdditivesSecond.innerHTML = '';
                modalAdditivesSecond.textContent = item.additives[1].name;

                const modalAdditivesThird = document.querySelector('.third-additives__button .icon__name');
                modalAdditivesThird.innerHTML = '';
                modalAdditivesThird.textContent = item.additives[2].name;
                //price
                const modalPrice = document.querySelector('.total-price');
                modalPrice.innerHTML = '';
                modalPrice.textContent = `$${item.price}`;


            }
        });
    } catch (error) {
        console.error('Ошибка при чтении и распарсивании JSON файла:', error);
    }
}

// modal price changing

const modalSizePriceChanging = () => {
    const sizeWrapper = document.querySelector('.tabs-size__wrapper');
    sizeWrapper.addEventListener('click', (element) => {
        const sizeButton = element.target.closest('.tab-button');
        if (sizeButton) {
            removeSelectedModalTagSizeButton();
            addActiveModalTagSizeButton(sizeButton);
            countPriceSize(sizeButton);
        }
    });
};

// additives price changing
const modalAdditivesPriceChanging = () => {
    const additivesWrapper = document.querySelector('.additives__wrapper');
    additivesWrapper.addEventListener('click', (element) => {
        const additivesButton = element.target.closest('.tab-button');
        //добавляем toggle класс active 
        additivesButton.classList.toggle('active');

        if (additivesButton) {
            countAdditivesPrice(additivesButton);
            console.log(additivesButton);
        }
    });
};


modalSizePriceChanging();
modalAdditivesPriceChanging();

const removeSelectedModalTagSizeButton = () => {
    let tags = document.querySelectorAll('.tabs-size__wrapper .tab-button');
    tags.forEach(tag => {
        tag.classList.remove('active');
    });
};

const addActiveModalTagSizeButton = (activeAdd) => {
    activeAdd.classList.add('active');
};


// const countPriceSize = (sizeButton) => {
//     //получим данные по кнопке 
//     const buttonSizeTypeText = sizeButton.querySelector('.icon__face');
//     const sizeDifferencePrice = buttonSizeTypeText.innerText;
//     const modalPrice = document.querySelector('.total-price');
//     const originalPrice = modalPrice.innerText;
//     const isActive = sizeButton.classList.contains('active');

//     if (sizeDifferencePrice === 'S' && isActive) {
//         const price = parseFloat(originalPrice.replace('$', ''));
//         const newPrice = '$' + (price + 0).toFixed(2);
//         modalPrice.innerText = newPrice;
//     } else {
//         const price = parseFloat(originalPrice.replace('$', ''));
//         const newPrice = '$' + (price - 0).toFixed(2);
//         modalPrice.innerText = newPrice;
//     }


//     if (sizeDifferencePrice === 'M' && isActive) {
//         const price = parseFloat(originalPrice.replace('$', ''));
//         const newPrice = '$' + (price + 0.5).toFixed(2);
//         modalPrice.innerText = newPrice;
//     } else {
//         const price = parseFloat(originalPrice.replace('$', ''));
//         const newPrice = '$' + (price - 0.5).toFixed(2);
//         modalPrice.innerText = newPrice;
//     }


//     if (sizeDifferencePrice === 'L' && isActive) {
//         const price = parseFloat(originalPrice.replace('$', ''));
//         const newPrice = '$' + (price + 1).toFixed(2);
//         modalPrice.innerText = newPrice;
//     } else {
//         const price = parseFloat(originalPrice.replace('$', ''));
//         const newPrice = '$' + (price - 1).toFixed(2);
//         modalPrice.innerText = newPrice;
//     }
// };

const countPriceSize = (sizeButton) => {
    //получим данные по кнопке 
    const buttonSizeTypeText = sizeButton.querySelector('.icon__face');
    const sizeDifferencePrice = buttonSizeTypeText.innerText;
    const modalPrice = document.querySelector('.total-price');
    const originalPrice = modalPrice.innerText;
    const isActive = sizeButton.classList.contains('active');

    if (sizeDifferencePrice === 'S' && isActive) {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price + 0).toFixed(2);
        modalPrice.innerText = newPrice;
    } else {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price - 0).toFixed(2);
        modalPrice.innerText = newPrice;
    }


    if (sizeDifferencePrice === 'M' && isActive) {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price + 0.5).toFixed(2);
        modalPrice.innerText = newPrice;
    } else {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price - 0.5).toFixed(2);
        modalPrice.innerText = newPrice;
    }


    if (sizeDifferencePrice === 'L' && isActive) {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price + 1).toFixed(2);
        modalPrice.innerText = newPrice;
    } else {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price - 1).toFixed(2);
        modalPrice.innerText = newPrice;
    }
};






const countAdditivesPrice = (AddtivesButtonElements) => {
    const buttonAdditivesTypeText = AddtivesButtonElements.querySelector('.icon__face');
    const additivesNumber = buttonAdditivesTypeText.innerText;
    const modalPrice = document.querySelector('.total-price');
    let originalPrice = modalPrice.innerText;
    const isActive = AddtivesButtonElements.classList.contains('active');

    if (additivesNumber === '1' && isActive) {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price + 0.5).toFixed(2);
        modalPrice.innerText = newPrice;
    } else if (additivesNumber === '1' && !isActive) {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price - 0.5).toFixed(2);
        modalPrice.innerText = newPrice;
    }

    if (additivesNumber === '2' && isActive) {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price + 0.5).toFixed(2);
        modalPrice.innerText = newPrice;
        originalPrice = newPrice;
    } else if (additivesNumber === '2' && !isActive) {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price - 0.5).toFixed(2);
        modalPrice.innerText = newPrice;
    }

    if (additivesNumber === '3' && isActive) {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price + 0.5).toFixed(2);
        modalPrice.innerText = newPrice;
    } else if (additivesNumber === '3' && !isActive) {
        const price = parseFloat(originalPrice.replace('$', ''));
        const newPrice = '$' + (price - 0.5).toFixed(2);
        modalPrice.innerText = newPrice;
    }
};


