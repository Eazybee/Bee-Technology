class AjaxRequest{
    
    constructor(url,method='POST',params=''){
        this.url = url;
        this.method=method;
        this.params=params;
        
    }
    setLoader(loader){
        this.loader = loader;
    }
    start(){
        if(this.url.trim() != ""){
            this.loader(false);
            this.ajaxpage( this.url,this.method,this.params);  
        }
        
    }
    static init(){
        let request;
        try
        {
            request = new XMLHttpRequest()
        }
        catch(e1)
        {
                try
                {
                    request = new ActiveXObject("Msxml2.XMLHTTP")
                }
                catch(e2)
                {
                    try
                        {
                            request = new ActiveXObject("Microsoft.XMLHTTP")
                        }
                        catch(e3)
                        {
                            request = false
                        }
                }
        }
        return request;
    }
    
    ajaxpage(url,method,params){
        let loader =this.loader;
        let request = AjaxRequest.init();
        request.open(method, url, true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");

        request.onreadystatechange = function(){
            if (request.readyState == 4)
            {
                if (request.status == 200)
                {
                    if (request.responseText != null)
                    {  
                        if( request.responseText == "TRUE"){
                            loader(true);
                        }
                        console.log(request.responseText);
                    }

                }

           }
        }   
       
        request.send(params);
        
    
       
    }
}