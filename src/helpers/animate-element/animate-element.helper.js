import autoAnimate from "@formkit/auto-animate";

export const animateElement = (elementRef, effect, duration) => {
  if (elementRef.current) {
    animateWithEffect(elementRef.current, effect, duration);
  }
};

export const animateElementWithAllChildren = (elementRef, effect, duration) => {
  recursiveAnimate(elementRef.current, effect, duration);
};

const recursiveAnimate = (element, effect, duration) => {
  if (!element) {
    return;
  }
  if (element.children.length > 0) {
    for (let i = 0; i < element.children.length; i++) {
      recursiveAnimate(element.children[i], effect, duration);
    }
  }
  animateWithEffect(element, effect, duration);
};

const animateWithEffect = (element, effect, duration) => {
  console.log(duration);
  if (effect === "fade") {
    animateWithFade(element, duration);
  } else if (effect === "scale") {
    animateWithScale(element, duration);
  } else {
    defaultAnimate(element);
  }
};

const defaultAnimate = (element) => {
  autoAnimate(element);
};

const animateWithScale = (element, duration) => {
  autoAnimate(element, (el, action) => {
    let keyframes;
    if (action === "add") {
      keyframes = [
        { transform: "scale(0)", filter: "blur(5px)", opacity: 0 },
        { transform: "scale(.5)", opacity: 0.1 },
        { transform: "scale(1)", opacity: 1 },
      ];
    }
    if (action === "remove") {
      keyframes = [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(0)", filter: "blur(5px)", opacity: 0 },
      ];
    }
    return new KeyframeEffect(el, keyframes, {
      duration: duration || 300,
      easing: "ease-out",
    });
  });
};

const animateWithFade = (element, duration) => {
  autoAnimate(element, (el, action) => {
    let keyframes;
    const blur = 20;
    if (action === "add") {
      keyframes = [
        {
          filter: `blur(${blur}px)`,
          transform: "scale(1.2)",
          opacity: 0,
        },
        { opacity: 1 },
      ];
    }
    if (action === "remove") {
      keyframes = [
        { opacity: 1 },
        {
          filter: `blur(${blur}px)`,
          transform: "scale(.8)",
          opacity: 0,
        },
      ];
    }
    console.log(duration);
    return new KeyframeEffect(el, keyframes, {
      duration: duration || 300,
      easing: "ease-out",
    });
  });
};
