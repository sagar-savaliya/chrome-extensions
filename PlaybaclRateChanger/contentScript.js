
var  main = function(){
    var jvideo,jspeedup,jspeeddown,jplaybackrate;
    jvideo = document.querySelector('.html5-main-video');
    if(!jvideo)
        return;

    var ele = document.createElement("div");
    ele.classList.add('container-ext');
    ele.innerHTML = "<button class='btn-ext btn-ext-right SpeedUp'>➕</button><span class='btn-ext PlayBackRate'>"
        + jvideo.playbackRate.toFixed(2)
        + "</span><button class='btn-ext btn-ext-left SpeedDown'>➖</button>";
    document.querySelector('.html5-video-container').appendChild(ele);

    jspeedup = document.querySelector('.SpeedUp');
    jspeeddown = document.querySelector('.SpeedDown');
    jplaybackrate = document.querySelector('.PlayBackRate');

    setPlayBackRate();

    function setPlayBackRate(){
        jplaybackrate.innerHTML = jvideo.playbackRate.toFixed(2);
    }

    function changePlayBackRate(e,change){
        if(jvideo.playbackRate+change<0.1) {
            jvideo.playbackRate = 0.1;
            return;
        }
        if(jvideo.playbackRate+change>16){
            jvideo.playbackRate = 16;
            return;
        }
        jvideo.playbackRate+=change;
        setPlayBackRate();
    }

    jspeedup.addEventListener('click',(e) => {
        e.stopPropagation();
        changePlayBackRate(e, 0.1);
    });
    jspeeddown.addEventListener('click',(e) => {
        e.stopPropagation();
        changePlayBackRate(e,-0.1);
    });
    window.addEventListener('keydown',(e) => {
        if(e.key=='[')
            changePlayBackRate(e,-0.1);
        else if(e.key==']')
            changePlayBackRate(e,0.1);
    });

    jspeedup.addEventListener('dblclick',(e) => e.stopPropagation());

    jspeeddown.addEventListener('dblclick',(e) => e.stopPropagation());

    document.querySelector('.ytp-panel-menu').addEventListener('DOMSubtreeModified',(e) => {
        jplaybackrate.innerHTML = jvideo.playbackRate.toFixed(2);
    });
}

window.onload = main;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // listen for messages sent from background.js
        if (request.message === 'hello!') {
            main();
        }
});



