import data from '../assets/menu/products.json' assert { type: 'json' };
const loadData = document.querySelector('.oncount');
const menuButtons = document.querySelectorAll('.menu-btn');
const modalWindow = document.getElementById('modal');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-list__wrapper');
const navLinks = document.querySelectorAll('.menu__link');

const copyData = data;
createMenu(data, 'coffee');

window.addEventListener('resize', adjustScreenLength);

function adjustScreenLength() {
    const menuWrapperItemCount = document.querySelectorAll('.menu-item__card');
    if (menuWrapperItemCount.length > 4) {
        menuWrapperItemCount.forEach((item, index) => {
            if (index >= 4 &&  (window.innerWidth <= 768)) {
                item.style.display = 'none';
                loadData.style.display = 'block'; 
            } else {
                loadData.style.display = 'none'; 
                item.style.display = 'block';
            }
        });
    }
}


function createMenu(data, type){
    const menuSlider = document.querySelector('.menu-items__slider');
    menuSlider.innerHTML = '';
    const orderData = data.filter(element => element.category === type);
    const rowsHTML = orderData.map((element, index) => {
        const image =  `<div class="menu-item__card_image-wrapper"> 
        <img src="${element.img}" alt="${String(element.category)}${String(index+1)}"></div> `;

        return `
        <div class="menu-item__card" id="menu-item__card-${String(index+1)}">
        ${image}
        <div class="menu-item__card_description-wrapper">
        <h3>${element.name}</h3>
        <p class="coffee-description">${element.description}</p>
        <p class="slider-item__price card-display">$${element.price}</p>  
        </div>
        </div>
        `;
        }).join('');
    menuSlider.insertAdjacentHTML('beforeend', rowsHTML);
    adjustScreenLength();
}


menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        menuButtons.forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.classList.remove('menu-btn-checked');
            }
        });
        const menuItems = document.querySelectorAll('.menu-item__card');
        menuItems.forEach(element => {
            element.classList.add("elementToFadeInAndOut");
            setTimeout(function () {
                checkType(btn.id);
              }, 300);
        })
        btn.classList.add('menu-btn-checked');
    });
});

function checkType(id) {
    let type = 'coffee';

    if (id === 'tea-menu') {
        type = 'tea';
    } else if (id === 'dessert-menu') {
        type = 'dessert';
    }

    createMenu(copyData, type);
}

loadData.addEventListener('click', () => {
    const menuItems = document.querySelectorAll('.menu-item__card');
        if (menuItems.length > 4) {
            menuItems.forEach((item, index) => {
                if (index >= 4) {
                    item.style.display = 'block';
                }
            });
        }
    loadData.style.display = 'none'; 
});

// modal

function openModel(item) {
    const itemName = item.getElementsByTagName("h3")[0].innerHTML;
    const itemImage = item.querySelector('.menu-item__card_image-wrapper');
    const result = copyData.find(element => element.name === itemName);
    const rowHTML = generateRowHTML(result, itemImage);
    const modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.insertAdjacentHTML('beforeend', rowHTML);
    openModelWindow();
}

const menuItems = document.querySelectorAll('.menu-item__card');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        openModel(item);
    });
});

function generateRowHTML(element, itemImage) {
    let buttonsHTML = '';
    for (const key in element.sizes) {
        if (Object.hasOwnProperty.call(element.sizes, key)) {
            const sizeObj = element.sizes[key];
            const size = sizeObj.size;
            const addPrice = sizeObj['add-price'];
            if (key === 's') {
                buttonsHTML += `
                  <div class="menu-btn modal-wrapper__btn-set_item menu-btn-checked" id="${String(addPrice)}">
                      <span class="menu-btn__cicle single-modal">${key}</span>
                      <span class="single-modal description__ml">${size}</span>
                  </div>`;
              } else {
                buttonsHTML += `
                  <div class="menu-btn modal-wrapper__btn-set_item" id="${String(addPrice)}">
                      <span class="menu-btn__cicle single-modal">${key}</span>
                      <span class="single-modal description__ml">${size}</span>
                  </div>`;
              }
        }
    }

    let additivesHTML = '';

    for (const [index, additive] of element.additives.entries()) {
        const additiveName = additive.name;
        const additivePrice = additive['add-price'];
        additivesHTML += `
            <div class="menu-btn modal-wrapper__btn-set_item" id="${String(additivePrice)}">
                <span class="menu-btn__cicle single-modal">${index+1}</span>
                <span class="single-modal smallcase">${additiveName}</span>
            </div>`;
    }

    const image =  `<div class="modal-wrapper__card-img"> 
    <img src="${element.img}" alt="${String(element.category)}"></div> `;

    return `
    ${image}
    <div class="modal-wrapper__text">
        <h3>${element.name}</h3>
        <p class="coffee-description">${element.description}</p>
        <p class="coffee-description size-additive">Size</p>
        <div class="modal-wrapper__btn-set">${buttonsHTML}</div>
        <p class="coffee-description size-additive">Additives</p>
        <div class="modal-wrapper__btn-set">${additivesHTML}</div>
        <div class="total-price">
        <p class="slider-item__price">Total:</p>
        <p class="slider-item__price card-display">$${element.price}</p>   
        </div>
        <hr>
        <div class="static-block__ads">
            <img class="info-empty" src="assets/icons/info-empty.svg" alt="info empty">
            <p class="mobile-btn__wrapper_sub-title modal-window_description">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
        </div>
        <button class="modal__close-btn link-btn">Close</button>
    </div>
`;
}


function openModelWindow(){
    modalWindow.classList.add('modal_visibility');
}

document.getElementById('disable-default-menu').addEventListener('click', function(event) {
    event.preventDefault(); 
    console.log("Anchor clicked! Custom action performed.");
});

 // burger menu

 burger.addEventListener('click', function () {
    this.classList.toggle('active');
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      nav.classList.add('open');
      nav.classList.add('open-script');
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
    nav.classList.add('close');
    document.querySelector('.burger').classList.remove('active');
    setTimeout(() => {
      nav.classList.remove('close');
      nav.classList.remove('open-script');
    }, 300);
  });
});