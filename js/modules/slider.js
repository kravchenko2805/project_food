function slider({
                    container, nextArrow, prevArrow, slide, totalCounter, currentCounter, wrapper, inner
                }) {
    //    Sliders

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prevBtn = document.querySelector(prevArrow),
        nextBtn = document.querySelector(nextArrow),
        currentIndex = document.querySelector(currentCounter),
        totalIndex = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesInner = document.querySelector(inner),
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

export default slider;