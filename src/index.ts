import { ScrollableArea } from './scrollable-area';

let scrollableAreas: ScrollableArea[] = [];

export function PreventOverScrolling(scrollableArea: HTMLElement): void {
  setEvents(true, scrollableArea);
}

export function ReEnableOverScrolling(scrollableArea: HTMLElement): void {
  setEvents(false, scrollableArea);
}

function setEvents(enable: boolean, element: HTMLElement): void {
  let area = scrollableAreas.find(a => a.Element === element);

  if (!area) {
    area = new ScrollableArea(element);
    scrollableAreas.push(area);
  }

  area.SetEventListeners(enable);

  if (!enable) {
    scrollableAreas = scrollableAreas.filter(a => area);
  }
}
