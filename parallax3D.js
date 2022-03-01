// -----JS CODE-----

// @input  SceneObject object120
// @input Component.DeviceTracking deviceTrackingComponent

// @input SceneObject cameraObject
// @input SceneObject rotationObject

// @input SceneObject ReiDoors
// @input float multiplier

// @input Component.ScriptComponent API

// @input SceneObject assign

//@input SceneObject imageAligner
//@input SceneObject imageAligner2
//@input SceneObject imageAligner3

// @input Component.AudioComponent door

// @input SceneObject container
// @input SceneObject leavesObject

var flag = false;
var multiplier = script.multiplier
var PlayOnce = true;
var positionLerpFlag = false;

var delayLerpFlag = script.createEvent("DelayedCallbackEvent");
delayLerpFlag.bind(function(eventData){
    positionLerpFlag = true;
})

function update (eventData)
{
//    print(script.API.api.getStarted())
    
    var left = script.object120.getComponents("Component.RenderMeshVisual")[0]
    var mid = script.object120.getComponents("Component.RenderMeshVisual")[1]
    var right = script.object120.getComponents("Component.RenderMeshVisual")[2]    
    
    var endPosition = script.cameraObject.getTransform().getWorldPosition()
    var startPosition = script.ReiDoors.getTransform().getWorldPosition()
    var additiveVector = new vec3(0,0,-3)
    var multiplierVector;
    var offset;

      //Rotation Lerp if necessary
    var endRotation = script.cameraObject.getTransform().getWorldRotation()
    var startRotation = script.ReiDoors.getTransform().getWorldRotation()
    
    var angleBetween = quat.angleBetween(startRotation, endRotation)
    var look = quat.lookAt(endPosition, startPosition)
    var distance = startPosition.distance(endPosition);
    var fromTo = quat.rotationFromTo(startPosition, endPosition)
    
//    print(angleBetween)
//    var lerpMan = quat.lerp(startRotation, endRotation, 1)
//        script.ReiDoors.getTransform().setLocalRotation(lerpMan)    

    //When the selection triggers the distance between the door and the camera
    if (script.API.api.getStarted() == true){        
        script.ReiDoors.getTransform().setWorldRotation(LerpRotation(startRotation, endRotation, 0.15))
        
        
        if(!flag) {
            script.door.play(1);
            script.API.api.setStartRotation(startRotation)
            global.tweenManager.startTween(script.imageAligner, "left_main")
            global.tweenManager.startTween(script.imageAligner2, "right_main")
            global.tweenManager.startTween(script.imageAligner3, "middle_main")
            
            global.tweenManager.startTween(script.imageAligner2, "cycle_guy")
            flag = true;
        }
        
        //script.ReiDoors.getComponent("Component.LookAtComponent").enabled = false;
        
        script.cameraObject.getComponent("Component.DeviceTracking").enabled = false;
        script.rotationObject.getComponent("Component.DeviceTracking").enabled = true;

        // Offset based on the door index
        if(script.API.api.getIndex() == 2) { 
            offset = new vec3(0, -10, 15)
            multiplierVector = new vec3(1, 1, 1.2)
        } 
        else if (script.API.api.getIndex() == 1) {
            offset = new vec3(0, -10, 15)
            multiplierVector = new vec3(1, 1, 1.2)
        }
        else if (script.API.api.getIndex() == 0) {
            offset = new vec3(0, -10, 15)
            multiplierVector = new vec3(1, 1, 1.2)
        }
        onceCallback(startPosition)
        if(positionLerpFlag){
            // Dynamic Tween Position
            global.tweenManager.setStartValue(script.ReiDoors, "move", startPosition)
            global.tweenManager.setEndValue(script.ReiDoors, "move", endPosition.mult(multiplierVector).add(offset))
            global.tweenManager.startTween(script.ReiDoors, "move")
        }
    } else {
        PlayOnce = true;
        positionLerpFlag = false;
        flag = false;
        script.container.enabled = true;
        script.cameraObject.getComponent("Component.DeviceTracking").enabled = true;
        script.rotationObject.getComponent("Component.DeviceTracking").enabled = false;
        x = 0;
        
        if (distance < 350) {
            script.ReiDoors.getTransform().setWorldPosition(startPosition.add(additiveVector))
        } else if (distance > 450) {
            script.ReiDoors.getTransform().setWorldPosition(startPosition.sub(additiveVector)) }
//        if ( look.getAngle() > 2 ) { script.ReiDoors.getTransform().setWorldRotation(LerpRotation(startRotation, endRotation, 0.05)) }
    }

    // UV slider
    var CamTransform = script.rotationObject.getTransform();
  
    var CamForward = CamTransform.forward;
    var CamForwardNoY = new vec3( CamTransform.forward.x, CamTransform.forward.y,0.0  )

    x_axis = CamTransform.forward.x;
    y_axis = CamTransform.forward.y;
    

    
    left.mainPass.u2Offset = x_axis*0.2*multiplier;
    left.mainPass.v2Offset = y_axis*0.1*multiplier;

    mid.mainPass.u2Offset = x_axis*0.2*multiplier;
    mid.mainPass.v2Offset = y_axis*0.1*multiplier;

    right.mainPass.u2Offset = x_axis*0.2*multiplier;
    right.mainPass.v2Offset = y_axis*0.1*multiplier;
}
var event = script.createEvent("UpdateEvent");
event.bind( update );

function onceCallback(send) {
    if (PlayOnce == true){
        delayLerpFlag.reset(1.0)
        PlayOnce = false;
        script.API.api.setStartPosition(send)
    }
}

function LerpRotation(a,b,t)
{
    return quat.slerp(a,b,t);
}
