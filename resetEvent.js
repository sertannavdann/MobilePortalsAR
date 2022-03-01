// -----JS CODE-----
// @input Component.ScriptComponent API
// @input SceneObject allPrefab

// @input SceneObject reiMain

// @input SceneObject image
// @input SceneObject selfieBackground

// @input Component.AnimationMixer animation
// @input string[] animationLayerName = "BaseLayer"

// @input SceneObject[] hints
// @input SceneObject container

// @input SceneObject cameraObject
// @input SceneObject rotationObject

// @input SceneObject fog

//@input SceneObject imageAligner
//@input SceneObject imageAligner2
//@input SceneObject imageAligner3

//@input SceneObject birdsObject


//@input SceneObject[] allEffectContent
function updateReset (eventData)
{
    if (script.API.api.getResetFlag()){
        
        print("reseter activated")
        var swirl = script.allEffectContent[2].getChild(0);
        global.tweenManager.resetObject(swirl, "play");
        
        for(var i = 0; i < script.allEffectContent.length; i++){
            script.allEffectContent[i].enabled = false;
        }      
        script.API.api.setIntensityBool(false);
        
        global.tweenManager.resetObject(script.allPrefab, "all_third_rotate")
        global.tweenManager.resetObject(script.allPrefab, "all_first_rotate")
        
        global.tweenManager.resetObject(script.container, "closer")
        global.tweenManager.resetObject(script.image, "image_closer")
        
        global.tweenManager.startTween(script.fog, "out")
        
        
        for (var i = 0; i < script.hints.length; i++) 
        {
            global.tweenManager.startTween(script.hints[i], "fade-out")
        }

        resetAnimation()

        script.API.api.textureAssign(0, false)
        
        script.container.enabled = true;
        
        script.cameraObject.getComponent("Component.DeviceTracking").enabled = true;
        script.rotationObject.getComponent("Component.DeviceTracking").enabled = false;

        global.tweenManager.setEndValue(script.reiMain, "move", script.API.api.getStartPosition())
        global.tweenManager.startTween(script.reiMain, "move")

        global.tweenManager.resetObject(script.imageAligner, "left_main")
        global.tweenManager.resetObject(script.imageAligner2, "right_main")
        global.tweenManager.resetObject(script.imageAligner3, "middle_main")
        
        global.tweenManager.startTween(script.imageAligner2, "cycle_guy_reset")
        
        script.API.api.setStarted(false);
        script.API.api.setIndex(undefined);
        
        script.reiMain.getTransform().setWorldRotation(script.API.api.getStartRotation())
        script.API.api.setResetFlag(undefined)
        
        global.tweenManager.stopTween(script.birdsObject, "birds")
    }
}

var event = script.createEvent("UpdateEvent");
event.bind( updateReset );

function resetAnimation() {
    if(script.animation)
    {
        for (var i = 0; i < script.animationLayerName.length; i++) 
        {
            script.animation.setWeight(script.animationLayerName[i], 1);
            script.animation.start(script.animationLayerName[i], 0, 1);
            script.animation.pause(script.animationLayerName[i]);
        }
//        print(script.animation.getAnimationLayerNames())
    }
//    script.animation.resetAnimations()
}

