function parsePx(w){
    return parseInt(w.replace("px", ""));
}
function getPictureBoxWidth(w, margin_left, margin_right){
    return parsePx(w) + parsePx(margin_left) + parsePx(margin_right);
}
function getPictureBoxSetWidth(content, w, column, cnt){
    if(column == 0){
        var calcCol = Math.max(Math.floor($(content).width() / w), 1);
        if(calcCol <= cnt)
            return (calcCol * w).toString();
        else
            return (cnt * w).toString();
    }
    else
        return (w * column).toString();
}
function getPictureBoxShadowCSSString(isShadow){
    if(isShadow)
        return "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 40px #fff";
    else
        return "none";
}
function getPictureBoxBackgroundCSSString(color, img){
    return color + " url(" + img + ") no-repeat center";
}

/*
    Usage:  constructPictureBoxSet(content, dataURL, column, isShadow);
        content:  The <div></div> where to put the picture boxes in.
        dataURL:  The URL of the data XML file.
        column:   The number of column, 0 means that autosizes by the parent's width.
        isShadow: Whether turning on the text shadow. True to turn on, False to turn off.
*/
function constructPictureBoxSet(content, dataURL, column, isShadow){
    $.ajax({
        url: dataURL,
        type: 'GET',
        dataType: 'xml',
        success: function(xml){
            var picboxset = $(content).append('<div class="pictureboxset"></div>').find(".pictureboxset"),
                _style = $(xml).find("style"), 
                style = {},
                backimg = _style.find("backgroundimg").text(),
                boxwidth = 0,
                entryCnt = 0;
            style["width"] = _style.find("width").text();
            style["height"] = _style.find("height").text();
            style["font"] = _style.find("textsize").text() + '/' + style["height"] + ' ' + _style.find("font").text();
            style["border-radius"] = _style.find("radius").text();
            style["margin"] = _style.find("margin").text();
            style["color"] = _style.find("color").text();
            style["text-shadow"] = getPictureBoxShadowCSSString(isShadow);
            boxwidth = getPictureBoxWidth(style["width"], style["margin"].split(' ')[1], style["margin"].split(' ')[3]);
            $(xml).find("data").each(function(index){
                var _opacity = 0.3,
                    _id = $(this).find("id").text(),
                    _name = $(this).find("name").text(),
                    _back = $(this).find("backcolor").text(),
                    _href = $(this).find("href").text();
                entryCnt += 1;
                picboxset.append('<div class="picturebox" id="' + _id + '">' + _name + '</div>')
                         .find("#" + _id)
                         .css(style)
                         .css({"background": getPictureBoxBackgroundCSSString(_back, backimg), "background-size": "100% 100%"})
                         .append('<div class="picturebox-cover"><a href="' + _href + '"></a></div>')
                         .hover(function(){
                              $(this).animate({boxShadow: "0 2px 5px 2px rgba(50, 50, 50, 0.6)"}, 300);
                          }, function(){
                              $(this).animate({boxShadow: "none"}, 600);
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
            picboxset.css({width: getPictureBoxSetWidth(content, boxwidth, column, entryCnt)});
            $(window).resize(function(){
                picboxset.css({width: getPictureBoxSetWidth(content, boxwidth, column, entryCnt)});
            })
        }
    });
}
