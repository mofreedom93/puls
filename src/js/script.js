
$(document).ready(function() {
    $('.carousel__inner').slick({
        speed: 700,
/*         adaptiveHeight: true, */
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          })
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back')

      /* Modal окна */

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
      });
      $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
      });

      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        });
      });

      /* Пишим код что бы правильно вводили данные в всплывающих окнах, плюс css что бы отображалось где была ошибка и т д  
            .error {
                border: 1px solid red;
            }
            label.error {
                border: none;
                text-align: center;
                margin-bottom: 15px;
            }  Это мы уже задаем стили в css*/

      function valideForms(form) {
        $(form).validate ({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Как мамка назвала?",
                    minlength: jQuery.validator.format("Пиши {0} символов")
                },
                phone: "Есть позвонить?",
                email: {
                    required: "Почта жи есть?",
                    email: "Голубям нужна твоя собака"
                }
            }
          });
      };

      valideForms('#consultation-form');
      valideForms('#consultation form');
      valideForms('#order form');

      $('input[name=phone]').mask("+7 (999) 999-99-99"); 

        /* создаем отправку email на почту когда люди заполняют форму в всплывающих окнах */

      $('form').submit(function(e) {
        e.preventDefault();

        if(!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');


            $('form').trigger('reset');
        });
        return false;
      });

      /* скрипт для стрелки скрола вверх */

      $(window).scroll(function(){
        if ($(this).scrollTop() > 1000) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
      });

      /* скрипт для стрелки плавного скрола вверх */

      $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
      });

      new WOW().init();

  });