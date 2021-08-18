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
      centerPadding: "60px",
      dots: true,
      focusOnSelect: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 768, 
          settings: {
            centerPadding: '20px',
            slidesToShow: 2,
            slidesToScroll: 2,
            adaptiveHeight: true,
          }
        },
        {
          breakpoint: 576,
          settings: {
            arrows: false,
            centerPadding: 0,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
          }
        }
      ]
    });



    $('.reviwes__slider').slick({
      infinite: false,
      centerPadding: "60px",
      dots: true,
      focusOnSelect: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerPadding: '20px',
            slidesToShow: 2,
            slidesToScroll: 2,
            adaptiveHeight: true,
          }
        },
        {
          breakpoint: 576,
          settings: {
            arrows: false,
            centerPadding: 0,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
          }
        }
      ]
    });
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

      //для мобилки закрытия меню берем родитель меню
      const parentMenu = findParent(menuLink, '.menu');
      if(parentMenu !== false) {
        if (parentMenu.classList.contains('is-open')) {
          parentMenu.classList.toggle('is-open');
          body.classList.toggle('body--locked')
        }
      }



    })
  })



  

  function findParent(el, selector) {
    return el.closest(selector) !== null ? el.closest(selector) : false;
  }








  function addTelegramLinks(element) {
    element.addEventListener('click', (e) => {
      e.preventDefault();

      location = 'https://t.me/turalinov';

    })
  }


  const servicesButtons = document.querySelectorAll('.services__btn');
  servicesButtons.forEach((servicesButton) => {
    addTelegramLinks(servicesButton)
  })

  const offerButtons = document.querySelectorAll('.offer__btn');
  offerButtons.forEach((offerButton) => {
    addTelegramLinks(offerButton)
  })



  const youtubeLinks = document.querySelectorAll('.portfolio__youtube-link')
  const youtubeModal = document.getElementById('youtube-modal')
  const youtubeModalClose = document.getElementById('youtube-close')
  const youtubeFrame = document.getElementById('youtube-frame')
 

  youtubeLinks.forEach(( youtubeLink ) => {
    youtubeLink.addEventListener('click', (e) => {
      e.preventDefault();
      let id = getYoutubeId(youtubeLink);
      youtubeFrame.src = `https://www.youtube.com/embed/${id}?controls=0`;
      setTimeout(() => {
        youtubeModal.style.display = 'block'
      }, 1000);
    })
  })

  youtubeModalClose.addEventListener('click', (e) => {
    e.preventDefault(); 
    youtubeFrame.src = ``;
    youtubeModal.style.display = 'none'
  })

  function getYoutubeId(el) {
    return el.dataset.id;
  }



  // //В переменную $token нужно вставить токен, который нам прислал @botFather
  // const token = "1989532942:AAHEqV7pvCIT66qD0h6i0ijYGETdmqm5cRQ";
  // //Сюда вставляем chat_id
  // const chatId = "791403199";
  // const name = 'Ivanov Ivan';
  // const phone = '+356955251221';
  // const data = {
  //   name,
  //   phone
  // };

  // let text = '';
  // for( let key in data ) {
  //   text += `<b>${key}</b> ${data[key]}\n`;
  // }

  // const parse_mode = "HTML";

  // const requestOptionsPush = {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(
  //     { chat_id: chatId, parse_mode: parse_mode, text: text }
  //   )
  // };

  // fetch(`https://api.telegram.org/bot${token}/sendMessage`, requestOptionsPush)
  //   .then(response => response.json())
  //   .then(response => {
  //     console.log(response);
  //   });

})()