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

// @input Component.AudioComponent cycle

// @input SceneObject leavesObject

var event = script.createEvent("TouchStartEvent");
event.bind(function(eventData)
{
    if(script.API.api.getStarted() == false){
        var touchedPos = eventData.getTouchPosition();
        print("Cycle");
        global.tweenManager.startTween(script.allPrefab, "all_third_rotate")
//        global.tweenManager.startTween(script.image, "image_third_rotate")
        global.tweenManager.startTween(script.image, "image_closer")
        global.tweenManager.startTween(script.image, "cycle_guy_later")
//        global.tweenManager.startTween(script.container, "closer")

        script.API.api.textureAssign(script.indexer, true)

        script.API.api.HintManager(script.indexer)
        
        if(script.animationMixer)
        {
            script.animationMixer.setWeight(script.animationLayerName, script.animationWeight);
            script.animationMixer.start(script.animationLayerName, script.animationStartOffset, script.numberOfLoops);
        }
        script.API.api.setStarted(true);
        script.API.api.setIndex(0);

        script.container.enabled = true;
        delayContainer.reset(3);
        delaySound.reset(1.5)
        
        script.leavesObject.enabled = true;
        var swirl = script.leavesObject.getChild(0);
        global.tweenManager.startTween(swirl, "play")
    } 
});

var delayContainer = script.createEvent("DelayedCallbackEvent");
delayContainer.bind(function(eventData){
    script.container.enabled = false;
})
var delaySound = script.createEvent("DelayedCallbackEvent");
delaySound.bind(function(eventData){
    script.cycle.play(-1);
})