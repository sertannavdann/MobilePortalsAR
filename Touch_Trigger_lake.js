// -----JS CODE-----
//@input SceneObject allPrefab
//@input SceneObject image

//    @input Component.AnimationMixer animationMixer
//    @input string animationLayerName = "BaseLayer"
//    @input float animationWeight = 1.0 {"widget":"slider", "min": 0, "max": 1, "step": 0.01}
//    @input float animationStartOffset = 0.0
//    @input int numberOfLoops = -1

// @input Component.ScriptComponent API
// @input int indexer

// @input SceneObject container

// @input Component.AudioComponent lake

// @input SceneObject birdsObject

var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
    if(script.API.api.getStarted() == false) {
        
        var touchedPos = eventData.getTouchPosition();
        print("Lake");
        
        global.tweenManager.startTween(script.allPrefab, "all_first_rotate")
//        global.tweenManager.startTween(script.image, "image_first_rotate")
        global.tweenManager.startTween(script.image, "image_closer")
        
//        global.tweenManager.startTween(script.container, "closer")        
        
        script.API.api.textureAssign(script.indexer, true)
        
        script.API.api.HintManager(script.indexer)
        
        if(script.animationMixer)
        {
            script.animationMixer.setWeight(script.animationLayerName, script.animationWeight);
            script.animationMixer.start(script.animationLayerName, script.animationStartOffset, script.numberOfLoops);
        }
        script.birdsObject.enabled = true;
        global.tweenManager.startTween(script.birdsObject, "birds")
        
        script.API.api.setStarted(true);
        script.API.api.setIndex(2);
        script.container.enabled = true;
        delayContainer.reset(3);
        
        delaySound.reset(1.5)
    } 
});

var delayContainer = script.createEvent("DelayedCallbackEvent");
delayContainer.bind(function(eventData){
    script.container.enabled = false;
})
var delaySound = script.createEvent("DelayedCallbackEvent");
delaySound.bind(function(eventData){
    script.lake.play(-1);
})