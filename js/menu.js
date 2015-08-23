function parsePx(w){
    return parseInt(w.replace("px", ""));
}

function getMenuListCSSString(img, imgheight, hoverimg, hoveroffset, color){
	return {"background": "url(" + img + ") no-repeat center " + ((parsePx(imgheight) / 2) * (-1) - 5).toString() + "px",
            "background": "url(" + hoverimg + ") no-repeat center 0px, url(" + img + ") no-repeat center 0px",
            "color": color};
}
function getMenuListCSSHoverString(img, hoverimg, hoveroffset, color){
	return {"background": "url(" + img + ") no-repeat center",
            "background": "url(" + hoverimg + ") no-repeat center " + hoveroffset.toString() + "px, url(" + img + ") no-repeat center 0px",
            "color": color};
}

/*
    Usage:  constructMenuList(content, dataURL);
        content:  The <div></div> where to put the menu list in.
        dataURL:  The URL of the data XML file.
*/
function constructMenuList(content, dataURL){
    $.ajax({
        url: dataURL,
        type: 'GET',
        dataType: 'xml',
        success: function(xml){
            var list = $(content).append('<ul></ul>').find('ul'),
                _style = $(xml).find("style"), 
                style = {},
                _hovercolor = _style.find("hovercolor").text(),
                _hoverimg = _style.find("hoverimg").text(),
                _hoverimgoffset = _style.find("hoverimgoffset").text(),
                _listwidth = parsePx(_style.find("listwidth").text()),
                entryCnt = 0;
            style["width"] = _style.find("width").text();
            style["height"] = _style.find("height").text();
            style["font"] = "bold " + _style.find("textsize").text() + '/' + style["height"] + ' ' + _style.find("font").text();
            style["border-radius"] = _style.find("radius").text();
            style["margin"] = _style.find("margin").text();
            style["color"] = _style.find("color").text();
            style["text-shadow"] = _style.find("shadow").text();
            list.css({"margin": "0 auto"});
            $(xml).find("data").each(function(index){
                var _id = $(this).find("id").text(),
                    _name = $(this).find("name").text(),
                    _back = $(this).find("backimg").text(),
                    _href = $(this).find("href").text();
                entryCnt += 1;
                list.append('<li><a class="button" id="' + _id + '" href=' + _href + '>' + _name + '</a></li>')
                    .find("#" + _id)
                    .css(style)
                    .css(getMenuListCSSString(_back, style["height"], _hoverimg, _hoverimgoffset, style["color"]))
                    .addClass("menulistbutton")
                    .hover(function(){
                         $(this).css(getMenuListCSSHoverString(_back, _hoverimg, _hoverimgoffset, _hovercolor));
                     }, function(){
                         $(this).css(getMenuListCSSString(_back, style["height"], _hoverimg, _hoverimgoffset, style["color"]));
                     });
            });
            list.css({width: Math.min(_listwidth, content.parent().width()).toString() + "px"});
            $(window).resize(function(){
                list.css({width: Math.min(_listwidth, content.parent().width()).toString() + "px"});
            })
        }
    });
}