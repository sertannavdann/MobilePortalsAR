// -----JS CODE-----
//@input Component.Image image
//@input Asset.Texture[] texture
//@input Component.Head head
//@input Component.ScreenTransform screenPosition

// @input Component.ScriptComponent API

function update (eventData) {
//    var headPos_x = script.head.getTransform().getLocalRotation().x * 10
//    var headPos_y = script.head.getTransform().getLocalRotation().y * 10
//
//    script.screenPosition.offsets.right = headPos_x
//    script.screenPosition.offsets.top = headPos_y
//    script.directionArrow.getTransform().setLocalPosition(new vec3(directionValue,0,0));
//    script.directionArrow.getTransform().setLocalPosition(new vec3(headPos, 0, 0))
    if (script.API.api.getIndex() != undefined) {
        script.image.mainPass.baseTex = script.texture[script.API.api.getIndex()]
    }

}
var event = script.createEvent("UpdateEvent");
event.bind( update );
