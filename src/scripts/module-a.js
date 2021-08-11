(function() {
  
  const menuToggle = document.querySelector('.menu__toggle');
  const menu = document.querySelector('.menu');
  const body = document.querySelector('body')

  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('is-open')
    body.classList.toggle('body--locked')
  })



  const animItems = document.querySelectorAll('._anim-items');


  
  if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll() {
      for (let i = 0; i < animItems.length; i++) {
        const animItem = animItems[i];
        
        const animItemHeight = animItem.offsetHeight; //высота элемента 182
        const animItemOffset = offset(animItem).top; //позиция объекта относительно вверха окна
        const animStart = 4; // коэффициент регулирования начала анимация

        let animItemPoint = window.innerHeight - animItemHeight / animStart; // 700 - 200 /4 = 750
        if ( animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;; // 800 - 800 / 4 = 1000
        }

        if ((pageYOffset > animItemOffset - animItemPoint) && (pageYOffset < animItemOffset + animItemHeight)) //возвращает количество пикселей, на которое прокручен документ по вертикали
        {
          animItem.classList.add('_active');
        } else {
          if (!animItem.classList.contains('_anim-no-hide')) {
            animItem.classList.remove('_active');
          }
        }
        
      }
    }


    function offset(el) {

      const rect = el.getBoundingClientRect(); // размер элемента и его позицию относительно  viewport

      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      // pageXOffset - текущая прокрутка слева ,
      // document.documentElement - html,  
      // scrollTop - сколько прокручено вверх
      const scrollTop = window.pageXOffset || document.documentElement.scrollTop;


      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      }

    }


    setTimeout(() => {
      animOnScroll()
    }, 400);

  }


  $(document).ready(function() {
    $('.portfolio__slider').slick({
      infinite: false,
      centerMode: true,
      centerPadding: "60px",
      dots: true,
      focusOnSelect: true,
      speed: 1000,
      responsive: [
        {
          breakpoint: 768, 
          settings: {
            centerPadding: '20px',
          }
        },
        {
          breakpoint: 576,
          settings: {
            arrows: false,
            centerPadding: 0,
          }
        }
      ]
    })
  })




  const menuLinks = document.querySelectorAll('.menu__link');
  
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', (e) => {
      e.preventDefault();


      let blockId = menuLink.getAttribute('href')

      if (blockId != "#") {
          document.querySelector(blockId).scrollIntoView({
            behavior: 'smooth',
          })
      }


    })
  })


  const servicesButtons = document.querySelectorAll('.services__btn');

  servicesButtons.forEach((servicesButton) => {
    servicesButton.addEventListener('click', (e) => {
      e.preventDefault();

      location = 'https://t.me/turalinov';
      
    })
  })





})()