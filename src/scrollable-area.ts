import { USER_SCROLL_EVENTS, USER_SCROLL_KEYBOARD_EVENTS } from './user-scroll-events';
import { Position } from './models';

const win = window;

export class ScrollableArea {
  /**
   * Reference to the position where the touch was started
   */
  private touchStart: Position;

  /**
   * Whether the provided element is focused
   */
  private focused: boolean = false;

  constructor(public element: HTMLElement) {}

  /**
   * Adds all the necessary event listeners for the given element
   */
  public setEventListeners(enable: boolean): void {
    USER_SCROLL_EVENTS.forEach(eventType => {
      if (enable) {
        this.element.addEventListener(eventType, event => this.handleScroll(event));
      } else {
        this.element.removeEventListener(eventType, event => this.handleScroll(event));
      }
    });

    if (enable) {
      this.element.addEventListener('touchstart', event => this.handleTouchStart(event));
      win.addEventListener('keydown', event => this.handleScroll(event));
      win.addEventListener('click', event => this.handleClick(event));
    } else {
      this.element.removeEventListener('touchstart', event => this.handleTouchStart(event));
      win.removeEventListener('keydown', event => this.handleScroll(event));
      win.removeEventListener('click', event => this.handleClick(event));
    }
  }

  /**
   * Handles a touch start event
   */
  private handleTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];

    this.touchStart = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  /**
   * Handles a click event
   */
  private handleClick(event: Event): void {
    const source = event.target as HTMLElement;

    if (source === this.element || this.element.contains(source)) {
      this.focused = true;
    } else {
      this.focused = false;
    }
  }

  /**
   * Handles a scroll event
   */
  private handleScroll(event: Event): void {
    const eventType = event.type;

    if (eventType !== 'mousedown') {
      const scrollY = this.element.scrollTop;
      let deltaY: number | undefined;

      if (eventType === 'keydown') {
        const tagName = (event.target as HTMLElement).tagName;
        const keyCode = (event as KeyboardEvent).key;
        if (this.focused && tagName !== 'INPUT' && tagName !== 'TEXTAREA' && USER_SCROLL_KEYBOARD_EVENTS.includes(keyCode)) {
          switch (keyCode) {
            case 'ArrowUp':
            case 'PageUp':
            case 'Home':
              deltaY = -1;
              break;
            default:
              deltaY = 1;
          }
        }
      } else if (eventType === 'touchmove') {
        deltaY = this.touchStart.y - (event as TouchEvent).touches[0].clientY;
      } else {
        deltaY = (event as WheelEvent).deltaY;
      }

      if (deltaY) {
        // Handle -0 also
        if (deltaY.toString().includes('-')) {
          if (scrollY === 0) {
            event.preventDefault();
          }
        } else {
          if (scrollY + this.element.offsetHeight === this.element.scrollHeight) {
            event.preventDefault();
          }
        }
      }
    }
  }
}
