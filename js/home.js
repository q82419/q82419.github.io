$(document).ready(function(){
    constructMenuList($("#menu"), 'data/mainmenu.xml');
    constructPictureBoxSet($("#content"), 'data/programming_list.xml', 1, true);
    $("#content").css({width: Math.min(950, $(window).width())});
    $("#menu").sticky({ topSpacing: 0 });
});

$(window).resize(function(){
    $("#content").css({width: Math.min(950, $(window).width())});
});