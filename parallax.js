// -----JS CODE-----
// @input  Component.Image scene1Background

// @input SceneObject cameraObject
// @input float multiplier

var multiplier = script.multiplier

function update (eventData)
{
   
    var headTransform = script.cameraObject.getTransform();
  
    var headForward = headTransform.forward;
    var headForwardNoY = new vec3( headTransform.forward.x, headTransform.forward.y,0.0  )
   
    x_axis = headTransform.forward.x;
    y_axis = headTransform.forward.y;
 
    script.scene1Background.mainPass.uv2Offset = new vec2( x_axis*0.1*multiplier,y_axis*0.1*multiplier);
    
//    script.poster.mainPass.uv2Offset = new vec2( 0, 0); 
}
var event = script.createEvent("UpdateEvent");
event.bind( update );