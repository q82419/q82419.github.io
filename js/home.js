$(document).ready(function(){
    constructMenuList($("#menu"), 'data/mainmenu.xml');
    constructPictureBoxSet($("#content"), 'data/programming_list.xml', 1, true);
    $("#menu").sticky({ topSpacing: 0 });
});