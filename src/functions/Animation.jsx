import sync from 'css-animation-sync';


let styleSheetRot = null;
let styleSheetText = null;
let ruleIndexRot = null;
let ruleIndexText = null;
let ruleTimeIndexRot = null;
let ruleTimeIndexText = null;

export const changeAnimationDuration = (time) => {

    let stylesTimeRot = '@media (prefers-reduced-motion: no-preference) {\n'
    stylesTimeRot += '   .App-gear {\n'
    stylesTimeRot += '       animation: App-gear-spin infinite '+time+' linear;\n'
    stylesTimeRot += '     }\n'
    if (ruleTimeIndexRot != null)
        styleSheetRot.sheet.deleteRule(ruleIndexRot);
    ruleTimeIndexRot = styleSheetRot.sheet.insertRule(stylesTimeRot)

    let stylesTimeText = ' .Text-gear:before {\n'
    stylesTimeText +=    'content: "cool.";\n'
    stylesTimeText +=    'animation: Text-gear-change '+time+' infinite 0s;\n'
    stylesTimeText +='  }\n'
    if (ruleTimeIndexText != null)
        styleSheetText.sheet.deleteRule(ruleTimeIndexText);
    ruleTimeIndexText = styleSheetText.sheet.insertRule(stylesTimeText)
}

const dynamicAnimation = (name,styles, Rot) => {
  
    if (Rot)
    {
        if (!styleSheetRot)
        {
          styleSheetRot = document.createElement('style');
          styleSheetRot.type = 'text/css';
          document.head.appendChild(styleSheetRot);
        }
        if (ruleIndexRot != null)
            styleSheetRot.sheet.deleteRule(ruleIndexRot);
        ruleIndexRot = styleSheetRot.sheet.insertRule(`@keyframes ${name} {${styles}}`, styleSheetRot.length);
    }
    else
    {
        if (!styleSheetText)
        {
          styleSheetText = document.createElement('style');
          styleSheetText.type = 'text/css';
          document.head.appendChild(styleSheetText);
        }
        if (ruleIndexText != null)
             styleSheetText.sheet.deleteRule(ruleIndexText);
        ruleIndexText = styleSheetText.sheet.insertRule(`@keyframes ${name} {${styles}}`, styleSheetText.length);
    }

}
export const createAnimation = (posData, numPoints) => {
    let nameRotObj = "App-gear"
    let nameRot = "App-gear-spin"
    let nameTextObj = "Text-gear"
    let nameText ="Text-gear-change"
    let stylesRot = "";
    let stylesText = "";
    let length = posData[posData.length-1][0] - posData[1][0];
    console.log(length)
    stylesRot += "0% {\n"
    stylesRot += " transform: rotate(0deg);\n"
    stylesRot += "}\n"
    for (let i = 1; i < numPoints+1; i++)
    {
        let index = Math.floor(i*posData.length/numPoints);
        if (index < 1) index = 1;
        if (index > posData.length -1) index = posData.length-1;
        let previousIndex = Math.floor((i-1)*posData.length/numPoints);
        if (previousIndex < 1) previousIndex = 1;
        if (previousIndex > posData.length -1) previousIndex = posData.length-1;
        stylesRot += (index/numPoints*100).toFixed(2).toString() + "% {\n"
        stylesRot += " transform: rotate("+(posData[index][1]).toFixed(2).toString()+"deg);\n"
        stylesRot += "}\n"
        stylesText += (index/numPoints*100).toFixed(2).toString() + "% {\n"
        // stylesText += " content: '"+(posData[index][1]).toFixed(2).toString()+" units'\n"
        stylesText += " content: "
        stylesText += "'Master Position: "+(posData[index][0]).toFixed(2).toString()+"° - Axis Position: "+(posData[index][1]).toFixed(2).toString()+"°'\n"
        stylesText += "}\n"
        if (index >= posData.length -1) break;
    }

    console.log(stylesRot)
    console.log(stylesText)

    dynamicAnimation(nameRot, stylesRot, true);
    dynamicAnimation(nameText, stylesText, false);
    // sync([nameRot, nameText]);

    const Anim1 = findAnimByName(nameRot);
    const Anim2 = findAnimByName(nameText);
    Anim2.startTime = Anim1.startTime;
}

function findAnimByName(name) {
    // get all the active animations on this element
    const anims = document.getAnimations();
    // return the first one with the expected animationName
    return anims.find((anim) => anim.animationName === name);
  }