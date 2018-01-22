$(document).ready(function() {

    // Активация пунктов меню при прокрутке лендинга https://getbootstrap.com/docs/3.3/javascript/#scrollspy
    $('body').scrollspy({ target: '#navbar' });

    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh')
    });

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	// $("a.scroll").click(function() {
	// 	$.scrollTo($(".div"), 800, {
	// 		offset: -90
	// 	});
	// });

    $("a.scroll_request").click(function() {
        $.scrollTo($("#request"), 800, {
            offset: -10
        });
    });

    $("a.scroll_feedback").click(function() {
        $.scrollTo($("#feedback"), 800, {
            offset: -10
        });
    });

    $("a.scroll_home").click(function() {
        $.scrollTo($("#header"), 800, {
            offset: -10
        });
    });

    $("a.scroll_parents").click(function() {
        $.scrollTo($("#parents"), 800, {
            offset: -10
        });
    });

    $("a.scroll_puppies").click(function() {
        $.scrollTo($("#puppies"), 800, {
            offset: -10
        });
    });

    $("a.scroll_how_to_buy").click(function() {
        $.scrollTo($("#how_to_buy"), 900, {
            offset: -5
        });
    });

    $("a.scroll_contacts").click(function() {
        $.scrollTo($("#contacts"), 800, {
            offset: -10
        });
    });

	//Анимация элементов
    // Подробнее по ссылке http://mynameismatthieu.com/WOW/docs.html
    wow = new WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       false,
            live:         true        // default
        }
    )
    wow.init();

	//Карусель Bootstrap
    $('.carousel').carousel({
        // wrap:false,
        pause:null,
        interval: false,
    });

	//Каруселька
	//Документация: https://owlcarousel2.github.io/OwlCarousel2/
    var owl = $('.owl-carousel').owlCarousel({
        loop:true,
		// dots:true,
        margin: 30,
        autoplay:false,
        autoplayTimeout:2000,
		// nav:true,
        autoplayHoverPause:true,
        // navText:['<span>Предыдущий</span>','<span>Следующий</span>'],
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });

    $('.play').on('click',function(){
        owl.trigger('play.owl.autoplay',[1000])
    })
    $('.stop').on('click',function(){
        owl.trigger('stop.owl.autoplay')
    });

    owl.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY>0) {
            owl.trigger('next.owl');
        } else {
            owl.trigger('prev.owl');
        }
        e.preventDefault();
    });

    // Переход с следующему элементу слайдера
    $('.owl-next').click(function() {
        owl.trigger('next.owl.carousel');
    });
    // Переход к предыдущему элементу слайдера
    $('.owl-prev').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl.trigger('prev.owl.carousel', [300]);
    });

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#feedback_form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("#feedback_form").serialize()
		}).done(function() {
			alert("Спасибо! Ваше сообщение отправлено. Мы свяжемся с Вами в ближайшее время.");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

    $("#request_form").submit(function() {
        $.ajax({
            type: "GET",
            url: "mail.php",
            data: $("#request_form").serialize()
        }).done(function() {
            alert("Спасибо за заявку! Мы свяжемся с Вами в ближайшее время.");
            setTimeout(function() {
                $.fancybox.close();
            }, 1000);
        });
        return false;
    });

    //Паралакс эффект
    // var st = $(this).scrollTop();
    // var tr = "transform:translate (0%, "+ st +"%);";
    // console.log(tr);
    //
    // $("#form_consultant").css( {"transform" :"translate (0%,"+ st +"%);"} );

    //Паралакс эффект
    // $(this).scroll(function () {
    //     var st = $(this).scrollTop();
    //     var tr = "transform : translate (0%, "+ st +"%);";
    //     console.log(tr);
    //
    //     $('.consult').css({tr});
    // });

    /***********************************************/

    // Эффекты рисования
    // Подробнее http://soulwire.github.io/sketch.js/

    // ----------------------------------------
    // Particle
    // ----------------------------------------

    function Particle( x, y, radius ) {
        this.init( x, y, radius );
    }

    Particle.prototype = {

        init: function( x, y, radius ) {

            this.alive = true;

            this.radius = radius || 10;
            this.wander = 0.15;
            this.theta = random( TWO_PI );
            this.drag = 0.92;
            this.color = '#fff';

            this.x = x || 0.0;
            this.y = y || 0.0;

            this.vx = 0.0;
            this.vy = 0.0;
        },

        move: function() {

            this.x += this.vx;
            this.y += this.vy;

            this.vx *= this.drag;
            this.vy *= this.drag;

            this.theta += random( -0.5, 0.5 ) * this.wander;
            this.vx += sin( this.theta ) * 0.1;
            this.vy += cos( this.theta ) * 0.1;

            this.radius *= 0.96;
            this.alive = this.radius > 0.5;
        },

        draw: function( ctx ) {

            ctx.beginPath();
            ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };

    // ----------------------------------------
    // Example
    // ----------------------------------------

    var MAX_PARTICLES = 280;
    var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];

    var particles = [];
    var pool = [];

    var demo = Sketch.create({
        container: document.getElementById( 'header' ),
        retina: 'auto'
    });

    demo.setup = function() {

        // Set off some initial particles.
        var i, x, y;

        for ( i = 0; i < 20; i++ ) {
            x = ( demo.width * 0.5 ) + random( -100, 100 );
            y = ( demo.height * 0.5 ) + random( -100, 100 );
            demo.spawn( x, y );
        }
    };

    demo.spawn = function( x, y ) {

        var particle, theta, force;

        if ( particles.length >= MAX_PARTICLES )
            pool.push( particles.shift() );

        particle = pool.length ? pool.pop() : new Particle();
        particle.init( x, y, random( 5, 40 ) );

        particle.wander = random( 0.5, 2.0 );
        particle.color = random( COLOURS );
        particle.drag = random( 0.9, 0.99 );

        theta = random( TWO_PI );
        force = random( 2, 8 );

        particle.vx = sin( theta ) * force;
        particle.vy = cos( theta ) * force;

        particles.push( particle );
    };

    demo.update = function() {

        var i, particle;

        for ( i = particles.length - 1; i >= 0; i-- ) {

            particle = particles[i];

            if ( particle.alive ) particle.move();
            else pool.push( particles.splice( i, 1 )[0] );
        }
    };

    demo.draw = function() {

        demo.globalCompositeOperation  = 'lighter';

        for ( var i = particles.length - 1; i >= 0; i-- ) {
            particles[i].draw( demo );
        }
    };

    demo.mousemove = function() {

        var particle, theta, force, touch, max, i, j, n;

        for ( i = 0, n = demo.touches.length; i < n; i++ ) {

            touch = demo.touches[i], max = random( 1, 4 );
            for ( j = 0; j < max; j++ ) {
                demo.spawn( touch.x, touch.y );
            }

        }
    };
});

