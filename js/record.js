function parsePx(w){
    return parseInt(w.replace("px", ""));
}
function getRecordListBoxBackCSSString(color, img, capacity){
    var back = "#",
        retStr = "rgba(";
    for(i = 0; i < 3; i++)
        retStr += Math.round(parseInt(color.substr(2 * i + 1, 2), 16) * capacity) + ", ";
    return retStr + "1) url(" + img + ") no-repeat center";
}
function getRecordListBoxBackHoverCSSString(color, img){
    return color + " url(" + img + ") no-repeat center";
}
function setRecordListSize(content, parent, maxsize){
    $(content).css({"width": Math.min(maxsize, $(parent).width() - 20), 
                    "margin-left": Math.max(10, ($(parent).width() - maxsize) / 2)});
}
/*
    Usage:  constructRecordList(content, dataURL);
        content:  The <div></div> where to put the record list in.
        dataURL:  The URL of the data XML file.
*/
function constructRecordList(content, dataURL){
    $.ajax({
        url: dataURL,
        type: 'GET',
        dataType: 'xml',
        success: function(xml){
            var list = $(content),
                _style = $(xml).find("style"),
                headstyle = {},
                bodystyle = {},
                categorystyle = {},
                subcategorystyle = {},
                titlestyle = {},
                datestyle = {},
                _listwidth = parsePx(_style.find("maxwidth").text()),
                _headheight = _style.find("headheight").text(),
                _headitemmargin = _style.find("headitemmargin").text(),
                _boxradius = _style.find("boxradius").text(),
                _categorybackcover = _style.find("categorybackcover").text(),
                _subcategorybackcover = _style.find("subcategorybackcover").text(),
                _datebackcover = _style.find("datebackcover").text(),
                entryCnt = 0;

            headstyle["background"] = _style.find("headbackcolor").text();
            headstyle["padding"] = _style.find("headpadding").text();
            bodystyle["background"] = _style.find("bodybackcolor").text();
            bodystyle["padding"] = _style.find("bodypadding").text();
            bodystyle["font"] = _style.find("bodyfontsize").text() + ' ' + _style.find("bodyfont").text();
            bodystyle["color"] = _style.find("bodyfontcolor").text();
            categorystyle["width"] = _style.find("categorywidth").text();
            categorystyle["height"] = _headheight;
            categorystyle["font"] = _style.find("categoryfontsize").text() + '/' + _headheight + ' ' + _style.find("categoryfont").text();
            categorystyle["color"] = _style.find("categoryfontcolor").text();
            categorystyle["margin-right"] = _headitemmargin;
            categorystyle["border-radius"] = _boxradius;
            subcategorystyle["width"] = _style.find("subcategorywidth").text();
            subcategorystyle["height"] = _headheight;
            subcategorystyle["font"] = _style.find("subcategoryfontsize").text() + '/' + _headheight + ' ' + _style.find("subcategoryfont").text();
            subcategorystyle["color"] = _style.find("subcategoryfontcolor").text();
            subcategorystyle["margin-right"] = _headitemmargin;
            subcategorystyle["border-radius"] = _boxradius;
            titlestyle["font"] = _style.find("titlefontsize").text() + '/' + _headheight + ' ' + _style.find("titlefont").text();
            titlestyle["color"] = _style.find("titlefontcolor").text();
            datestyle["width"] = _style.find("datewidth").text();
            datestyle["height"] = _headheight;
            datestyle["font"] = _style.find("datefontsize").text() + '/' + _headheight + ' ' + _style.find("datefont").text();
            datestyle["color"] = _style.find("datefontcolor").text();
            datestyle["margin-left"] = _headitemmargin;
            datestyle["background"] = _style.find("dateback").text();
            datestyle["border-radius"] = _boxradius;
            $(xml).find("data").each(function(index){
                var _catecory = $(this).find("category").text(),
                    _catecoryhref = $(this).find("categoryhref").text(),
                    _catecoryback = $(this).find("categoryback").text(),
                    _subcatecory = $(this).find("subcategory").text(),
                    _subcatecoryhref = $(this).find("subcategoryhref").text(),
                    _subcatecoryback = $(this).find("subcategoryback").text(),
                    _title = $(this).find("title").text(),
                    _date = $(this).find("date").text(),
                    _body = $(this).find("body").text(),
                    _capacity = 0.8;
                entryCnt += 1;
                list.append('<div class="recordentry" id="updaterecord' + entryCnt.toString() + '">\
                                <div class="recordentryhead">\
                                    <a class="recordentrycategory" href="' + _catecoryhref + '">' + _catecory + '</a>\
                                    <a class="recordentrysubcategory" href="' + _subcatecoryhref + '">' + _subcatecory + '</a>\
                                    <p class="recordentrytitle">' + _title + '</p>\
                                    <p class="recordentrydate">' + _date + '</p>\
                                </div>\
                                <div class="recordentrybody">\
                                    <p>' + _body + '</p>\
                                </div>\
                            </div>');
                var nowEntry = list.find("#updaterecord" + entryCnt.toString()),
                    nowEntryHead = nowEntry.find(".recordentryhead").css(headstyle),
                    nowEntrybody = nowEntry.find(".recordentrybody").css(bodystyle);
                nowEntry.hover(function(){
                            nowEntry.find(".recordentryhead").css({"background": _style.find("headhoverbackcolor").text()});
                            nowEntry.find(".recordentrybody").css({"background": _style.find("bodyhoverbackcolor").text()});
                        }, function(){
                            nowEntry.find(".recordentryhead").css({"background": headstyle["background"]});
                            nowEntry.find(".recordentrybody").css({"background": bodystyle["background"]});
                        });
                nowEntryHead.find(".recordentrycategory").css(categorystyle)
                            .css({"background": getRecordListBoxBackCSSString(_catecoryback, _categorybackcover, _capacity), "background-size": "100% 100%"})
                            .hover(function(){
                                $(this).css({"background": getRecordListBoxBackHoverCSSString(_catecoryback, _categorybackcover),
                                             "background-size": "100% 100%",
                                             "color": _style.find("categoryfontcolorhover").text()});
                            }, function(){
                                $(this).css({"background": getRecordListBoxBackCSSString(_catecoryback, _categorybackcover, _capacity),
                                             "background-size": "100% 100%",
                                             "color": categorystyle["color"]});
                            });
                nowEntryHead.find(".recordentrysubcategory").css(subcategorystyle)
                            .css({"background": getRecordListBoxBackCSSString(_subcatecoryback, _subcategorybackcover, _capacity), "background-size": "100% 100%"})
                            .hover(function(){
                                $(this).css({"background": getRecordListBoxBackHoverCSSString(_subcatecoryback, _subcategorybackcover),
                                             "background-size": "100% 100%",
                                             "color": _style.find("subcategoryfontcolorhover").text()});
                            }, function(){
                                $(this).css({"background": getRecordListBoxBackCSSString(_subcatecoryback, _subcategorybackcover, _capacity),
                                             "background-size": "100% 100%",
                                             "color": subcategorystyle["color"]});
                            });
                nowEntryHead.find(".recordentrytitle").css(titlestyle);
                nowEntryHead.find(".recordentrydate").css(datestyle);

            });
            setRecordListSize(content, content.parent(), _listwidth);
            $(window).resize(function(){
                setRecordListSize(content, content.parent(), _listwidth);
            })
        }
    });
}