$(document).ready(function(){
    $("#menu").sticky({ topSpacing: 0 });
    $("a[id^=mainbutton]").each(setButtonCSSNormal);
    $("a[id^=mainbutton]").hover(setButtonCSSHover, setButtonCSSNormal);
	constructPictureBoxSet($("#content"), 'data/programming_list.xml', 0);
});
