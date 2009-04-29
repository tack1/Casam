Element.addMethods({
        setWidth: function(element, width) {
                element = $(element);
                if (typeof width == "number")
                        width = width + "px";
                element.setStyle({width: width});
                return element;
        },

        setHeight: function(element, height) {
                element = $(element);
                if (typeof height == "number")
                        height = height + "px";
                element.setStyle({height: height});
                return element;
        }});

function popupIFrame(url,width,height){
	if(!width)width=500;
	if(!height)height=300;
	
	var iF = new Element('iframe', {'src':url});
	$('popup').update(iF);
	
	$('popup').setWidth(width);
	$('popup').setHeight(height);
	$('popup').setStyle({
		zIndex:9999,
		top:((document.viewport.getHeight() - $('popup').getHeight())/2)+'px',
		left:((document.viewport.getWidth() - $('popup').getWidth())/2)+'px'
		});
	
}

function closePopup(){
	$('popup').setWidth(0);
	$('popup').setHeight(0);
	$('popup').setStyle({
		zIndex:0,
		top:'0px',
		left:'0px'
		});

}
