// -----JS CODE-----
//@input SceneObject meshMain
//@input Asset.Texture[] texArr 

//@input string[] any

//@input SceneObject[] hints

var hasTapped = false;
var stateManager;
var resetEnabled;

var resetPosition;

var intenseBool = false;

function setStartPosition(start)
{
    resetPosition = start;
}
function getStartPosition()
{ 
    return resetPosition
}


function setIntensityBool(start)
{
    intenseBool = start;
}
function getIntensityBool()
{ 
    return intenseBool
}

function setStarted(isStarted)
{
    hasTapped = isStarted
}

function getStarted()
{
    return hasTapped
}

function setStartRotation(rotation)
{
    resetRotation = rotation;
}
function getStartRotation()
{ 
    return resetRotation;
}

script.api.setStartRotation = setStartRotation
script.api.getStartRotation = getStartRotation



function HintManager(indexer) {
    for (var i = 0; i < script.hints.length; i++){ 
        if (i == indexer) {
            script.hints[i].enabled = true;
            global.tweenManager.startTween(script.hints[i], "fade-in")
        } else { script.hints[i].enabled = false; }
    }
}
function textureAssign(indexer, flag)
{
    var meshes = script.meshMain.getComponents("Component.RenderMeshVisual")
    if(flag){
        for (var i = 0; i < meshes.length; i++){ 
            if (i != indexer) {
                meshes[i].mainPass.changeBase = script.texArr[indexer]
                global.tweenManager.startTween(script.meshMain, script.any[i])
            }
        }
    } else { 
        for (var i = 0; i < meshes.length; i++){ 
            meshes[i].mainPass.changeBase = script.texArr[i]
//            global.tweenManager.resetObject(script.meshMain, script.any[i])
        }
    }
}

function setIndex(state)
{
    stateManager = state
}

function getIndex()
{
    return stateManager
}

function setResetFlag(flag)
{
    resetEnabled = flag
}

function getResetFlag()
{
    return resetEnabled;
}

script.api.HintManager = HintManager

script.api.textureAssign = textureAssign

script.api.setStarted = setStarted
script.api.getStarted = getStarted

script.api.setIndex = setIndex
script.api.getIndex = getIndex

script.api.getResetFlag = getResetFlag
script.api.setResetFlag = setResetFlag

script.api.setStartPosition = setStartPosition
script.api.getStartPosition = getStartPosition

script.api.setIntensityBool = setIntensityBool
script.api.getIntensityBool = getIntensityBool