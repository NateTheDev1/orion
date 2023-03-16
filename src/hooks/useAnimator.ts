import { useEffect, useRef } from 'react';
import { Animator } from '../animator';

export type AnimatorMethods = {
  fadeIn: (element: HTMLElement, duration?: number, easing?: string) => void;
  fadeOut: (element: HTMLElement, duration?: number, easing?: string) => void;
  slideIn: (element: HTMLElement, direction?: string, distance?: string, duration?: number, easing?: string) => void;
  slideOut: (element: HTMLElement, direction?: string, distance?: string, duration?: number, easing?: string) => void;
  zoomIn: (element: HTMLElement, duration?: number, easing?: string) => void;
  zoomOut: (element: HTMLElement, duration?: number, easing?: string) => void;
};

export const useAnimator = (): AnimatorMethods => {
  const animatorRef = useRef<null | Animator>(null);

  useEffect(() => {
    animatorRef.current = new Animator();

    return () => {
      animatorRef.current = null;
    };
  }, []);

  const fadeIn = (element: HTMLElement, duration = 1000, easing = 'ease-in-out'): void => {
    if (animatorRef.current) {
      animatorRef.current.fade_in(element, duration, easing);
    }
  };

  const fadeOut = (element: HTMLElement, duration = 1000, easing = 'ease-in-out'): void => {
    if (animatorRef.current) {
      animatorRef.current.fade_out(element, duration, easing);
    }
  };

  const slideIn = (
    element: HTMLElement,
    direction = 'left',
    distance = '100%',
    duration = 1000,
    easing = 'ease-in-out',
  ): void => {
    if (animatorRef.current) {
      animatorRef.current.slide_in(element, direction, distance, duration, easing);
    }
  };

  const slideOut = (
    element: HTMLElement,
    direction = 'left',
    distance = '100%',
    duration = 1000,
    easing = 'ease-in-out',
  ): void => {
    if (animatorRef.current) {
      animatorRef.current.slide_out(element, direction, distance, duration, easing);
    }
  };

  const zoomIn = (element: HTMLElement, duration = 1000, easing = 'ease-in-out'): void => {
    if (animatorRef.current) {
      animatorRef.current.zoom_in(element, duration, easing);
    }
  };

  const zoomOut = (element: HTMLElement, duration = 1000, easing = 'ease-in-out'): void => {
    if (animatorRef.current) {
      animatorRef.current.zoom_out(element, duration, easing);
    }
  };

  return { fadeIn, fadeOut, slideIn, slideOut, zoomIn, zoomOut };
};
