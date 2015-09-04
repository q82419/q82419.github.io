function getFooterIconBackCSSString(img){
    return "url(" + img + ") no-repeat center";
}
function parsePx(w){
    return parseInt(w.replace("px", ""));
}
function constructFooter(footer, dataURL){
	$.ajax({
        url: dataURL,
        type: 'GET',
        dataType: 'xml',
        success: function(xml){
            var list = $(footer).append('<div></div>').find('div'),
                _style = $(xml).find("style"), 
                style = {},
                _itemmargin = _style.find("itemmargin").text(),
                _font = _style.find("textsize").text() + '/' + _style.find("height").text() + ' ' + _style.find("font").text(),
                _color = _style.find("color").text(),
                _background = _style.find("background").text(),
                _iconsize = _style.find("iconsize").text(),
                _radius = _style.find("radius").text(),
                entryCnt = 0;

            style["width"] = _style.find("listwidth").text();
            style["height"] = _style.find("height").text();
            style["padding"] = _style.find("padding").text();
            list.css(style);
            list.append('<div class="footertext">' + $(xml).find("data").find("content").text() + '</div>')
                .find('div')
                .css({"font": _font, "color":_color, "margin-right":_itemmargin});
            $(xml).find("icon").each(function(index){
                entryCnt += 1;
                var _image = $(this).find("image").text(),
                    _imagehover = $(this).find("imagehover").text();
            	list.append('<div class="footericon" id="footericon' + entryCnt.toString() + '" href="' + $(this).find("href").text() + '"></div>')
            	    .find("#footericon" + entryCnt.toString())
            	    .css({"width": _iconsize, "height": _iconsize,
            	    	  "background": getFooterIconBackCSSString(_image),
            	    	  "background-size": _iconsize + " " + _iconsize,
            	    	  "margin": ((parsePx(style["height"]) - parsePx(_iconsize)) / 2).toString() + "px " + _itemmargin + " 0px 0px",
                          "border-radius": _radius})
                    .hover(function(){
                        $(this).css({"background": getFooterIconBackCSSString(_imagehover), 
                                     "background-size": _iconsize + " " + _iconsize});
                    }, function(){
                        $(this).css({"background": getFooterIconBackCSSString(_image),
                                     "background-size": _iconsize + " " + _iconsize});
                    });
            });
        }
    });
}