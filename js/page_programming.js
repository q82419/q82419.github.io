function setContentSize(maxsize){
	$(content).css({"width": Math.min(maxsize, $("body").width()),
                    "margin-left": Math.max(0, ($("body").width() - maxsize) / 2)});
}

$(document).ready(function(){
    constructMenuList($("#menu"), 'data/mainmenu.xml');
	constructPictureBoxSet($("#languages"), 'data/programming_list.xml', 0, true);
    setContentSize(1000);
    $("#menu").sticky({ topSpacing: 0 });
});

$(window).resize(function(){
    setContentSize(1000);
});