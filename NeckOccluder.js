// -----JS CODE-----
// @input SceneObject binding
// @input SceneObject root
// @input SceneObject head

var bindingTransform = script.binding.getTransform();

var rootTransform = script.root.getTransform();
var rootOriginPosition = rootTransform.getWorldPosition();

var headTransform = script.head.getTransform();
var headOriginRotation = headTransform.getWorldRotation();

function onUpdate()
{
    var bindingPos = bindingTransform.getWorldPosition();
    var pos = bindingPos.add(rootOriginPosition);

    rootTransform.setWorldPosition(pos);

    var bindingRot = bindingTransform.getWorldRotation();
    var rot = bindingRot.multiply(headOriginRotation);

    headTransform.setWorldRotation(rot);
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);