function setContentSize(content, maxsize){
	$(content).css({"width": Math.min(maxsize, $("body").width() - 40), 
                    "margin-left": Math.max(10, ($("body").width() - maxsize - 20) / 2)});
}

$(document).ready(function(){
    constructMenuList($("#menu"), 'data/mainmenu.xml');
    constructPictureBoxSet($("#content"), 'data/programming_list.xml', 1, true);
    setContentSize($("#content"), 910);
    $("#menu").sticky({ topSpacing: 0 });
});

$(window).resize(function(){
    setContentSize($("#content"), 910);
});