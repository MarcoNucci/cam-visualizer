import sync from 'css-animation-sync';

let styleSheetRot = null;
let styleSheetText = null;
let ruleIndexRot = null;
let ruleIndexText = null;
let ruleTimeIndexRot = null;
let ruleTimeIndexText = null;

export const changeAnimationDuration = (time) => {
    let stylesTimeRot = `@media (prefers-reduced-motion: no-preference) {
        .App-gear {
            animation: App-gear-spin infinite ${time} linear;
        }
    }`;
    if (ruleTimeIndexRot != null)
        styleSheetRot.sheet.deleteRule(ruleTimeIndexRot);
    ruleTimeIndexRot = styleSheetRot.sheet.insertRule(stylesTimeRot, styleSheetRot.sheet.cssRules.length);

    let stylesTimeText = `.Text-gear:before {
        content: "cool.";
        animation: Text-gear-change ${time} infinite 0s;
    }`;
    if (ruleTimeIndexText != null)
        styleSheetText.sheet.deleteRule(ruleTimeIndexText);
    ruleTimeIndexText = styleSheetText.sheet.insertRule(stylesTimeText, styleSheetText.sheet.cssRules.length);
}

const dynamicAnimation = (name, styles, isRot) => {
    if (isRot) {
        if (!styleSheetRot) {
            styleSheetRot = document.createElement('style');
            styleSheetRot.type = 'text/css';
            document.head.appendChild(styleSheetRot);
        }
        if (ruleIndexRot != null)
            styleSheetRot.sheet.deleteRule(ruleIndexRot);
        ruleIndexRot = styleSheetRot.sheet.insertRule(`@keyframes ${name} {${styles}}`, styleSheetRot.sheet.cssRules.length);
    } else {
        if (!styleSheetText) {
            styleSheetText = document.createElement('style');
            styleSheetText.type = 'text/css';
            document.head.appendChild(styleSheetText);
        }
        if (ruleIndexText != null)
            styleSheetText.sheet.deleteRule(ruleIndexText);
        ruleIndexText = styleSheetText.sheet.insertRule(`@keyframes ${name} {${styles}}`, styleSheetText.sheet.cssRules.length);
    }
}

export const createAnimation = (posData, numPoints) => {
    let nameRot = "App-gear-spin";
    let nameText = "Text-gear-change";
    let stylesRot = "";
    let stylesText = "";
    let length = posData[posData.length - 1][0] - posData[1][0];

    // stylesRot += `0% { transform: rotate(${posData[0][1].toFixed(2)}deg); }\n`;
    stylesRot += `0% { transform: rotate(0deg); }\n`;
    for (let i = 1; i <= numPoints; i++) {
        let index = Math.floor(i * posData.length / numPoints);
        if (index < 1) index = 1;
        if (index > posData.length - 1) index = posData.length - 1;
        stylesRot += `${(index / numPoints * 100).toFixed(2)}% { transform: rotate(${posData[index][1].toFixed(2)}deg); }\n`;
        stylesText += `${(index / numPoints * 100).toFixed(2)}% { content: 'Master Position: ${posData[index][0].toFixed(2)}° - Axis Position: ${posData[index][1].toFixed(2)}°'; }\n`;
    }

    dynamicAnimation(nameRot, stylesRot, true);
    dynamicAnimation(nameText, stylesText, false);

    const Anim1 = findAnimByName(nameRot);
    const Anim2 = findAnimByName(nameText);
    if (Anim1 !== undefined && Anim2 !== undefined)
        Anim2.startTime = Anim1.startTime;
}

function findAnimByName(name) {
    const anims = document.getAnimations();
    return anims.find((anim) => anim.animationName === name);
}