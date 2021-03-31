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

export default calc;