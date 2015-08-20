function parsePx(w){
	return parseInt(w.replace("px", ""));
}
function getPictureBoxWidth(w, margin_left, margin_right){
	return parsePx(w) + parsePx(margin_left) + parsePx(margin_right);
}
function getPictureBoxSetWidth(content, w, column){
	if(column == 0)
        return (Math.max(Math.floor($(content).width() / w), 1) * w).toString();
    else
    	return (w * column).toString();
}
function hexToRgba(color, a){
	return "rgba(" + parseInt(color.substring(1, 3), 16) + 
		   ", " + parseInt(color.substring(3, 5), 16) +
		   ", " + parseInt(color.substring(5, 7), 16) + 
		   ", " + a.toString() + ")";
}
function getShadowCSSString(color){
	return "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 40px " +
	       hexToRgba(color, 0.2) + ", 0 0 70px " + hexToRgba(color, 0.2);
}
function getBackgroundCSSString(color, img){
	return color + " url(" + img + ") no-repeat center";
}

/*
    Usage:  constructPictureBoxSet(content, dataURL, column);
        content: The <div></div> where to put the picture boxes in.
        dataURL: The URL of the data XML file.
        column:  The number of column, 0 means that autosizes by the parent's width.
*/
function constructPictureBoxSet(content, dataURL, column){
	$.ajax({
	    url: dataURL,
	    type: 'GET',
	    dataType: 'xml',
	    success: function(xml){
	    	var picboxset = $(content).append('<div class="pictureboxset"></div>').find(".pictureboxset"),
	    	    _style = $(xml).find("style"), 
	    	    style = {},
	    	    backimg = _style.find("backgroundimg").text(),
	    	    boxwidth = 0;
	    	style["width"] = _style.find("width").text();
	    	style["height"] = _style.find("height").text();
	    	style["font"] = _style.find("textsize").text() + '/' + style["height"] + ' ' + _style.find("font").text();
	    	style["border-radius"] = _style.find("radius").text();
	    	style["margin"] = _style.find("margin").text();
	    	style["color"] = _style.find("color").text();
	    	boxwidth = getPictureBoxWidth(style["width"], style["margin"].split(' ')[1], style["margin"].split(' ')[3]);
	    	picboxset.css({width: getPictureBoxSetWidth(content, boxwidth, column)});
	    	$(xml).find("data").each(function(index){
	    		var _opacity = 0.3;
	    		    dataEntry = {};
	    		dataEntry["id"] = $(this).find("id").text();
	    		dataEntry["name"] = $(this).find("name").text();
	    		dataEntry["backcolor"] = $(this).find("backcolor").text();
	    		dataEntry["href"] = $(this).find("href").text();
	    		picboxset.append('<div class="picturebox" id="' + dataEntry["id"] + '">' + dataEntry["name"] + '</div>')
	    				 .find("#" + dataEntry["id"])
	    				 .css(style)
	    		         .css({"background": getBackgroundCSSString(dataEntry["backcolor"], backimg),
	    		         	   "background-size": "100% 100%"
	    		         	   /*"text-shadow": getShadowCSSString(dataEntry["backcolor"])*/})
	    		         .append('<div class="picturebox-cover"><a href="' + dataEntry["href"] + '"></a></div>')
					     .hover(function(){
					         $(this).animate({boxShadow: "0 3px 8px 2px rgba(50, 50, 50, 0.6)", textShadow: "#fff 0px 0px 3px"}, 300);
					      }, function(){
					   	     $(this).animate({boxShadow: "none", textShadow: "none"}, 600);
					      })
					     .find('.picturebox-cover')
					     .css({"display": "block", "background": "#000000", "opacity": _opacity,
					           "width": style["width"], "height": style["height"], "position": "absolute",
					       	   "left": "0", "top": "0", "border-radius": style["border-radius"]})
					     .hover(function(){
					         $(this).animate({"opacity": "0"}, 300);
					      }, function(){
						     $(this).animate({"opacity": _opacity}, 600);
						  })
					     .find('a')
					     .css({"width": style["width"], "height": style["height"], display: "block"});
	    	});
            $(window).resize(function(){
	    	    picboxset.css({width: getPictureBoxSetWidth(content, boxwidth, column)});
            })
	    }
	});
}
