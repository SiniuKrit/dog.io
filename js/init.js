var clickStatus = true;
// Отменят клики в указанном временном диапазоне
function clickStatusAction(time1) {
    clickStatus = false;
    time1 = time1 || 400;
    setTimeout(function () {
        clickStatus = true;
    }, time1);
}

// Функция проверяет существование DOM элемента
jQuery.fn.exist = function () {
    'use strict';
    var exist;
    if (this.length >= 1) {
        exist = true;
    } else {
        exist = false;
    }
    return exist;
};

// Ограничение при множественном вызове функции (тротл)
function throttle(funcName, silenceTime, lastSend) {
    // funcName - имя вызываемой функции
    // silenceTime - ограничение следующего вызова, number (ms)
    // lastSend - вызывать ли после ограничение если во время него был запрос, boolean
    var throttling = false,
        funcArguments,
        funcThis;
    if (typeof lastSend === 'undefined') {
        lastSend = true;
    }
    function throttleBody() {
        if (throttling) {
            funcArguments = arguments;
            funcThis = this;
            return;
        }
        funcName.apply(this, arguments);
        throttling = true;
        setTimeout(function () {
            throttling = false;
            if (funcArguments && lastSend) {
                throttleBody.apply(funcThis, funcArguments);
                funcArguments = funcThis = undefined;
            }
        }, silenceTime);
    }
    return throttleBody;
}

// Ширина окна браузера в переменной
var WiW = window.innerWidth;
function wiwCalc() {
    WiW = window.innerWidth;
}
$(window).on('resize', throttle(wiwCalc, 200, true));

// Открыть бургерное меню
function burgerMenuOpen() {
    if (!$('body').hasClass('burgerDelay')) {
        $('body').addClass('burgerDelay');
        setTimeout(function () {
            $('body').addClass('burgerOpen');
        }, 10);
    }
}

// Закрыть бургерное меню
function burgerMenuClose() {
    if ($('body').hasClass('burgerDelay')) {
        $('body').removeClass('burgerOpen');
        setTimeout(function () {
            $('body').removeClass('burgerDelay');
        }, 400);
    }
}

// Открыть выпадающее меню
function mainMenuOpen($a) {
    if (!$a.hasClass('active')) {
        $a.addClass('active').find('ul').stop(false, false).slideDown(400);
    }
}

// Закрыть выпадающее меню
function mainMenuClose($a) {
    if ($a.hasClass('active')) {
        $a.removeClass('active').find('ul').stop(false, false).slideUp(400);
    }
}

// Вызов модального окна по его id
function modalShowDob($id) {
    if ($('body').hasClass('modal-open')) {
        $('.modal.show').modal('hide');
        setTimeout(function () {
            $($id).modal('show');
        }, 400);
    } else {
        $($id).modal('show');
    }
}

// Динамическое создание и вставка видео (только mp4)
function videoCreate(videoParent, videoUrl) {
    var videoElement = document.createElement('video'),
    videoSource = document.createElement('source');
    videoElement.controls = 'true';
    videoElement.autoplay = 'true';
    videoSource.type = 'video/mp4';
    videoSource.src = videoUrl;
    videoElement.appendChild(videoSource);
    videoParent.appendChild(videoElement);
}

// Количество знаков после запятой
// n - число для узнавания (строка)
function afterDotCounter(n) {
    n = (typeof n == 'string') ? n : n.toString();
    if (n.indexOf('e') !== -1) return parseInt(n.split('e')[1]) * -1;
    var separator = (1.1).toString().split('1')[1];
    var parts = n.split(separator);
    return parts.length > 1 ? parts[parts.length - 1].length : 0;
}

// Анимация чисел
// elementClass - класс элемента где находится только число (строка)
function numberAnimate(elementClass) {
    $(elementClass).each(function () {
        var a = $(this).data('number-animate') || $(this).text(),
            b = afterDotCounter(a);
        $(this).prop('Counter', 0).animate({
            Counter: a
        }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
                $(this).text(now.toFixed(b));
            }
        });
    });
}

// Создание Iframe GoogleMap
function createGoogleMapIframe(locationUrl, width = 600, height = 450) {
    const iframe = document.createElement('iframe');
    iframe.src = locationUrl;
    iframe.width = width;
    iframe.height = height;
    iframe.style.border = '0';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    return iframe;
}

$(function () {

    // Swiper
    if ($('.jsSwiper1').exist()) {
        $('.jsSwiper1').each(function () {
            if (!$(this).hasClass('swiper-initialized')) {
                var $this = $(this),
                    swiper = new Swiper(this, {
                    loop: true,
                    effect: 'fade',
                    autoplay: {
                        delay: 5000
                    },
                    navigation: {
                        nextEl: $this.find('.swiper-button-next')[0],
                        prevEl: $this.find('.swiper-button-prev')[0]
                    }
                });
            }
        });
    }
    if ($('.jsSwiper2').exist()) {
        $('.jsSwiper2').each(function () {
            if (!$(this).hasClass('swiper-initialized')) {
                var $this = $(this),
                    swiper = new Swiper(this, {
                    slidesPerView: "auto",
                    freeMode: true,
                    spaceBetween: 15,
                    navigation: {
                        nextEl: $this.closest('.jsCardSliderCon').find('.swiper-button-next')[0],
                        prevEl: $this.closest('.jsCardSliderCon').find('.swiper-button-prev')[0]
                    },
                    breakpoints: {
                        992: {
                            slidesPerView: 3,
                            freeMode: false,
                            spaceBetween: 30
                        }
                    }
                });
            }
        });
    }
    if ($('.jsSwiper3').exist()) {
        $('.jsSwiper3').each(function () {
            if (!$(this).hasClass('swiper-initialized')) {
                var $this = $(this),
                    swiper = new Swiper(this, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    autoplay: {
                        delay: 5000
                    },
                    navigation: {
                        nextEl: $this.closest('.jsCardSliderCon').find('.swiper-button-next')[0],
                        prevEl: $this.closest('.jsCardSliderCon').find('.swiper-button-prev')[0]
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                            freeMode: false,
                            spaceBetween: 20
                        },
                        992: {
                            slidesPerView: 3,
                            freeMode: false,
                            spaceBetween: 30
                        }
                    }
                });
            }
        });
    }
    if ($('.jsSwiper4').exist()) {
        $('.jsSwiper4').each(function () {
            if (!$(this).hasClass('swiper-initialized')) {
                var $this = $(this),
                    swiper = new Swiper(this, {
                    slidesPerView: "auto",
                    freeMode: true,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: $this.closest('.jsCardSliderCon').find('.swiper-button-next')[0],
                        prevEl: $this.closest('.jsCardSliderCon').find('.swiper-button-prev')[0]
                    },
                    breakpoints: {
                        992: {
                            slidesPerView: 2,
                            freeMode: false,
                            spaceBetween: 30
                        }
                    }
                });
            }
        });
    }
    if ($('.jsSwiper5').exist()) {
        $('.jsSwiper5').each(function () {
            if (!$(this).hasClass('swiper-initialized')) {
                var $this = $(this),
                swiper = new Swiper(this, {
                    loop: true,
                    effect: 'fade',
                    /*autoplay: {
                        delay: 5000
                    },*/
                    pagination: {
                        clickable: true,
                        el: $this.closest('.jsCardSliderCon').find('.swiper-pagination')[0]
                    },
                    navigation: {
                        nextEl: $this.closest('.jsCardSliderCon').find('.swiper-button-next')[0],
                        prevEl: $this.closest('.jsCardSliderCon').find('.swiper-button-prev')[0]
                    }
                });
            }
        });
    }
    var breakpoint992 = window.matchMedia('(min-width: 992px)');
    if ($('.jsSwiperCardHidden').exist()) {
        $('.jsSwiperCardHidden').each(function () {
            var $this = $(this),
                swiper,
                breakpointChecker = function () {
                if (breakpoint992.matches === true) {
                    if (swiper !== undefined) {
                        swiper.destroy(true, true);
                    }
                    return;
                } else if (breakpoint992.matches === false) {
                    return enableSwiper();
                }
            },
                enableSwiper = function () {
                swiper = new Swiper ($this[0], {
                    slidesPerView: "auto",
                    freeMode: true,
                    spaceBetween: 20
                });
            };
            breakpoint992.addListener(breakpointChecker);
            breakpointChecker();
        });
    }




















    //Index tab
    $('.indexMainServiceTabNav .nav-link').on( 'mouseenter click', function () {
        if (WiW >= 992 && !$(this).next('.collapse').hasClass('show')) {
            $(this).tab('show');
            $(this).closest('.indexMainServiceTabNav').find('.collapse').removeClass('show');
            $(this).next('.collapse').addClass('show');
        }
    });
    $('.indexMainServiceTabNav .nav-link').on( 'click', function () {
        if (WiW < 992 && !$(this).next('.collapse').hasClass('show') && clickStatus) {
            clickStatusAction();
            $(this).tab('show');
            $(this).closest('.indexMainServiceTabNav').find('.collapse').collapse('hide');
            $(this).next('.collapse').collapse('show');
        }
    });

    // Видео с превью
    var videoCount = 0;
    $('.jsVideoPreviewButton').on('click', function (e) {
        e.preventDefault();
        var videoUrl1 = $(this).data('video-url'),
            videoParent = $(this).closest('.jsVideoPreview')[0];
        if (videoUrl1.includes('?v=')) {
            videoUrl1 = videoUrl1.split('?v=')[1];
            console.log(videoUrl1);
        }
        $(this).closest('.jsVideoPreview').find('.jsVideoPreviewHide').fadeOut(400);
        if ($(this).data('video-url-type') === 'youtube') {

            if (!videoCount) {
                var tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            var videoId = 'youtubeVideo' + videoCount;
            videoCount++;

            var videoDiv = document.createElement('div');
            videoDiv.id = videoId;
            videoParent.appendChild(videoDiv);

            var player;
            if (!(+videoCount - 1)) {
                window.onYouTubeIframeAPIReady = function () {
                    player = new YT.Player(videoId, {
                        height: '360',
                        width: '640',
                        videoId: videoUrl1,
                        controls: '0',
                        playerVars: {
                            'rel': 0
                        },
                        events: {
                            'onReady': onPlayerReady
                        }
                    });
                }
            } else {
                player = new YT.Player(videoId, {
                    height: '360',
                    width: '640',
                    videoId: videoUrl1,
                    controls: '0',
                    playerVars: {
                        'rel': 0
                    },
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            }
            function onPlayerReady(event) {
                event.target.playVideo();
            }
        } else {
            videoCreate(videoParent, videoUrl1);
        }
    });

    // Навигация
    var $headerMainBody = $('.headerMainBody');
    setTimeout(function () {
        $headerMainBody.addClass('animated');
    }, 10);
    function navPos() {
        var a = +$(window).scrollTop();
        if (!$headerMainBody.hasClass('headerMainBodyFixed') && a >= 50) {
            console.log('добавляем');
            $headerMainBody.addClass('headerMainBodyFixed');
        } else if ($headerMainBody.hasClass('headerMainBodyFixed') && a < 50) {
            console.log('удаляем');
            $headerMainBody.removeClass('headerMainBodyFixed');
        }
    }
    navPos();
    $(window).scroll(throttle(navPos, 200, true));

    // Аккордион
    $('.jsAccorCon').each(function () {
        var $this = $(this);
        $this.on('hide.bs.collapse', function ($el) {
            $($el.target).closest('.jsAccorBox').removeClass('active');
        });
        $this.on('show.bs.collapse', function ($el) {
            $($el.target).closest('.jsAccorBox').addClass('active');
        });
    });

    // modalVideo
    $('#modalVideo').on( 'show.bs.modal', function (e) {

        var videoUrl1 = $(e.relatedTarget).data('video-url'),
            videoParent = $(this).find('.jsModalVideoCon')[0];
        if ($(e.relatedTarget).data('video-url-type') === 'youtube') {

            if (!videoCount) {
                var tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            var videoId = 'youtubeVideo' + videoCount;
            videoCount++;

            var videoDiv = document.createElement('div');
            videoDiv.id = videoId;
            videoParent.appendChild(videoDiv);

            var player;
            if (!(+videoCount - 1)) {
                window.onYouTubeIframeAPIReady = function () {
                    player = new YT.Player(videoId, {
                        height: '360',
                        width: '640',
                        videoId: videoUrl1,
                        controls: '0',
                        playerVars: {
                            'rel': 0
                        },
                        events: {
                            'onReady': onPlayerReady
                        }
                    });
                }
            } else {
                player = new YT.Player(videoId, {
                    height: '360',
                    width: '640',
                    videoId: videoUrl1,
                    controls: '0',
                    playerVars: {
                        'rel': 0
                    },
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            }
            function onPlayerReady(event) {
                setTimeout(function () {
                    event.target.playVideo();
                }, 400 );
            }
        } else {
            videoCreate(videoParent, videoUrl1);
        }
    });
    $('#modalVideo').on( 'hide.bs.modal', function (e) {
        var $iframe = $(this).find('iframe')[0].contentWindow;
        $iframe.postMessage(
            '{"event":"command","func":"destroy","args":""}',
            "*"
        );
        $(this).find('.jsModalVideoCon')[0].textContent = '';
    });

    // Появление числа
    $('.jsNumberAnimate').observe({
        'observed': function () {
            numberAnimate(this);
        }
    });

    // Проект таб видео
    var projVideoTabFirst = 0;
    $('#projVideoButton').on( 'shown.bs.tab', function (e) {
        var videoParent = e.target.ariaControlsElements[0];
        if (!videoCount) {
            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        if (!projVideoTabFirst) {
            var videoId = 'youtubeVideo' + videoCount;
            videoCount++;
            var videoUrl1 = $(videoParent).data('video-url'),
                videoDiv = document.createElement('div');
            videoDiv.id = videoId;
            videoParent.appendChild(videoDiv);
            var player;
            if (!(+videoCount - 1)) {
                window.onYouTubeIframeAPIReady = function () {
                    player = new YT.Player(videoId, {
                        height: '360',
                        width: '640',
                        videoId: videoUrl1,
                        controls: '0',
                        playerVars: {
                            'rel': 0
                        },
                        events: {
                            'onReady': onPlayerReady
                        }
                    });
                }
            } else {
                player = new YT.Player(videoId, {
                    height: '360',
                    width: '640',
                    videoId: videoUrl1,
                    controls: '0',
                    playerVars: {
                        'rel': 0
                    },
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            }
            function onPlayerReady(event) {
                event.target.playVideo();
            }
            projVideoTabFirst++;
        } else {
            var $iframe = $(videoParent).find('iframe')[0].contentWindow;
            $iframe.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
            );
        }
    });
    $('#projVideoButton').on( 'hide.bs.tab', function (e) {
        var videoParent = e.target.ariaControlsElements[0];
        var $iframe = $(videoParent).find('iframe')[0].contentWindow;
        $iframe.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
        );
    });

    // Проект таб карта
    var projMaoTabFirst = 0;
    $('#projMapButton').on( 'shown.bs.tab', function (e) {
        if (!projMaoTabFirst) {
            var videoParent = e.target.ariaControlsElements[0];
                videoUrl1 = $(videoParent).data('map-url'),
                mapIframe = createGoogleMapIframe(videoUrl1);
            videoParent.appendChild(mapIframe);
            projMaoTabFirst++;
        }
    });

    // Кнопка бургера
    $('.jsNavTrigger').on('click', function (e) {
        e.preventDefault();
        if (clickStatus) {
            clickStatusAction();
            if ($('body').hasClass('burgerDelay')) {
                burgerMenuClose();
            } else {
                burgerMenuOpen();
            }
        }
    });

    // Фон модального меню
    $('.headerMainMobBg').on('click', function (e) {
        if (clickStatus) {
            clickStatusAction();
            if ($('body').hasClass('burgerDelay')) {
                burgerMenuClose();
            }
        }
    });

    // Якорь
    var anchorStatus = true;
    $('.jsAnchor').on('click', function (e) {
        e.preventDefault();
        var anchorId = $(this).attr('href');
        if (WiW >= 1200 && anchorStatus && $(anchorId).exist()) {
            anchorStatus = false;
            $('html, body').animate({scrollTop: $(anchorId).offset().top}, 1000);
            setTimeout(function () {
                anchorStatus = true;
            }, 1000);
        } else if (anchorStatus && $(anchorId).exist() && clickStatus) {
            anchorStatus = false;
            clickStatusAction();
            burgerMenuClose();
            $('html, body').animate({scrollTop: $(anchorId).offset().top}, 1000);
            setTimeout(function () {
                anchorStatus = true;
            }, 1000);
        }
    });

    // jsNavDropdown
    $('.jsNavDropdown').on( 'mouseenter', function () {
        if (WiW >= 1200) {
            mainMenuOpen($(this).closest('.headerMainNavSubCon'));
        }
    });
    $('.headerMainNavSubCon').on( 'mouseleave', function () {
        if (WiW >= 1200) {
            mainMenuClose($(this));
        }
    });
    $('.jsNavDropdown').on( 'click', function (e) {
        e.preventDefault();
        if (WiW < 1200) {
            var $headerNavSub = $(this).closest('.headerMainNavSubCon');
            if ($headerNavSub.hasClass('active')) {
                mainMenuClose($headerNavSub);
            } else {
                mainMenuOpen($headerNavSub);
            }
        }
    });
});