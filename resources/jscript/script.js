class Beetech{
    constructor () {
        this.window = $(window);
        this.nav= $('.header .nav ul li a');
        this.setEventHandler();
    }
    
    setEventHandler () {
        window.onerror = this.errorHandler;
        this.window.on("scroll resize", this.scroll());
        this.window.trigger("scroll");
        this.scroll();
        $('.header .nav ul li a').map((num, ele)=>{
            ele.onclick=()=>{
                ele= $(ele);
                let segments = $('.content >div:not(.skills)');
                let attr =ele.attr('href');
                $('.header .nav ul .active').removeClass('active');
                ele.parent('li').addClass('active');
                if (attr=='#h') {
                    this.scrollNav($(".slider").offset());
                }
                if (attr=='#a') {
                    this.scrollNav($('.content .about').offset());
                }
                if (attr=='#s') {
                    this.scrollNav($('.content .services').offset());
                }
                if (attr=='#p') {
                    this.scrollNav($('.content .projects').offset());
                }
                if (attr=='#t') {
                    this.scrollNav($('.content .team').offset());
                }
                if (attr=='#c') {
                    this.scrollNav($('.content .contact').offset());
                    setTimeout(()=>{
                        $('.header .nav ul .active').removeClass('active');
                        ele.addClass('active')
                    },500);
                }
            }
        });
        $('.slider div a').click(()=>{
            this.scrollNav($('.content .about').offset());
        });
        $('.arrow a').click(()=>{
            this.scrollNav($(".slider").offset());
        });
        $('.header >a[href="#0"]').click(()=>{
            $('.header .nav').toggleClass('true');
            $('.header >a[href="#0"] i').delay(10000).toggleClass('fa-list-alt');
            $('.header >a[href="#0"] i').delay(10000).toggleClass('fa-times');
        });
        $('.screen >div >a').click(()=>{
            $('.screen img').removeAttr('src');
            $('.modal, .screen').removeClass('show');
            $('.modal, .screen').addClass('hide');
            
        })
        $('.projects .cont a').click((e)=>{
            let ele = $(e.target);
            let imgUrl = ele.parent().next().find('img').attr('src');
            $('.screen img').attr('src',imgUrl);
            $('.modal, .screen').removeClass('hide');
            $('.modal, .screen').addClass('show');
            
        });
        $('form').submit(()=>{
            
            let name = this.clean($('form input[name="name"]').val());
            let email = this.clean($('form input[name="email"]').val(), 'mail');
            let msg = this.clean($('form textarea').val());
            
            if (name == "") {
                $('form input[name="name"]').css('border-color', 'red');
            } else if (email =="") {
                $('form input[name="name"]').css('border-color', '#B8860B');
                $('form input[name="email"]').css('border-color', 'red');
            } else if (msg == "") {
                $('form input[name="name"]').css('border-color', '#B8860B');
                $('form input[name="email"]').css('border-color', '#B8860B');
                $('form textarea').css('border-color', 'red');
            } else {
                $('form input[name="name"]').css('border-color', '#B8860B');
                $('form input[name="email"]').css('border-color', '#B8860B');
                $('form textarea').css('border-color', '#B8860B');
                let param = 'name='+name+'&email='+email+'&msg='+msg;
                let bee =  new AjaxRequest('./resources/php/Ajax.php','POST',param)
                bee.setLoader(this.loader);
                bee.start();
            }
        });
        let nameInput =document.contact.name;
        nameInput.addEventListener('invalid', (e)=>{
            if ( nameInput.validity.valueMissing) {
                e.target.setCustomValidity('Enter Your Name Here');
            } else if (!nameInput.validity.valid) {
                e.target.setCustomValidity('Enter Your Name Here');
            }
            
            nameInput.addEventListener('input', (e)=>{
                e.target.setCustomValidity('');
            });
        }, false);
    }
    
	loader (boo) {
        if (boo) {
            $('.contact .suc p').text('Message received ...will get back to you asap!');
            $('.contact .suc i').css('color','green');
            $('.contact .cont,.contact .sub-title p').css('opacity', '0');
            $('.contact .suc .fa-spinner').fadeOut(500);
        }
        if(!boo){
             $('.contact .suc').addClass('true');
        }
    }	
    
    errorHandler (message, url, line) {
		let msg = "Sorry, an error was encountered.\n\n";
		msg += "Error: " + message + "\n";
		msg += "URL: " + url + "\n";
		msg += "Line: " + line + "\n\n";
		msg += "Click OK to continue.\n\n";
		console.log(msg);
        location.reload(true);
        return true;					
    }
    
    clean (input,type="") {
        input = input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        input = input.replace(/^\s+|\s+$/g, "");
        
        if (type == "int") {
            let regex = /^[0-9]+$/;
            if (!regex.test(input)) {
                input = ""
            }
        }
        
        if (type == "mail") {
            input = (input == "") ? 
                "":
                (!((input.indexOf(".") > 0) &&  (input.indexOf("@") > 0)) || /[^a-zA-Z0-9.@_-]/.test(input)) ? 
                    "" :
                    input ;
        }
        return input;
    
    }

    scrollNav (offset) {
        $('html, body').animate({
			scrollTop: offset.top,
			scrollLeft: offset.left
		});
    }
    
    scroll () {
        return ()=>{
            let $element,element_height,element_top_position;
            let slider =$(".slider");
            let winHeight = this.window.height();
            let winTopPos = this.window.scrollTop();
            let winBottomPos = (winTopPos + winHeight);
            
            let slider_height = slider.outerHeight();
            let slider_top_position =slider.offset().top;
            let slider_bottom_position = (slider_top_position + slider_height);
            if ( (slider_bottom_position  >= winTopPos+400) && (slider_top_position  <= winBottomPos)) {
                $('.body >div:first-child, .line.head, .header .nav ul li:not(.active) a').removeClass('true')
            } else {
                $('.body >div:first-child, .line.head, .header .nav ul li a').addClass('true')
            }
            if (winTopPos  >= slider_top_position +200) {
                    $('.header .nav ul .active').removeClass('active');
                    $('.header .nav li a[href="#h"]').parent('li').addClass('active');
                   
            }
            //console.log(winTopPos +" : "+$(".content >div").offset().top);
            let segments = $(".content >div");
            $.each(segments, function () {
                let $element = $(this);
                let element_height = $element.outerHeight(); 
                let element_top_position = $element.offset().top;
                let element_bottom_position = (element_top_position + element_height);
                
                //check to see if this current container is within viewport
                if ((element_bottom_position >= winTopPos) &&
                    (element_top_position+150 <= winBottomPos)) {
                    if ($element.attr('id') == 'about') { 
                        $element.children('div').addClass('in-view');
                    }
                    if ($element.attr('id') == 'services') { 
                        $element.children('div').children('div').addClass('in-view');
                    }
                    if ($element.attr('id') == 'skills') { 
                        $('.skills .cont .top').removeClass('fill');
                    }
                    if ($element.attr('id') == 'projects') {  
                        $element.children('div').addClass('in-view');
                    }
                    if ($element.attr('id') == 'team') {
                        $element.children('div').addClass('in-view');
                    }
                    if ($element.attr('id') == 'contact') { 
                        $element.children('div').addClass('in-view');
                    }
                    
                    
                    if ( $element.attr('id') == 'skills' || $element.attr('id') == 'projects' || $element.attr('id') == 'team' || $element.attr('id') == 'contact') {
                            $('.arrow').addClass('show');  
                    }else{

                           $('.arrow').removeClass('show');
                    }
                    
                } else {
                  //$element.children('div').removeClass('in-view');
                }
                if (winTopPos + 200 >= element_top_position) {
                    $('.header .nav ul .active').removeClass('active');
                    $('.header .nav li a[href="#'+$element.attr('id').charAt(0)+'"]').parent('li').addClass('active');
                   
                } 
                
            });
            
        }
    }
    
}

$(document).ready(()=>{
    bee = new Beetech(); 
});