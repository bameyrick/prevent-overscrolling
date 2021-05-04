import { ScrollableArea } from './scrollable-area';

let scrollableAreas: ScrollableArea[] = [];

/**
 * Prevent overscrolling on a given HTMLElement
 */
export function PreventOverScrolling(scrollableArea: HTMLElement): void {
  setEvents(true, scrollableArea);
}

/**
 * Re-enable overscrolling on a given HTMLElement
 */
export function ReEnableOverScrolling(scrollableArea: HTMLElement): void {
  setEvents(false, scrollableArea);
}

/**
 * Sets the necessary event listenters
 */
function setEvents(enable: boolean, element: HTMLElement): void {
  let area = scrollableAreas.find(a => a.element === element);

  if (!area) {
    area = new ScrollableArea(element);
    scrollableAreas.push(area);
  }

  area.setEventListeners(enable);

  if (!enable) {
    scrollableAreas = scrollableAreas.filter(a => area);
  }
}
