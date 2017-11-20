import { USER_SCROLL_EVENTS } from './user-scroll-events';

export function PreventOverScrolling(scrollableArea: HTMLElement): void {
	setEvents(true, scrollableArea);
}

export function EnableOverScrolling(scrollableArea: HTMLElement): void {
	setEvents(false, scrollableArea);
}

function setEvents(enable: boolean, element: HTMLElement): void {
	USER_SCROLL_EVENTS.forEach(event => {
		if (enable) {
			element.addEventListener(event, () => handleOverScroll(element));
		} else {
			element.removeEventListener(event, () => handleOverScroll(element));
		}
	});
}

function handleOverScroll(element: HTMLElement): void {
	const scrollTop = element.scrollTop;

	if (scrollTop === 0) {
		element.scrollTop = 1;
	} else if (scrollTop + element.offsetHeight === element.scrollHeight) {
		element.scrollTop = scrollTop - 1;
	}
}
