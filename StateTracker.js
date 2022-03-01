// -----JS CODE-----
// @input Component.ScriptComponent API

// @input SceneObject[] frontContent
// @input SceneObject[] backContent

// @input SceneObject[] frontContentFace

// @input SceneObject[] frontBackgroundContent

// @input SceneObject selfieBackground

//@input Component.AudioComponent[] audios
// Enables and disables object depending on whether we are on front/back camera
// @input SceneObject tapSwitchCameraHint

// @input SceneObject tapObject
var onceFlag = true;
var gameFlag = true;

var tapTrigger = false;
var delayTap = script.createEvent("DelayedCallbackEvent");
delayTap.bind(function(eventData){
    script.tapObject.enabled = false;
})

var selfieEnabled;
var worldEnabled;
var endTimeOut = false;

var delayEnding = script.createEvent("DelayedCallbackEvent");
delayEnding.bind(function(eventData){
    endTimeOut = true; 
})
function onFrontCamEvent(eventData) {
    selfieEnabled = true;
    worldEnabled = false;
    
    script.API.api.HintManager(3)
    for(var i = 0; i < script.frontContent.length; i++)
    {
        var faceObject = script.frontContent[i];
        if(faceObject)
        {
            faceObject.enabled = true;
        }
    }  
    
    for(var i = 0; i < script.backContent.length; i++)
    {
        var worldObject = script.backContent[i];
        if(worldObject)
        {
            worldObject.enabled = false;
        }
    }
        //enables the specific 2D wearables
    script.selfieBackground.enabled = false;
    for(var i = 0; i < script.frontContentFace.length; i++)
    {
        if(script.API.api.getIndex() == i) {
            script.selfieBackground.enabled = true;
            script.frontContentFace[i].enabled = true;
            script.frontBackgroundContent[i].enabled = true;
            delayEnding.reset(0)
            script.API.api.HintManager(5)
        } else { 
            global.tweenManager.resetObject(script.frontBackgroundContent[2], "birds_screen")
            script.frontContentFace[i].enabled = false;
            script.frontBackgroundContent[i].enabled = false;
        }
    }
}
var cameraFrontEvent = script.createEvent("CameraFrontEvent");
cameraFrontEvent.bind(onFrontCamEvent);

function onBackCamEvent(eventData) {
    selfieEnabled = false;
    worldEnabled = true;
    script.API.api.HintManager(5)
    for(var i = 0; i < script.frontContent.length; i++)
    {
        var faceObject = script.frontContent[i];
        if(faceObject)
        {
            faceObject.enabled = false;
        }
    }  
    
    for(var i = 0; i < script.backContent.length; i++)
    {
        var worldObject = script.backContent[i];
        if(worldObject)
        {
            worldObject.enabled = true;
        }
    }
    
    for (var j=0; j<script.audios.length;j++){
        script.audios[j].stop(true)
    }
    
    script.selfieBackground.enabled = false;
}
var cameraBackEvent = script.createEvent("CameraBackEvent");
cameraBackEvent.bind(onBackCamEvent);

function localResetEnable(eventData){
    if ((script.API.api.getIndex() != undefined) && endTimeOut ) {
        for(var i = 0; i < script.frontContentFace.length; i++) {
            script.frontContentFace[i].enabled = false;
        }
        script.API.api.setResetFlag(true)
        endTimeOut = false
    }
}
var event = script.createEvent("CameraBackEvent");
event.bind( localResetEnable );


function updateReset (eventData)
{
    if ((script.API.api.getIndex() != undefined) && selfieEnabled) {
        script.selfieBackground.enabled = true;
    } else { script.selfieBackground.enabled = false; }
    
    
    if (script.API.api.getStarted() == false) {
        if (worldEnabled) {
            if (!tapTrigger) {
                script.tapObject.enabled = true;
                tapTrigger = true;
                delayTap.reset(6.0);
            }
        }
        if (selfieEnabled && onceFlag) {
            global.tweenManager.startTween(script.tapSwitchCameraHint, "fade-in")
            onceFlag = false;
            script.tapSwitchCameraHint.enabled = true;
        } else if (!selfieEnabled && !onceFlag) {
            global.tweenManager.startTween(script.tapSwitchCameraHint, "fade-out")
            onceFlag = true;
            script.tapSwitchCameraHint.enabled = false;
        }
        
    } else {
        if(gameFlag) {
            script.tapSwitchCameraHint.enabled = true;
            script.tapObject.enabled = false;
            global.tweenManager.startTween(script.tapSwitchCameraHint, "fade-in")
            gameFlag = false;

        } else if (script.API.api.getResetFlag()) { 
            gameFlag = true;
        }
    }
}
var event = script.createEvent("UpdateEvent");
event.bind( updateReset );