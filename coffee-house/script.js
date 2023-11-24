const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-list__wrapper');
const navLinks = document.querySelectorAll('.menu__link');


// burger menu

burger.addEventListener('click', function () {
    console.log("click");
    this.classList.toggle('active');
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      nav.classList.add('open');
    }
  });

function closeMenu() {
    nav.classList.remove('open');
    burger.classList.remove('active');
    nav.classList.add('close');
  
    setTimeout(() => {
      nav.classList.remove('close');
    }, 300);
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-list__wrapper').classList.remove('open');
    document.querySelector('.burger').classList.remove('active');
    nav.classList.add('close');

    setTimeout(() => {
      nav.classList.remove('close');
    }, 300);
  });
});

// carusel