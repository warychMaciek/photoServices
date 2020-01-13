document.addEventListener("DOMContentLoaded", function() {
const form = document.querySelector('#contactForm');
const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

form.setAttribute('novalidate', true);

const displayFieldError = function(elem) {
    const fieldRow = elem.closest('.form-row');
    const fieldError = fieldRow.querySelector('.field-error');

    if (fieldError === null) {
        const errorText = elem.dataset.error;
        const divError = document.createElement('div');
        divError.classList.add('field-error');
        divError.innerText = errorText;
        fieldRow.appendChild(divError);
    }
};

const hideFieldError = function(elem) {
    const fieldRow = elem.closest('.form-row');
    const fieldError = fieldRow.querySelector('.field-error');
    if (fieldError !== null) {
        fieldError.remove();
    }
};

[...inputs].forEach(elem => {
    elem.addEventListener('input', function() {
        if (!this.checkValidity()) {
            this.classList.add('error');
        } else {
            this.classList.remove('error');
            hideFieldError(this);
        }
    });
});

const checkFieldsErrors = function(elements) {
    let fieldsAreValid = true;

    [...elements].forEach(elem => {
        if (elem.checkValidity()) {
            hideFieldError(elem);
            elem.classList.remove('error');
        } else {
            displayFieldError(elem);
            elem.classList.add('error');
            fieldsAreValid = false;
        }
    });

    return fieldsAreValid;
};

form.addEventListener('submit', e => {
    e.preventDefault();

    if (checkFieldsErrors(inputs)) {
        const elements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled), select:not(:disabled)');

        const dataToSend = new FormData();
        [...elements].forEach(el => dataToSend.append(el.name, el.value));

        const submit = form.querySelector('[type="submit"]');
        submit.disabled = true;
        submit.classList.add('element-is-busy');

        const url = form.getAttribute('action');
        const method = form.getAttribute('method');

        fetch(url, {
            method: method.toUpperCase(),
            body: dataToSend
        })
        .then(ret => ret.json())
        .then(ret => {
            submit.disabled = false;
            submit.classList.remove('element-is-busy');

            if (ret.errors) {
                ret.errors.map(function(el) {
                    return '[name="'+el+'"]'
                });

                const badFields = form.querySelectorAll(ret.errors.join(','));
                checkFieldsErrors(badFields);
            } else {
                if (ret.status === 'ok') {
                    const div = document.createElement('div');
                    div.classList.add('form-send-success');

                    form.parentElement.insertBefore(div, form);
                    div.innerHTML = '<strong>The message has been sent successfully</strong><span>We will try to answer as soon as possible. Thank you!</span>';
                    form.remove();
                }

                if (ret.status === 'error') {
                    if (document.querySelector('.send-error')) {
                        document.querySelector('.send-error').remove();
                    }
                    const div = document.createElement('div');
                    div.classList.add('send-error');
                    div.innerHTML = 'Something went wrong. Your message hasn\'t been sent :(';
                    submit.parentElement.appendChild(div);
                }
            }
        }).catch(_ => {
            submit.disabled = false;
            submit.classList.remove('element-is-busy');
        });
    }
});

document.querySelector('#loadingTest').addEventListener('click', function() {
    this.classList.add('element-is-busy');
    this.disabled = true;
});
})