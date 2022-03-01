// -----JS CODE-----
//@input SceneObject allPrefab
//@input SceneObject image

//@input SceneObject fog

//    @input Component.AnimationMixer animationMixer
//    @input string animationLayerName = "BaseLayer"
//    @input float animationWeight = 1.0 {"widget":"slider", "min": 0, "max": 1, "step": 0.01}
//    @input float animationStartOffset = 0.0
//    @input int numberOfLoops = -1


// @input Component.ScriptComponent API
// @input int indexer

// @input SceneObject container

// @input Component.AudioComponent mountain

var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
    if(script.API.api.getStarted() == false) {
        var touchedPos = eventData.getTouchPosition();
        print("Mountain");
        global.tweenManager.startTween(script.image, "image_closer")
        
//        global.tweenManager.startTween(script.container, "closer")

        script.API.api.textureAssign(script.indexer, true)        
        
        script.API.api.HintManager(script.indexer)        
        
        if(script.animationMixer)
        {
            script.animationMixer.setWeight(script.animationLayerName, script.animationWeight);
            script.animationMixer.start(script.animationLayerName, script.animationStartOffset, script.numberOfLoops);
        }
        script.API.api.setStarted(true);
        script.API.api.setIndex(1);
        
        script.container.enabled = true;
        delayContainer.reset(3);

        // fog object
        script.fog.enabled = true;
        global.tweenManager.startTween(script.fog, "fade")
        delaySound.reset(1.5)
    }
});

var delayContainer = script.createEvent("DelayedCallbackEvent");
delayContainer.bind(function(eventData){
    script.container.enabled = false;
})

var delaySound = script.createEvent("DelayedCallbackEvent");
delaySound.bind(function(eventData){
    script.mountain.play(-1);
})

