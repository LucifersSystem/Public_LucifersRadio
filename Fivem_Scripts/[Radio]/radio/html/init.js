try{
    GetParentResourceName()
}
catch(e)
{
    window.GetParentResourceName = function() {
        return "localhost:8888"
    }
}

window.focusListener = function()
{
    $(".focusedOnly").addClass("hidden");
    fetch(`https://${GetParentResourceName()}/releaseFocus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
        })
    }).then(resp => resp.json()).then(resp => function (){
        if(Is_Debug){
            console.log(resp);
        }
    });
    if(resizeVisible)
    {
        toggleResizeButtons()
    }
    try {
        $(document).unbind(keyUp)
    }
    catch(e)
    {
        // ignored
    }
}
const keyUp = function(e) {
    if (e.key === "E") {
        window.focusListener();
        console.log("Exited Focus");
    }
}

let resizeVisible = false;
let resizeButtons = $(".resize-button");
function toggleResizeButtons()
{
    console.log("Toggle resize buttons")

    if(resizeVisible)
    {
        resizeButtons.hide();
    }
    else
    {
        resizeButtons.show();
    }
    resizeVisible=!resizeVisible;
}
$("#resizeButtonsDisplay").click(()=>{
    toggleResizeButtons();
})

resizeButtons.click((e)=>{
    doResize($(e.target).data("resize-type"))
})
window.setFocus = function () {
    $(".focusedOnly").removeClass("hidden");
    $(document).keyup(keyUp);
}
$(document).ready(function(){
    const defaultRadioModelConfig = {
        pttTone : "default",
        boopTone : "default",
        beepTone : "default",
        bonkTone : "default",
        autoSize : true,
        menuItems : 3
    };

    let radioModelConfig = defaultRadioModelConfig;


    let connectionEstablished=false;


    window.ledmode="r";
    window.prealertText="";
    window.alertCount=0;

    let radioHidden = true;

    window.showRadio=function(){
        if (!connectionEstablished)
            startRadio();
        $('#radio').show();
        $('#radiobg').show();
        radioHidden = false;
    };

    window.hideRadio=function(){
        $('#radio').hide();
        $('#radiobg').hide();
        radioHidden = true;
    };

    window.shutdownRadio=function(){
        window.hideRadio();
        connectionEstablished=false;
    };

    window.initRadio=function(){
        connectionEstablished = true;
    };

    window.updateLineSize = function(){
        if(!radioModelConfig.autoSize)
        {
            return;
        }
        if($ln02.text().length>8)
        {
            if($ln02.text().length>14) {
                $ln02.addClass("smaller-text");
            }
            else
            {
                $ln02.addClass("small-text");
            }
        }
        else
        {
            $ln02.removeClass("small-text");
            $ln02.removeClass("smaller-text");
        }
        if($alert.text().length>8)
        {
            if($alert.text().length>14) {
                $alert.addClass("smaller-text");
            }
            else
            {
                $alert.addClass("small-text");
            }
        }
        else
        {
            $alert.removeClass("small-text");
            $alert.removeClass("smaller-text");
        }
    }



    window.dispUpdate=function(btn01, btn02, btn03, btn04, btn05, zn, ch, ln01, ln02) {
        $bt01.text(btn01);
        $bt02.text(btn02);
        $bt03.text(btn03);
        $bt04.text(btn04);
        $bt05.text(btn05);
        $zn.text(zn);
        $ch.text(ch);
        $ln01.text(ln01);
        $ln02.text(ln02);
        updateLineSize();
    };

    window.lnUpdate=function(zn,ch ,ln01,ln02) {
        $zn.text(zn);
        $ch.text(ch);
        $ln01.text(ln01);
        $ln02.text(ln02);
        updateLineSize();
    };

    window.showAlert=function(event) {
        let $alertDiv = $(".alert-div");

        if (alertCount === 0)
            $alertDiv.show();
        $alertDiv.removeClass("alert-red");
        $alertDiv.addClass("alert-red");
        alertCount++;
        $alert.text(event.data.message);
        updateLineSize();
        setTimeout(function () {
            if (alertCount === 1) {
                $alertDiv.hide();
                $alertDiv.removeClass("alert-none");
                $alertDiv.removeClass("alert-red");
            }
            alertCount--;
        }, 1000)
    };


    window.addEventListener('message', function(event) {
        if (event.data.action == 'open') {
            window.showRadio();
        } else if (event.data.action == 'close') {
            window.hideRadio();
        } else if (event.data.action == 'init') {
            window.initRadio();
        } else if (event.data.action == 'dispUpdate') {
            window.dispUpdate(event.data.display.btn01, event.data.display.btn02, event.data.display.btn03,
                event.data.display.btn04, event.data.display.btn05, event.data.display.zn, event.data.display.ch,
                event.data.display.ln01, event.data.display.ln02);
        }else if (event.data.action == 'lnUpdate') {
            window.lnUpdate(event.data.display.zn, event.data.display.ch,
                event.data.display.ln01, event.data.display.ln02);
        }else if (event.data.action == 'alert') {
            showAlert(event);
        } else if (event.data.action == "setModel") {
            setModel(event.data.model);
        } else if (event.data.action == "powerOff")
        {
            window.shutdownRadio();
        } else if (event.data.action == "focus")
        {
            window.setFocus();
        }
    });

    window.setModel = function(model)
    {
        radioModel = model;
        resizeRadio(model);
        $("#modelCSS").attr("href","layouts/"+model+"/style.css");
        if(!radioHidden)
        {
            $('#radio').show();
            $('#radiobg').show();
        }
    };

    window.setRssi = function(rssi)
    {
        let $rssi = $("#rssi-icon-div");
        if(rssi==="false")
        {
            $rssi.hide();
        }
        else
        {
            $rssi.show();
            $rssi.removeClass("rssi-0 rssi-1 rssi-2 rssi-3 rssi-4 rssi-rx rssi-tx").addClass(`rssi-${rssi}`);
        }
    };

    let $menu = $("#menu-div");
    let $menuTitle = $("#menuTitle");
    let $lgMenuItem1 = $("#lgMenuItem1");
    let $lgMenuItem2 = $("#lgMenuItem2");



    window.showMenu = function(name)
    {
        if(!name)
        {
            name = "Menu"
        }
        $menu.show();
        $menuTitle.text(name);
    }

    window.hideMenu = function()
    {
        $menu.hide();
    }

    window.setMenuLarge = function(itemIndex,item1,item2,btnLeft,btnRight)
    {
        $("#menuItemsLarge").show();
        $("#menuItemsSmall").hide();
        let item1index1 = $("#lgMenuItem1 .firstItem");
        let item2index1 = $("#lgMenuItem1 .secondItem");
        let item1index2 = $("#lgMenuItem2 .firstItem");
        let item2index2 = $("#lgMenuItem2 .secondItem");
        item1index1.text(item1.title);
        item2index1.text(item1.text);
        item1index2.text(item2.title);
        item2index2.text(item1.text);
        setItemIndex(itemIndex)
    }

    window.setItemIndex = function(itemIndex)
    {
        if(itemIndex == 0)
        {
            $lgMenuItem1.addClass("selectedItem")
            $lgMenuItem2.removeClass("selectedItem")
        }
        else
        {
            $lgMenuItem1.removeClass("selectedItem")
            $lgMenuItem2.addClass("selectedItem")
        }
    }

    let $zn=$("#zn");
    let $ch=$("#ch");
    let $ln01=$("#ln01");
    let $ln02=$("#ln02");
    let $alert=$("#alert");

    let $bt01=$("#bt01");
    let $bt02=$("#bt02");
    let $bt03=$("#bt03");
    let $bt04=$("#bt04");
    let $bt05=$("#bt05");
    let $multifunctionLED=$("#multiFunctionLED");
    let $redLED=$("#redLED");
    let $redLEDImg=$("#redLEDImg");
    let $greenLED=$("#greenLED");
    let $greenLEDImg=$("#greenLEDImg");
    let $orangeLED=$("#orangeLED");
    let $orangeLEDImg=$("#orangeLEDImg");

    $('#radio').hide();

    let started = new Date();

    function startRadio()
    {
        resizeRadio(radioModel)
        started = new Date();

        setTimeout(function(){
            fetch(`https://${GetParentResourceName()}/init`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                })
            }).then(resp => resp.json()).then(resp => function (){
                if(Is_Debug){
                    console.log(resp);
                }
            });
        },1500);


        let tick=0;
        setInterval(function(){
            if(ledmode===""||ledmode===undefined)
            {
                $redLEDImg.addClass("hidden");
                $multifunctionLED.css("background-color", "");
                $redLED.css('background-color', '');
                tick=0;
            }
            else
            {
                if(tick>=ledmode.length-1)
                {
                    tick=0
                }
                let chan=ledmode.charAt(tick);
                if(chan.toLocaleLowerCase()==="r")
                {
                    $redLEDImg.removeClass("hidden");
                    $multifunctionLED.css('background-color', 'red');
                    $redLED.css('background-color', 'red');
                }
                else if(chan==="/")
                {
                    $redLEDImg.addClass("hidden");
                    $multifunctionLED.css('background-color', '');
                    $redLED.css('background-color', '');
                }
                tick++;
            }
        },100)

    }


    window.btn=function(btnType)
    {
        fetch(`https://${GetParentResourceName()}/btnPress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                btnID: btnType
            })
        }).then(resp => resp.json()).then(resp => function (){
            if(Is_Debug){
                console.log(resp);
            }
        });
    }



});

function doResize(resizeType)
{
    let sizingData = getSizingData(radioModel);
    if(resizeType==="reset")
    {
        sizingData = {
            scale:100,
            up:0,
            left:0
        };
    }
    if(resizeType==="left")
    {
        sizingData.left+=5;
    }
    if(resizeType==="right")
    {
        sizingData.left-=5;
    }
    if(resizeType==="up")
    {
        sizingData.up+=5;
    }
    if(resizeType==="down")
    {
        sizingData.up-=5;
    }
    if(resizeType==="larger")
    {
        sizingData.scale+=5;
    }
    if(resizeType==="smaller")
    {
        sizingData.scale-=5;
    }
    setSizingData(radioModel,sizingData);
    resizeRadio(radioModel)
}

let storage = window.localStorage;

function getSizingData(radioType)
{
    let result = storage.getItem("sizing:"+radioType);
    if(result==null)
    {
        return {
            scale:100,
            up:0,
            left:0
        };
    }
    else
    {
        return JSON.parse(result);
    }
}

function setSizingData(radioType,sizingData)
{
    storage.setItem("sizing:"+radioType,JSON.stringify(sizingData))
}

function resizeRadio(radioType)
{
    let $targets = $(".radioResizeTarget")
    let sizingData = getSizingData(radioType);
    $targets.css("transform","scale("+sizingData.scale/100+") translate("+(-sizingData.left)+"px, "+(-sizingData.up)+"px)");
}


let radioModel = "APX8000"