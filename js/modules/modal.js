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

export default modal;
export {openModal};
export {closeModal};