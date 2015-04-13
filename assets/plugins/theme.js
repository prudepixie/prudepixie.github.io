'use strict';
var theme = function () {
    // prevent empty links
    // ---------------------------------------------------------------------------------------
    function handlePreventEmptyLinks() {
        $('a[href=#]').on('click', function(event) {
            event.preventDefault();
        });
    }

    //Slider
    // ---------------------------------------------------------------------------------------
    function handleSlider(){

        $('#scene').parallax();

    }


    //Navigation
    // ---------------------------------------------------------------------------------------
    function handleNavSlide() {
        $('.nav-menu-icon a').on( "click", function() { 
          if ($('.navigation').hasClass('slide')) {
              $('.navigation').removeClass('slide');
              $(this).removeClass('active');
          }else {
              $('.navigation').addClass('slide');
              $(this).addClass('active');
          }
          
            return false;
         
        });


            $(".scroll-to").on( "click", function(){
                $(".navigation").removeClass("slide");
                $(".nav-menu-icon a ").removeClass("active");
            });
 
    }




    // Smooth scrolling
    // ---------------------------------------------------------------------------------------
    function handleSmoothScroll(){

        $('.scroll-to').on('click', function() {
           // $('body').scrollspy('refresh');
           // var headerH = $('header[role="banner"]').outerHeight();
            var headerH = 0;
            $('.scroll-to').removeClass('active');
            $(this).addClass('active');
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top - headerH + 20 + 'px'
            }, {
                duration: 1200,
                easing: 'easeInOutExpo'
            });
            return false;
        });


    if (location.hash != '') {
            var hash = '#' + window.location.hash.substr(1);
            if (hash.length) {
                jQuery('html,body').delay(0).animate({
                    scrollTop: jQuery(hash).offset().top - 44 + 'px'
                }, {
                    duration: 1200,
                    easing: "easeInOutExpo"
                });
            }
        }


    }
    // Placeholdem
    // ---------------------------------------------------------------------------------------
    function handlePlaceholdem() {
        Placeholdem(document.querySelectorAll('[placeholder]'));
    }

    // preloader
    // ---------------------------------------------------------------------------------------
    $(window).load(function() {
        $('#status').fadeOut();
        $('#preloader').delay(200).fadeOut(100);
    });

    // contact form
    // ---------------------------------------------------------------------------------------
    function handleContactForm() {
        $('.submitContactbutton').on('click', function(e){               
            var form = $(this).closest('form');
            $(this).find('.loading').show();                      
            
            $.ajax({
                url: 'contact.php',
                type: "POST",
                data: form.serializeArray(),
                success: function (data) {

                    if( data == 'true'){
                        $('.contactmessages').removeClass('error').addClass('success').show();
                        $('.contactmessages').html('<div class="divider-black"></div><h3>Thank you!</h3><br/><p>Your message has been successfully sent. We will contact you very soon!</p>');
                    }else{
                        $('.contactmessages').removeClass('success').addClass('error').show();
                        $('.contactmessages').html('<div class="divider-black"></div><h3>Error!</h3><br/><p>Please fill in all of the required fields.</p>');
                    }                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('.contactmessages').removeClass('error').addClass('success').show();
                    $('.contactmessages').html('<div class="divider-black"></div><h3>Oooops!</h3><br/><p>Try again!</p>');
                }
            });
            $(this).find('.loading').fadeOut('1500');
            e.preventDefault();
        });        
    }
    // Sniffer
    // ---------------------------------------------------------------------------------------
    function handleSniffer() {
      
        var $target = $('#main_menu');
        if (Modernizr.mq('only screen and (max-width: 991px)')) {
            if($($target).hasClass('in')) {
                $($target).css("height", "0px");
                $($target).removeClass('in');
                $( "#mobile_nav_menu" ).prop( "checked", false );
            }
        } else {
            $($target).addClass('in');
            $( "#mobile_nav_menu" ).prop( "checked", true );
        }

      

        }

    //Mobile menu on left
    // ---------------------------------------------------------------------------------------
    function handleMobileMenuLeft() {
      $('#triggerforleft').sidr();
     // $('#triggerforleft2').sidr();
    }
    // prettyPhoto
    // ---------------------------------------------------------------------------------------
    function handlePrettyPhoto() {
       $('.litebox').liteBox({
              revealSpeed: 400,
              background: 'rgba(0,0,0,.8)',
              overlayClose: true
        });
    }

    function handlePrettyPhotoBlog() {
        $("a.prettyPhotoBlog").prettyPhoto({
            theme: 'dark_rounded',
            social_tools: false
        });
    }
     // Nicescroll
    // ---------------------------------------------------------------------------------------

    function handleNiceScroll() {
          
          $("html").niceScroll().hide();

    }       


    // Scroll totop button
    // ---------------------------------------------------------------------------------------
    function handleToTopButton() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1) {
                $('.to-top').css({bottom: '15px'});
            } else {
                $('.to-top').css({bottom: '-100px'});
            }
        });
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1) {
                $('.nav-menu-icon').css({position: 'fixed'});
            } else {
                $('.nav-menu-icon').css({position: 'relative'});
            }
        });       
        $('.to-top').on('click', function() {
            $('html, body').animate({scrollTop: '0px'}, 800);
            return false;
        });
    }

    // resize page
    // ---------------------------------------------------------------------------------------
    function resizePage() {
     //   $('.page').css('min-height', $(window).height());
        //$('#testimonials').trigger('refresh');
        $('.owl-carousel').trigger('refresh');
        $('.top_nav').trigger('refresh');
    }


    // INIT FUNCTIONS
    // ---------------------------------------------------------------------------------------
    return {
        onResize: function() {
            resizePage();
           // handleMobileMenuLeft();
           // handleSniffer();
        },
        init: function () {
            handlePreventEmptyLinks();
          //  handleNiceScroll();
            handleSmoothScroll();
            handlePlaceholdem();
           // handleSniffer();
            //handleMobileMenuLeft();
           // handleHexagon();
            handlePrettyPhoto();
            handlePrettyPhotoBlog();
            handleToTopButton();
            handleContactForm();
            handleNavSlide();
            handleSlider();
        },

        // Homepage Slider
        initHomeSlider: function () {
            $('#home3slider .owl-carousel').owlCarousel({
                autoplay: true,
                loop: true,
                dots: true,
                nav: false,
                navText: [
                    "<span class=''><i class='fa fa-angle-left'></i></span>",
                    "<span class=''><i class='fa fa-angle-left'></i></span>",
                ],
                responsive: {
                    0:    {items: 1},
                    240:  {items: 1},
                    320:  {items: 1},
                    479:  {items: 1},
                    768:  {items: 1},
                    1024:  {items: 1}                   
                }
            });
        },

        // Testimonial Slider
        initTestimonial: function () {
            $('.testimonial .owl-carousel').owlCarousel({
                autoplay: true,
                loop: true,
                dots: true,
                nav: false,
               navText: [
                    "<span class='btn btn-trans-grey trans-hover'><span class='mdi-navigation-arrow-back'></span></span>",
                    "<span class='btn btn-trans-grey trans-hover'><span class='mdi-navigation-arrow-forward'></span></span>",
                ],
                responsive: {
                    0:    {items: 1},
                    240:  {items: 1},
                    320:  {items: 1},
                    479:  {items: 1},
                    768:  {items: 1},
                    1024:  {items: 1}                   
                }
            });
        },
        initPartnerSlider: function () {
            $('.partners-carousel .owl-carousel').owlCarousel({
                autoplay: false,
                loop: true,
                margin: 55,
                items: 3,
                dots: true,
                lazyLoad: true,
                nav: false,
                navText: [
                    "<span class='btn btn-trans-grey trans-hover'><span class='mdi-navigation-arrow-back'></span></span>",
                    "<span class='btn btn-trans-grey trans-hover'><span class='mdi-navigation-arrow-forward'></span></span>",
                ],
                responsive: {
                    0:    {items: 1},
                    240:  {items: 1},
                    320:  {items: 1},
                    479:  {items: 1},
                    768:  {items: 2},
                    1024:  {items: 3}                   
                }
            });
        },

        // Protfolio shuffle
        initPortfolio: function () {
                 // init Isotope
                  var $container = $('.isotope').isotope({
                    itemSelector: '.element-item',
                   
                    getSortData: {
                      name: '.name',
                      symbol: '.symbol',
                      number: '.number parseInt',
                      category: '[data-category]',
                      weight: function( itemElem ) {
                        var weight = $( itemElem ).find('.weight').text();
                        return parseFloat( weight.replace( /[\(\)]/g, '') );
                      }
                    }
                  });

                  // filter functions
                  var filterFns = {
                    // show if number is greater than 50
                    numberGreaterThan50: function() {
                      var number = $(this).find('.number').text();
                      return parseInt( number, 10 ) > 50;
                    },
                    // show if name ends with -ium
                    ium: function() {
                      var name = $(this).find('.name').text();
                      return name.match( /ium$/ );
                    }
                  };

                  // bind filter button click
                  $('#filters').on( 'click', 'button', function() {
                    var filterValue = $( this ).attr('data-filter');
                    // use filterFn if matches value
                    filterValue = filterFns[ filterValue ] || filterValue;
                    $container.isotope({ filter: filterValue });
                  });

                  // bind sort button click
                  $('#sorts').on( 'click', 'button', function() {
                    var sortByValue = $(this).attr('data-sort-by');
                    $container.isotope({ sortBy: sortByValue });
                  });
                  
                  // change is-checked class on buttons
                  $('.button-group').each( function( i, buttonGroup ) {
                    var $buttonGroup = $( buttonGroup );
                    $buttonGroup.on( 'click', 'button', function() {
                      $buttonGroup.find('.is-checked').removeClass('is-checked');
                      $( this ).addClass('is-checked');
                    });
                  });


        },

        initChart:function(){
              $("#doughnutChart").drawDoughnutChart([
                { title: "Development",         value : 46,  color: "#e74c3c" },
                { title: "Branding",            value:  24,   color: "#f1c40f" },
                { title: "Designing",           value:  19,   color: "#3498db" },
                { title: "Marketing",           value : 11,   color: "#1dd2af" }
              ]);
        },  

        // Color Switcher
        initColorSwitcher:function(){

              $("#gear").on( "click", function() {
                  $(".color-switcher").toggleClass("sliding");            
              })

        },


        // Animation on Scroll
        initAnimation: function () {
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile == false) {
                $('*[data-animation]').addClass('animated');
                $('.animated').waypoint(function (down) {
                    var elem = $(this);
                    var animation = elem.data('animation');
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        if (animationDelay) {
                            setTimeout(function () {
                                elem.addClass(animation + ' visible');
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + ' visible');
                        }
                    }
                }, {
                    offset: $.waypoints('viewportHeight')
                    //offset: 'bottom-in-view'
                    //offset: '95%'
                });
            }
            // Refresh Waypoints on tab click / animation
           // $('#tabs-main li a[data-toggle="tab"]').on('shown.bs.tab', function () { $.waypoints('refresh'); });
        },



        // Google map
        initGoogleMap: function() {
            var map;
            function initialize() {

                //set your google maps parameters
                var latitude  = 49.246292,
                    longitude = -123.116226,
                    mapZoom  = 14;

                //google map custom marker icon
                var marker_url = 'assets/images/marker.png';

                //define the basic color of your map, plus a value for saturation and brightness
                var main_color = '#FDCB17',
                    saturation_value= -20,
                    brightness_value= 5;

                //we define here the style of the map
                var style= [ 
                    {
                        //set saturation for the labels on the map
                        elementType: "labels",
                        stylers: [
                            {saturation: saturation_value}
                        ]
                    },  
                    {   //poi stands for point of interest - don't show these lables on the map 
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [
                            {visibility: "off"}
                        ]
                    },
                    {
                        //don't show highways lables on the map
                        featureType: 'road.highway',
                        elementType: 'labels',
                        stylers: [
                            {visibility: "off"}
                        ]
                    }, 
                    {   
                        //don't show local road lables on the map
                        featureType: "road.local", 
                        elementType: "labels.icon", 
                        stylers: [
                            {visibility: "off"} 
                        ] 
                    },
                    { 
                        //don't show arterial road lables on the map
                        featureType: "road.arterial", 
                        elementType: "labels.icon", 
                        stylers: [
                            {visibility: "off"}
                        ] 
                    },
                    {
                        //don't show road lables on the map
                        featureType: "road",
                        elementType: "geometry.stroke",
                        stylers: [
                            {visibility: "off"}
                        ]
                    }, 
                    //style different elements on the map
                    { 
                        featureType: "transit", 
                        elementType: "geometry.fill", 
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    }, 
                    {
                        featureType: "poi",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "poi.government",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "poi.sport_complex",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "poi.attraction",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "poi.business",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "transit",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "transit.station",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "landscape",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                        
                    },
                    {
                        featureType: "road",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    }, 
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [
                            { hue: main_color },
                            { visibility: "on" }, 
                            { lightness: brightness_value }, 
                            { saturation: saturation_value }
                        ]
                    }
                ];

                //set google map options
                var mapOptions = {
                    zoom: mapZoom,
                    center: new google.maps.LatLng(latitude, longitude),
                    scrollwheel: false,
                    panControl: false,
                    zoomControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,                    
                    styles: style
                };
                //inizialize the map
                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                //add a custom marker to the map                
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    map: map,
                    visible: true,
                    icon: marker_url,
                });

                var zoomControlDiv = document.createElement('div');
                var zoomControl = new CustomZoomControl(zoomControlDiv, map);

                //insert the zoom div on the top left of the map
                map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
            }

            //add custom buttons for the zoom-in/zoom-out on the map
            function CustomZoomControl(controlDiv, map) {
                //grap the zoom elements from the DOM and insert them in the map 
                var controlUIzoomIn= document.getElementById('map-zoom-in'),
                    controlUIzoomOut= document.getElementById('map-zoom-out');
                controlDiv.appendChild(controlUIzoomIn);
                controlDiv.appendChild(controlUIzoomOut);

                // Setup the click event listeners and zoom-in or out according to the clicked element
                google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
                    map.setZoom(map.getZoom()+1)
                });
                google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
                    map.setZoom(map.getZoom()-1)
                });
            }

            google.maps.event.addDomListener(window, 'load', initialize);
        }
    };

}();
