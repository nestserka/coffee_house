import data from '../assets/menu/products.json' assert { type: 'json' };
const loadData = document.querySelector('.oncount');
const menuButtons = document.querySelectorAll('.menu-btn');
const modalWindow = document.getElementById('modal');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-list__wrapper');
const navLinks = document.querySelectorAll('.menu__link');
let closeBtn;
let body = document.body;

const copyData = data;
createMenu(data, 'coffee');

window.addEventListener('resize', adjustScreenLength);

function adjustScreenLength() {
    const menuWrapperItemCount = document.querySelectorAll('.menu-item__card');
    console.log(menuWrapperItemCount.length);
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
    } else {
        loadData.style.display = 'none'; 
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
    setModalBtn();
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
              }, 200);
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

function setModalBtn(){
    const menuItems = document.querySelectorAll('.menu-item__card');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            openModel(item);
        });
    });
}


function generateRowHTML(element, itemImage) {
    let buttonsHTML = '';
    for (const key in element.sizes) {
        if (Object.hasOwnProperty.call(element.sizes, key)) {
            const sizeObj = element.sizes[key];
            const size = sizeObj.size;
            const addPrice = sizeObj['add-price'];
            if (key === 's') {
                buttonsHTML += `
                  <div class="menu-btn modal-wrapper__btn-set_item menu-btn-checked btn-size" data-attribute="${String(addPrice)}">
                      <span class="menu-btn__cicle single-modal">${key}</span>
                      <span class="single-modal description__ml">${size}</span>
                  </div>`;
              } else {
                buttonsHTML += `
                  <div class="menu-btn modal-wrapper__btn-set_item btn-size" data-attribute="${String(addPrice)}">
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
            <div class="menu-btn modal-wrapper__btn-set_item btn-additive" data-attribute="${String(additivePrice)}">
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
        <p class="slider-item__price card-display" id="item-price">$${element.price}</p>   
        </div>
        <hr>
        <div class="static-block__ads">
            <img class="info-empty" src="assets/icons/info-empty.svg" alt="info empty">
            <p class="mobile-btn__wrapper_sub-title modal-window_description">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
        </div>
        <button class="modal__close-btn link-btn" id="close_modal">Close</button>
    </div>
`;
}


function openModelWindow(){
    modalWindow.classList.add('modal_visibility');
    body.classList.add('scroll_block');
    closeBtn = document.getElementById('close_modal');
    closeBtn.addEventListener('click', closeModal);
    setButtons();
}

document.getElementById('disable-default-menu').addEventListener('click', function(event) {
    event.preventDefault(); 
});

 // burger menu

 burger.addEventListener('click', function () {
    this.classList.toggle('active');
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      nav.classList.add('open');
      nav.classList.add('open-script');
      body.classList.add('scroll_block');
    }
  });

function closeMenu() {
    nav.classList.remove('open');
    burger.classList.remove('active');
    nav.classList.add('close');
    body.classList.remove('scroll_block');
  
    setTimeout(() => {
      nav.classList.remove('close');
    }, 300);
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if ( document.querySelector('.nav-list__wrapper').classList.contains('open')) {
      document.querySelector('.nav-list__wrapper').classList.remove('open');
      nav.classList.add('close');
      body.classList.remove('scroll_block');
      document.querySelector('.burger').classList.remove('active');
      setTimeout(() => {
        nav.classList.remove('close');
        nav.classList.remove('open-script');
      }, 300);
    }
    });
  });



function closeModal(){
    modalWindow.classList.add('modal_hide');
    body.classList.remove('scroll_block');

    setTimeout(function () {
    modalWindow.classList.remove('modal_visibility');
    modal.classList.remove('modal_hide');
    document.querySelector('.modal-wrapper').innerHTML = '';
  }, 800);

}

modalWindow.addEventListener('click', function (event) {
    if (event.target === modal) {
        modalWindow.classList.add('modal_hide');
  
        setTimeout(function () {
            modalWindow.classList.remove('modal_visibility');
            modal.classList.remove('modal_hide');
            body.classList.remove('scroll_block');
            document.querySelector('.modal-wrapper').innerHTML = '';
          }, 300);
        }
});

function setButtons() {
    let btnSizes = document.querySelectorAll('.btn-size');
    let btnAdditives = document.querySelectorAll('.btn-additive');
    let productPrice = document.getElementById('item-price');
    const initialValue = productPrice.textContent.substring(1);
    let price = parseFloat(initialValue);
    btnSizes.forEach(btn => {
        btn.addEventListener('click', () => {
            let size = parseFloat(btn.getAttribute('data-attribute'));
            if (btn.classList.contains('menu-btn-checked')){
                price -= size;
            }
            btnSizes.forEach(button => {
                if (button !== btn && button.classList.contains('menu-btn-checked')) {
                button.classList.remove('menu-btn-checked');
                price -= parseFloat(button.getAttribute('data-attribute'));
                }
            });
            btn.classList.add('menu-btn-checked');
            price += size;
            setTimeout(() => {
                productPrice.innerHTML = '$' + price.toFixed(2);
              }, 300);
        });
    });


    btnAdditives.forEach(btn => {
        btn.addEventListener('click', () => {
            let additive = parseFloat(btn.getAttribute('data-attribute'));
            btn.classList.toggle('menu-btn-checked');
            if (btn.classList.contains('menu-btn-checked')){
                price += additive;
            } else {
                price -= additive;
            }
            productPrice.innerHTML = '$' + price.toFixed(2);
        });
    });
}


