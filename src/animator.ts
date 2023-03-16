import { AnimatorInterface } from './types';

export class Animator implements AnimatorInterface {
  public fade_in(element: HTMLElement, duration = 1000, easing = 'ease-in-out'): void {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ${easing}`;
    element.style.opacity = '1';
  }

  public fade_out(element: HTMLElement, duration = 1000, easing = 'ease-in-out'): void {
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ${easing}`;
    element.style.opacity = '0';
  }

  public slide_in(
    element: HTMLElement,
    direction = 'left',
    distance = '100%',
    duration = 1000,
    easing = 'ease-in-out',
  ): void {
    element.style.transform = `translate${direction}(${distance})`;
    element.style.transition = `transform ${duration}ms ${easing}`;
    element.style.transform = 'translate(0)';
  }

  public slide_out(
    element: HTMLElement,
    direction = 'left',
    distance = '100%',
    duration = 1000,
    easing = 'ease-in-out',
  ): void {
    element.style.transform = 'translate(0)';
    element.style.transition = `transform ${duration}ms ${easing}`;
    element.style.transform = `translate${direction}(${distance})`;
  }

  public zoom_in(element: HTMLElement, duration = 1000, easing = 'ease-in-out'): void {
    element.style.transform = 'scale(0)';
    element.style.transition = `transform ${duration}ms ${easing}`;
    element.style.transform = 'scale(1)';
  }

  public zoom_out(element: HTMLElement, duration = 1000, easing = 'ease-in-out'): void {
    element.style.transform = 'scale(1)';
    element.style.transition = `transform ${duration}ms ${easing}`;
    element.style.transform = 'scale(0)';
  }

  public slide_and_fade_in(
    element: HTMLElement,
    direction = 'left',
    distance = '100%',
    duration = 1000,
    easing = 'ease-in-out',
  ): void {
    element.style.opacity = '0';
    element.style.transform = `translate${direction}(${distance})`;
    element.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;
    element.style.transform = 'translate(0)';
    element.style.opacity = '1';
  }

  public slide_and_fade_out(
    element: HTMLElement,
    direction = 'left',
    distance = '100%',
    duration = 1000,
    easing = 'ease-in-out',
  ): void {
    element.style.opacity = '1';
    element.style.transform = 'translate(0)';
    element.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;
    element.style.transform = `translate${direction}(${distance})`;
    element.style.opacity = '0';
  }

  public shake(element: HTMLElement, duration = 1000, easing = 'ease-in-out'): void {
    element.style.transform = 'translateX(0)';
    element.style.transition = `transform ${duration}ms ${easing}`;
    element.style.transform = 'translateX(-10px)';
    setTimeout(() => {
      element.style.transform = 'translateX(10px)';
      setTimeout(() => {
        element.style.transform = 'translateX(-5px)';
        setTimeout(() => {
          element.style.transform = 'translateX(5px)';
          setTimeout(() => {
            element.style.transform = 'translateX(0)';
          }, duration / 5);
        }, duration / 5);
      }, duration / 5);
    }, duration / 5);
  }
}
