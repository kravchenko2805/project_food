/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc () {
    //    Calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = "female";
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "Insert all data";
            return;
        }
        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio));
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio));
        }
    }

    calcTotal();

    function initLocalStorage (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalStorage('#gender div', "calculating__choose-item_active");
    initLocalStorage(".calculating__choose_big div", "calculating__choose-item_active")

    function getStatInfo (parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (evt) => {
                if (evt.target.getAttribute('data-ratio')) {
                    ratio = +evt.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +evt.target.getAttribute('data-ratio'))
                } else {
                    sex = evt.target.getAttribute('id');
                    localStorage.setItem('sex', evt.target.getAttribute('id'))
                }
                elements.forEach(elm => {
                    elm.classList.remove(activeClass);
                });
                evt.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStatInfo('#gender', "calculating__choose-item_active");
    getStatInfo(".calculating__choose_big", "calculating__choose-item_active");

    function getDynamicInfo (selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    // localStorage.setItem("height", height)
                    break;
                case "weight":
                    weight = +input.value;
                    // localStorage.setItem("weight", weight)
                    break;
                case "age":
                    age = +input.value;
                    // localStorage.setItem("age", age)
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards () {
    // Menu - items

    class MenuItem {
        constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.rate = 28;
            this.exchangeToUAH();
        }

        exchangeToUAH() {
            this.price *= this.rate;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => {
                    element.classList.add(className);
                    this.element = 'menu__item';
                    element.classList.add(this.element);
                });
            }
            element.innerHTML = `
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> UAH/день</div>
            `;
            this.parent.append(element);
        }
    }

    // const div = new MenuItem();
    // div.render();

    const getResources = async (url) => {
          const res = await fetch(url);
          if (!res.ok) {
              throw new Error(`Could not fetch ${url}, status: ${res.status}`);
          }
          return await res.json();
      };

    // axios.get("http://localhost:3000/menu")
    //     .then(data => {
    //         console.log(data);
    //         data.data.forEach( ({img, altimg, title, descr, price}) => {
    //             new MenuItem(img, altimg, title, descr, price, ".menu .container").render();
    //         })
    //     });


    getResources('http://localhost:3000/menu')
        .then(data => {
            data.forEach( ({img, altimg, title, descr, price}) => {
                new MenuItem(img, altimg, title, descr, price, ".menu .container").render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms (modalTimer) {
    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: "loading..",
        success: "Thanks",
        failure: "404"
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);



            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);



            // const obj = {};
            //
            // formData.forEach((value, key) => {
            //     obj[key] = value;
            // });
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            const postData = async (url, data) => {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: data
                });
                return await res.json();
            };


            postData(`http://localhost:3000/requests`, json )
                // fetch('http://localhost:3000/requests', {
                //     method: "POST",
                //     headers: {
                //         "Content-type": "application/json"
                //     },
                //     body: JSON.stringify(obj)
                // })
                //     .then( data => data.text())
                .then( (data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch( () => {
                showThanksModal(message.failure);
            }).finally( () => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                 <div class="modal__close" data-close>&#10006;</div>
                <div class="modal__title">${message}</div>
            </div>
       `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout( () => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);

    }


    fetch('http://localhost:3000/menu')
        .then((data) => data.json())
        .then(resolve => console.log(resolve))


    fetch("http://localhost:3000/requests")
        .then((data) => data.json())
        .then(resolve => console.log(resolve))

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function openModal(modalSelector, modalTimer) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimer) {
    clearInterval(modalTimer);
    }
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function modal (triggerSelector, modalSelector, modalTimer) {
//    Modal window

    const modalBtn = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);
    // modalCloseBtn = document.querySelector('[data-close]');

    // modalCloseBtn.addEventListener('click', toggleModal);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') === "") {
            closeModal(modalSelector);
        }
    });

    modalBtn.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimer) )
    });

    function toggleModal() {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = 'visible';
    }



    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });



    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);



    // getResources('http://localhost:3000/menu')
    //     .then(data => createCard(data));
    //
    //     function createCard(data) {
    //         data.forEach( ({img, altimg, title, descr, price}) => {
    //             const element = document.createElement('div');
    //                 price *= 27;
    //             element.classList.add('menu__item');
    //
    //             element.innerHTML = `
    //                 <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> UAH/день</div>
    //             `;
    //
    //             document.querySelector('.menu .container').append(element);
    //         });
    //     }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    //    Sliders

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prevBtn = document.querySelector('.offer__slider-prev'),
        nextBtn = document.querySelector('.offer__slider-next'),
        currentIndex = document.querySelector('#current'),
        totalIndex = document.querySelector('#total'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesInner = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let indexSlide = 1,
        offset = 0;

    if (slides.length < 10) {
        totalIndex.textContent = `0${slides.length}`;
        // currentIndex.textContent = `0${indexSlide}`;
    } else {
        totalIndex.textContent = slides.length;
        currentIndex.textContent = `0${indexSlide}`;
    }

    slider.style.position = "relative";

    slidesInner.style.width = 100 * slides.length + "%";
    slidesInner.style.display = "flex";
    slidesInner.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slides.forEach(item => {
        item.style.width = width;
    });

    const indicators = document.createElement('ol'),
        dots = [];

    function deletePx(str) {
        return +str.replaceAll('px', ``);
    }

    nextBtn.addEventListener("click", () => {
        if (offset === deletePx(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deletePx(width);
        }

        if (indexSlide === slides.length) {
            indexSlide = 0;
        } indexSlide++;

        indexForBtns();
    });

    prevBtn.addEventListener("click", () => {
        if (offset === 0) {
            offset = deletePx(width) * (slides.length - 1);
        } else {
            offset -= deletePx(width);
        }

        if (indexSlide === 1) {
            indexSlide = slides.length + 1;
        } indexSlide--;

        indexForBtns();
    });



    // indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 15;
                display: flex;
                justify-content: center;
                margin-right: 15%;
                margin-left: 15%;
                list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
        `;

        indicators.append(dot);

        if (i === 0) {
            dot.style.opacity = '1';
        }

        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            indexSlide = slideTo;

            offset = deletePx(width) * (slideTo - 1);

            indexForBtns();
        });
    });

    function indexForBtns () {
        if (indexSlide < 10) {
            currentIndex.textContent = `0${indexSlide}`;
        } else {
            currentIndex.textContent = indexSlide;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[indexSlide - 1].style.opacity = '1';

        slidesInner.style.transform = `translateX(-${offset}px)`;
    }

    // showSlides(indexSlide);
    //
    // if (slides.length < 10) {
    //     // totalIndex.innerHTML = addZero(slides.length);
    //     totalIndex.textContent = `0${slides.length}`;
    // } else {
    //     totalIndex.textContent = slides.length;
    // }
    //
    // function showSlides (n) {
    //     if (n > slides.length) {
    //         indexSlide = 1;
    //     } else if (n < 1) {
    //         indexSlide = slides.length;
    //     }
    //
    //     slides.forEach(item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show');
    //     });
    //
    //     slides[indexSlide - 1].classList.add('show');
    //     slides[indexSlide - 1].classList.remove('hide');
    //
    //     if (slides.length < 10) {
    //         currentIndex.textContent = `0${indexSlide}`;
    //     } else {
    //         currentIndex.textContent = indexSlide;
    //     }
    // }
    //
    // function nextSlide (n) {
    //     showSlides(indexSlide += n);
    // }
    //
    // prevBtn.addEventListener('click', () => {
    //     nextSlide(-1);
    // });
    //
    // nextBtn.addEventListener('click', () => {
    //     nextSlide(1);
    // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs () {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (evt) => {
        const target = evt.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer () {
    //    Timer
    const deadLine = '2021-02-18';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(Date()),
            days = Math.floor(t / (60 * 1000 * 60 * 24)),
            hours = Math.floor((t / (60 * 1000 * 60)) % 24),
            minutes = Math.floor((t / (60 * 1000)) % 60),
            seconds = Math.floor((t / 1000) % 60);


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function addZero(num) {
        if (num > 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTimeRemaining(endtime);

            if (time.total > 0) {
                days.innerHTML = addZero(time.days);
                hours.innerHTML = addZero(time.hours);
                minutes.innerHTML = addZero(time.minutes);
                seconds.innerHTML = addZero(time.seconds);
            } else {
                days.innerHTML = "0";
                hours.innerHTML = "0";
                minutes.innerHTML = "0";
                seconds.innerHTML = "0";
            }

            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");


;








window.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimer), 200000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default) ();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimer);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)(modalTimer);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)();


});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map