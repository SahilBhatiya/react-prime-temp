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
  autoAnimate(element, (el, action, oldCoords, newCoords) => {
    let keyframes;
    if (action === "add") {
      keyframes = [
        {
          transform: "scale(0.5) translateX(200%) ",
          transformStyle: "preserve-3d",
          transformOrigin: "right center",
          opacity: 0,
        },
        { transform: "scale(1)", transformStyle: "preserve-3d", opacity: 1 },
      ];
    }
    if (action === "remove") {
      keyframes = [
        { transform: "scale(1)", transformStyle: "preserve-3d", opacity: 1 },
        {
          transform: "scale(0.5) translateX(200%) ",
          transformStyle: "preserve-3d",
          transformOrigin: "right center",
          opacity: 0,
        },
      ];
    }
    return new KeyframeEffect(el, keyframes, {
      duration: duration || 300,
      easing: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
    });
  });
};

const animateWithFade = (element, duration) => {
  autoAnimate(element, (el, action) => {
    let keyframes;
    const _blur = 10;
    const _highScale = 1.4;
    const _lowScale = 0.6;
    if (action === "add") {
      keyframes = [
        {
          filter: `blur(${_blur}px)`,
          transform: `scale(${_highScale})`,
          opacity: 0,
        },
        { opacity: 1 },
      ];
    }
    if (action === "remove") {
      keyframes = [
        { opacity: 1 },
        {
          filter: `blur(${_blur}px)`,
          transform: `scale(${_lowScale})`,
          opacity: 0,
        },
      ];
    }
    return new KeyframeEffect(el, keyframes, {
      duration: duration || 300,
      easing: "ease-out",
    });
  });
};
