function setButtonCSSNormal(){
    var n = $(this).attr("id").substr(10);
    $(this).css({background: "url(images/menu" + n + ".png) no-repeat center -75px",
                 background: "url(images/stripes.png) no-repeat center 0px, url(images/menu" + n + ".png) no-repeat center 0px",
                 color: "#888888"});
}
function setButtonCSSHover(){
    var n = $(this).attr("id").substr(10);
    $(this).css({background: "url(images/menu" + n + ".png) no-repeat center",
                 background: "url(images/stripes.png) no-repeat center -200px, url(images/menu" + n + ".png) no-repeat center 0px",
                 color: "#ffffff"});
}
