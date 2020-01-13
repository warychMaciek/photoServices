document.addEventListener("DOMContentLoaded", function() {
    const nav = document.getElementById('nav');
    const navItems = document.getElementsByClassName('nav-item');
    const listItems = document.getElementsByTagName('li');

    window.onscroll = () => {
        if (window.scrollY > 30) {
            nav.className = 'nav-fixed';

            for (let i=0; i<navItems.length; i++) {
                navItems[i].style.backgroundColor = '#FFF';
            };
            
            for (let j=0; j<listItems.length; j++) {
                listItems[j].className = 'list-item-fixed';
            };
            
        } else {
            nav.className = 'nav';

            for (let i=0; i<navItems.length; i++) {
                navItems[i].style.backgroundColor = '#1b1b1b';
            };

            for (let j=0; j<listItems.length; j++) {
                listItems[j].className = 'list-item';
            };
        }
    };

    //modal 
    //opening modal
    const openModalButtons = document.querySelectorAll('[data-modal]');
    const bodyScrollLock = document.querySelector('body');
    

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {   
            const modal = document.querySelector(button.dataset.modal);
            if (modal.id === 'contact-form') {
                contactIcon.style.visibility = 'hidden';
            };
            openModal(modal);
        });
    });

    function openModal(modal) {
        modal.classList.add('active');
        bodyScrollLock.style.overflow = 'hidden';
    };
    //closing modal
    const closeModalButtons = document.querySelectorAll('[data-close]');

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    function closeModal(modal) {
        modal.classList.remove('active');
        bodyScrollLock.style.overflow = 'visible';
        contactIcon.style.visibility = 'visible';
    };

    //lightbox
    const imageToLightbox = document.querySelectorAll('[data-big]');
    const lightbox = document.getElementById('lightbox');

    imageToLightbox.forEach(button => {
        button.addEventListener('click', () => {
            lightbox.style.content = `url(${button.firstChild.src})`; 
            lightbox.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });
        });
    });

    // contact form 
    const contactFormBtn = document.querySelector('#get-in-touch-btn');
    const contactInvitation = document.querySelector('.contact-invitation');
    const contactFormCloseBtn = document.querySelector('#contact-form-close-btn');
    const contactForm = document.querySelector('#contactForm');
    const contactIcon = document.querySelector('.contact-icon');

    const width1366 = window.matchMedia('screen and (max-width: 1366px)');
    const width1350 = window.matchMedia('screen and (max-width: 1350px)');
    const width1050 = window.matchMedia('screen and (max-width: 1050px)');
    const width720 = window.matchMedia('screen and (max-width: 720px)');
    const width576 = window.matchMedia('screen and (max-width: 576px)');
    

    contactFormBtn.addEventListener('click', () => {
        contactInvitation.style.zIndex = '200';

        if (width576.matches) {
            contactInvitation.style.bottom = '200px';
            contactInvitation.style.height = '720px';
        } else if (width1050.matches) {
            contactInvitation.style.bottom = '250px';
            contactInvitation.style.height = '720px';
        } else if (width1350.matches) {
            contactInvitation.style.bottom = '320px';
            contactInvitation.style.height = '800px';
        } else if (width1366.matches) {
            contactInvitation.style.bottom = '420px';
            contactInvitation.style.height = '900px';
        } else {
            contactInvitation.style.height = '900px';
        }
        
        contactFormBtn.style.opacity = '0';
        window.setTimeout(() => {
            contactFormBtn.style.display = 'none';
            contactForm.style.top = '0';
        }, 1000);
    });

    contactFormCloseBtn.addEventListener('click', () => {
        contactInvitation.style.bottom = '200px';
        contactForm.style.top = '550px';

        if (width576.matches) {
            contactInvitation.style.height = '250px';
            contactInvitation.style.bottom = '0';
        } else if (width720.matches) {
            contactInvitation.style.height = '280px';
        } else if (width1050.matches) {
            contactInvitation.style.height = '355px';
        } else if (width1350.matches) {
            contactInvitation.style.height = '380px';
        } else if (width1366.matches) {
            contactInvitation.style.height = '400px';
        } else {
            contactInvitation.style.height = '400px';
        }

        window.setTimeout(() => {
            contactFormBtn.style.display = 'block';
        }, 500);
        
        window.setTimeout(() => {
            contactInvitation.style.zIndex = '0';
            contactFormBtn.style.opacity = '1';
        }, 1000);
    });

    contactIcon.addEventListener('click', () => {
        openModalButtons.forEach(button => {
            const modal = document.querySelector(button.dataset.modal);
            if (modal.classList.contains('active') &&  modal.id !== 'contact-form') {
                modal.classList.remove('active');
            };
        });
        contactIcon.style.visibility = 'hidden';
        contactInvitation.style.zIndex = '200';
        window.setTimeout(() => {
            
            if (width576.matches) {
                contactInvitation.style.bottom = '200px';
                contactInvitation.style.height = '720px';
            } else if (width1050.matches) {
                contactInvitation.style.bottom = '250px';
                contactInvitation.style.height = '720px';
            } else if (width1350.matches) {
                contactInvitation.style.bottom = '320px';
                contactInvitation.style.height = '800px';
            } else if (width1366.matches) {
                contactInvitation.style.bottom = '420px';
                contactInvitation.style.height = '900px';
            } else {
                contactInvitation.style.height = '900px';
            }

            contactFormBtn.style.opacity = '0';
            window.setTimeout(() => {
                contactFormBtn.style.display = 'none';
                contactForm.style.top = '0';
            }, 1000);
        }, 1000);
    });

    //checkboxes
    let photo = document.querySelector('#checkbox-photo');
    let live = document.querySelector('#checkbox-live');
    let movie = document.querySelector('#checkbox-movie');

    photo.addEventListener('click', () => {
        if (photo.checked) {
            photo.value = 'tak';
        } else {
            photo.value = 'nie';
        }
    });

    live.addEventListener('click', () => {
        if (live.checked) {
            live.value = 'tak';
        } else {
            live.value = 'nie';
        }
    });

    movie.addEventListener('click', () => {
        if (movie.checked) {
            movie.value = 'tak';
        } else {
            movie.value = 'nie';
        }
    });
});

