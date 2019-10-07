window.onload = function () {
    slides = new Slides('slides');
    slides.startSlides();    
};

function Slides(id) {
        this.id = id;
        this.pointers = [];
        this.slides = [];
        this.counter = 0;
        this.counter2 = "";
        this.interval = [];
        this.toggle = "TRUE";
        
        this.startSlides = function () {
            var wrapper, counter, slides, pointers, i, slide, pointer;
            counter = this.counter;
            wrapper = document.getElementById(id).firstElementChild;
            this.pointer = wrapper.nextElementSibling;
            slides = wrapper.children;
            pointers = this.pointer.children;
            
            for (i = 0; i < slides.length; i = i + 1) {
                slide = slides[i];
                pointer = pointers[i];
                this.slides.push(slide);
                
                
                this.pointers.push(pointer);
                
            }
            this.setlistener();
            this.addClass(this.slides[counter], "fchild");
            this.addClass(this.pointers[counter], "active");
            this.slideOut(counter);
            this.interval[0]= setTimeout(() => this.removeClass(this.slides[counter], "fchild"), 5900);
            this.counter++;
            this.toggleInterval();
        }
        this.toggleInterval = function () {
            var i;
            if (this.toggle=="TRUE") {
                this.interval [1] = setInterval(() => this.nextSlide(),5400); 
                this.toggle="FALSE";
                return;
            } 
            if (this.toggle=="FALSE") {
                for(i = 0; i < this.interval.length; ++i){
                    clearInterval(this.interval[i]);
                }
                this.toggle="TRUE";return;
            }
        }
        this.nextSlide = function () {
            var counter= this.counter;
            this.slideIn(counter);
            this.slideOut(counter, null);
            if(this.counter == this.slides.length -1){ 
                this.counter=0;
            }else{
                this.counter++;
            }
        }
        this.slideIn= function(counter){
            this.addClass(this.slides[counter], "slideTop");
            this.addClass(this.slides[counter], "slideI");
            this.addClass(this.pointers[counter], "active");
        }
        this.slideOut = function(counter, speed){
            if(speed){
                setTimeout(() => this.removeClass(this.slides[counter], "fchild"), 400);
                this.addClass(this.slides[counter], "slideO");
                this.removeClass(this.slides[counter], "slideTop");
                this.removeClass(this.slides[counter], "slideI");
                this.removeClass(this.pointers[counter], "active");
                setTimeout(() => this.removeClass(this.slides[counter], "slideO"), 400);
            }else{
                
                this.interval[2] = setTimeout(() => this.addClass(this.slides[counter], "slideO"), 5400);
                this.interval[3] = setTimeout(() => this.removeClass(this.slides[counter], "slideTop"), 5900);
                this.interval[4] = setTimeout(() => this.removeClass(this.slides[counter], "slideI"),5700);
                this.interval[5] = setTimeout(() => this.removeClass(this.slides[counter], "slideO"),5800);
                this.interval[6] = setTimeout(() => this.removeClass(this.pointers[counter], "active"), 5400);
                this.interval[7] = setInterval(() => this.removeClass(this.slides[counter], "fchild"), 5400);
            }
           
        }
        this.setlistener = function () {
            var pointer, i = 0;
            var obj1 =this;
            var pointers = this.pointers;
            
            for(i=0; i<this.pointers.length; i++){
               
                this.pointers[i].onclick=function(){
                    var index=i;
                    var obj =obj1;
                    return function(){
                        var counter;
                        
                        if(obj.counter == 0){
                            counter=3;
                        }else{
                            counter = obj.counter-1;
                        }
                
                        if(counter == index){ return;}
                        obj.toggleInterval();
                        obj.slideOut(counter, 1);
                        obj.counter = index;
                        obj.nextSlide();
                        obj.toggleInterval();
                    }
                }()
                
            }
            this.pointer.onmouseenter=function () {
                var obj =obj1;
                var counter;
                return function(){
                    
                    if(obj.counter == 0){
                        counter=3;
                    }else{
                        counter = obj.counter-1;
                    }
                    
                    obj.toggle = "FALSE";
                    obj.toggleInterval(); 
                    obj.addClass(obj.slides[counter], "fchild");
                    obj.addClass(obj.pointers[counter], "active");
                }
            }();
            this.pointer.onmouseleave=function () {
                var obj =obj1;
                var counter;
                return function (){
                    if(obj.counter == 0){
                        counter=3;
                    }else{
                        counter = obj.counter-1;
                    }
                    obj.slideOut(counter, null);
                    obj.interval[8] = setTimeout(() => obj.removeClass(obj.slides[counter], "fchild"), 5400);
                    obj.toggle = "TRUE";
                    obj.toggleInterval(); 
                }
            }();
        }
        
        
        this.hasClass = function (element, className) {
            if(element.classList){
                return element.classList.contains(className);
            }
            return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
        this.addClass = function (element, className) {
            if (element.classList) {
                element.classList.add(className);
            }else if (!this.hasClass(element, className)) {
                element.className +=" " + className;
            }
        }
        this.removeClass = function (element, className){
            element.className= element.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), " ");
            
        }
        
    }