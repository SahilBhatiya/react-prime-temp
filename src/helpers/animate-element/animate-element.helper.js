import autoAnimate from "@formkit/auto-animate";

export const animateElement = (elementRef, effect) => {
  if (elementRef.current) {
    animateWithEffect(elementRef.current, effect);
  }
};

export const animateElementWithAllChildren = (elementRef, effect) => {
  recursiveAnimate(elementRef.current, effect);
};

const recursiveAnimate = (element, effect) => {
  if (!element) {
    return;
  }
  if (element.children.length > 0) {
    for (let i = 0; i < element.children.length; i++) {
      recursiveAnimate(element.children[i], effect);
    }
  }
  animateWithEffect(element, effect);
};

const animateWithEffect = (element, effect) => {
  if (effect === "fade") {
    animateWithFade(element);
  } else {
    defaultAnimate(element);
  }
};

const defaultAnimate = (element) => {
  autoAnimate(element);
};

const animateWithFade = (element) => {
  autoAnimate(element, (el, action) => {
    let keyframes;
    if (action === "add") {
      keyframes = [
        { filter: "blur(100)", opacity: 0 },
        { filter: "blur(0)", opacity: 1 },
      ];
    }
    if (action === "remove") {
      keyframes = [
        { filter: "blur(0)", opacity: 1 },
        { filter: "blur(100)", opacity: 0 },
      ];
    }
    return new KeyframeEffect(el, keyframes, {
      duration: 300,
      easing: "ease-out",
    });
  });
};
