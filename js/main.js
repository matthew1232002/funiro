async function getProducts(button){
  if (!button.classList.contains('_hold')){
    button.classList.add('_hold');
    const file = 'json/products.json';
    let response = await fetch (file, {
      method: "GET"
    });
    if (response.ok){
      let result = await response.json();
      loadProducts(result);
      button.classList.remove('_hold');
      button.remove();
    } else{
      console.log(file);
      console.log(response);
      alert('Ошибка');
    }
  }
}

function loadProducts (data) {
  const productsItems = document.querySelector('.products__items');

  data.products.forEach(item => {
    const productId = item.id;
    const productUrl = item.url;
    const productImage = item.image;
    const productTitle = item.title;
    const productText = item.text;
    const productPrice = item.price;
    const productOldPrice = item.priceOld;
    const productShareUrl = item.shareUrl;
    const productLikeUrl = item.likeUrl;
    const productLabels = item.labels;

    let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
    let productTemplateEnd = `</article>`;

    let productTemplateLabels = '';
    if (productLabels) {
      let productTemplateLabelsStart = `<div class="item-product__labels">`;
      let productTemplateLabelsEnd = `</div>`;
      let productTemplateLabelsContent = '';

      productLabels.forEach(labelItem => {
        productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
      });

      productTemplateLabels += productTemplateLabelsStart;
      productTemplateLabels += productTemplateLabelsContent;
      productTemplateLabels += productTemplateLabelsEnd;
    }

    let productTemplateImage = `
		<a href="${productUrl}" class="item-product__image _ibg">
			<img src="img/${productImage}" alt="${productTitle}">
		</a>
	`;

    let productTemplateBodyStart = `<div class="item-product__body">`;
    let productTemplateBodyEnd = `</div>`;

    let productTemplateContent = `
		<div class="item-product__content">
			<h3 class="item-product__title">${productTitle}</h3>
			<div class="item-product__text">${productText}</div>
		</div>
	`;

    let productTemplatePrices = '';
    let productTemplatePricesStart = `<div class="item-product__prices">`;
    let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
    let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
    let productTemplatePricesEnd = `</div>`;

    productTemplatePrices = productTemplatePricesStart;
    productTemplatePrices += productTemplatePricesCurrent;
    if (productOldPrice) {
      productTemplatePrices += productTemplatePricesOld;
    }
    productTemplatePrices += productTemplatePricesEnd;

    let productTemplateActions = `
		<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a href="" class="actions-product__button btn btn_white">Add to cart</a>
				<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
				<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
			</div>
		</div>
	`;

    let productTemplateBody = '';
    productTemplateBody += productTemplateBodyStart;
    productTemplateBody += productTemplateContent;
    productTemplateBody += productTemplatePrices;
    productTemplateBody += productTemplateActions;
    productTemplateBody += productTemplateBodyEnd;

    let productTemplate = '';
    productTemplate += productTemplateStart;
    productTemplate += productTemplateLabels;
    productTemplate += productTemplateImage;
    productTemplate += productTemplateBody;
    productTemplate += productTemplateEnd;

    productsItems.insertAdjacentHTML('beforeend', productTemplate);
  });
}

window.onload = function () {
  function documentActions(event) {
    const targetElement = event.target;

    if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_hover');
    }
    if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0){
        document.querySelector('.menu__item').classList.remove('_hover');
    }


    if (targetElement.classList.contains('search-form__icon')){
      document.querySelector('.search-form').classList.toggle('_active');
    }else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
      document.querySelector('.search-form').classList.remove('_active');
    }

    if (window.innerWidth < 768 ) {
      if (targetElement.classList.contains('menu-footer__arrow')) {
        targetElement.closest('.menu-footer__column').classList.toggle('_active');
      }
      if (!targetElement.closest('.menu-footer__column') && document.querySelectorAll('.menu-footer__column._active').length > 0){
        document.querySelector('.menu-footer__column').classList.remove('_active');
      }
    }
    if (targetElement.classList.contains('products__more')) {
      getProducts(targetElement).then();
      event.preventDefault();
    }
  }

  document.addEventListener('click', documentActions);
}



let burgerBtn = document.getElementById('burgerMenu');
let menuBody = document.getElementById('menu');

let menuBurgerClosed = "actions-header__item actions-header__item_burger _burger"; //class name for closed button
let menuBurgerOpened = "actions-header__item actions-header__item_burger _active _burger"; //class name for opened button
let menuBodyClosed = "menu__body"; //class name for closed menu
let menuBodyOpened = "menu__body _active"; //class name for opened menu

burgerBtn.onclick = function() {
  if (burgerBtn.className === menuBurgerClosed) {
    burgerBtn.className = menuBurgerOpened;
    menuBody.className = menuBodyOpened;
  } else if (burgerBtn.className === menuBurgerOpened) {
    burgerBtn.className = menuBurgerClosed;
    menuBody.className = menuBodyClosed;
  }
}
//main-slider
if (document.querySelector('.slider-main__body')){
  new Swiper('.slider-main__body', {
    observer:true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides:5,
    preLoadImages: false,
    parallax: true,
    //Dots
    pagination: {
      el: '.controls-slider-main__dots',
      clickable: true,
    },
    navigation: {
      nextEl:'.slider-main .slider-arrow_next',
      prevEl:'.slider-main .slider-arrow_prev',
    },
  });
}

//rooms__slider
if (document.querySelector('.slider-rooms__body')){
  new Swiper('.slider-rooms__body', {
    observer:true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 24,
    speed: 800,
    loop: true,
    loopAdditionalSlides:5,
    preLoadImages: false,
    parallax: true,
    //Dots
    pagination: {
      el: '.slider-rooms__dots',
      clickable: true,
    },
    navigation: {
      nextEl:'.slider-rooms .slider-arrow_next',
      prevEl:'.slider-rooms .slider-arrow_prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: '1',
        spaceBetween: 20
      },
      // when window width is >= 640px
      992: {
        slidesPerView: 'auto',
        spaceBetween: 24
      }
    },
  });
}
//tips__slider
if (document.querySelector('.slider-tips__body')){
  new Swiper('.slider-tips__body', {
    observer:true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 32,
    speed: 800,
    loop: true,
    watchOverflow: true,
    //Dots
    pagination: {
      el: '.slider-tips__dots',
      clickable: true,
    },
    navigation: {
      nextEl:'.slider-tips .slider-arrow_next',
      prevEl:'.slider-tips .slider-arrow_prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 1210px
      1210: {
        slidesPerView: 3,
        spaceBetween: 32
      }
    },
  });
}

//Header
const headerElement = document.querySelector('.header');

const callback = function (entries, observer) {
  console.log(entries[0]);
  if (entries[0].isIntersecting) {
    headerElement.classList.remove('_scroll');
  }else {
    headerElement.classList.add('_scroll');
  }
}

const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);
