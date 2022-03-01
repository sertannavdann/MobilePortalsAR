// -----JS CODE-----
//@input SceneObject followObj
//@input vec3 offsetPosition
var myTransform;


function Start()
{
    myTransform = script.getSceneObject().getTransform();
}
script.createEvent("OnStartEvent").bind(Start);

function Update()
{
    myTransform.setWorldRotation(quat.quatIdentity());
    var additivePosition = script.followObj.getTransform().getWorldPosition().add(script.offsetPosition);
    var additiveRotation = script.followObj.getTransform().getWorldRotation()
    
    myTransform.setWorldPosition(additivePosition);
}
script.createEvent("UpdateEvent").bind(Update);