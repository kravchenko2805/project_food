import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms (formSelector, modalTimer) {
    // Forms

    const forms = document.querySelectorAll(formSelector);

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
        openModal('.modal', modalTimer);

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
            closeModal('.modal');
        }, 4000);

    }


    fetch('http://localhost:3000/menu')
        .then((data) => data.json())
        .then(resolve => console.log(resolve))


    fetch("http://localhost:3000/requests")
        .then((data) => data.json())
        .then(resolve => console.log(resolve))

}

export default forms;