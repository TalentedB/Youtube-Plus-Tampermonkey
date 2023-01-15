// ==UserScript==
// @name         Inject Custom User Speed For Youtube
// @namespace    https://github.com/TalentedB
// @version      0.1
// @description  This script allows you to enter a custom speed for your videos
// @author       Talented
// @match        https://www.youtube.com/watch?*
// @match        https://www.youtube.com*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==


var intv = setInterval(function() {
    var elems = document.getElementsByClassName("item style-scope ytd-watch-metadata")[0];
    if(!(window.location.href.indexOf("watch") > -1)){
        return false;
    }
    if(elems.length < 1 && elems.length!=null){
        return false;
    }
    clearInterval(intv);
    inject();

}, 1000);


function inject(){
    if(GM_getValue("custom_speed")==null){GM.setValue( "custom_speed", 1 );}
    document.getElementsByClassName('html5-main-video')[0].playbackRate = GM_getValue("custom_speed");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("size", "2");
    input.setAttribute("maxlength", 3);
    input.setAttribute("style","background-color:#FCF5D8;color:#00000;text-align: center;");

    var custom_button = document.createElement("Custom-Speed-Modifier");
    custom_button.innerHTML = '<div class="style-default size-default" style="font-weight: 700;font-family: Roboto;box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);text-decoration-thickness: auto;text-decoration: none #D1D5DB solid;text-align: center;box-sizing: border-box;cursor: pointer;width: 50px;color: #111827; background: #ffffff;;border: 0;border-radius: .5rem;"><div id="TextCodeIDK">Change Speed</div></div>';
    custom_button.onclick = () => {
        var speed = input.value;
        if(speed == ''){speed = 1;}
        if(speed > 16){speed = 1;alert("The speed value must be equal to or less than 16"); input.value=1;}
        document.getElementsByClassName('html5-main-video')[0].playbackRate = speed;
        GM.setValue( "custom_speed", speed );
    };

    var injection_location = document.getElementsByClassName("item style-scope ytd-watch-metadata")[0];
    injection_location.appendChild(custom_button)
    custom_button.appendChild(input);
    input.value = GM_getValue("custom_speed");
    document.getElementsByClassName('html5-main-video')[0].playbackRate = input.value;
    check();

    return 0;
}


function check(){
    var intv = setInterval(function() {
    var elems = document.getElementsByClassName("ytp-ad-button ytp-ad-visit-advertiser-button ytp-ad-button-link")[0];
    if(elems.length < 1){
        document.getElementsByClassName('html5-main-video')[0].playbackRate = GM_getValue("custom_speed");
        return false;
    }
    skip();

}, 100);

}

function skip(){
    document.getElementsByClassName('html5-main-video')[0].currentTime = 4000
    sleep(100);
    document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0].click();

}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

