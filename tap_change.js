// -----JS CODE-----
//@input Component.Image image
//@input Asset.Texture[] texture



if(!script.initialized){
      var t = 0;
      script.initialized=true;
}

function printTime ()
{
    script.image.mainPass.baseTex = script.texture[t % script.texture.length];
    t++;
}