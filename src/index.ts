import { USER_SCROLL_EVENTS, USER_SCROLL_KEYBOARD_EVENTS } from './user-scroll-events';
import { IPosition } from './models';
import { EKeyCodes } from './keycodes';

let touchStart: IPosition;
let hasFocus = false;

export function PreventOverScrolling(scrollableArea: HTMLElement): void {
	setEvents(true, scrollableArea);
}

export function ReEnableOverScrolling(scrollableArea: HTMLElement): void {
	setEvents(false, scrollableArea);
}

function setEvents(enable: boolean, scrollableArea: HTMLElement): void {
	USER_SCROLL_EVENTS.forEach(eventType => {
		if (enable) {
			scrollableArea.addEventListener(eventType, event => handleOverScroll(event, scrollableArea));
		} else {
			scrollableArea.removeEventListener(eventType, event => handleOverScroll(event, scrollableArea));
		}
	});

	if (enable) {
		scrollableArea.addEventListener('touchstart', handleTouchStart);
		window.addEventListener('keydown', event => handleOverScroll(event, scrollableArea));
		window.addEventListener('click', event => handleClick(event, scrollableArea));
	} else {
		scrollableArea.removeEventListener('touchstart', handleTouchStart);
		window.removeEventListener('keydown', event => handleOverScroll(event, scrollableArea));
		window.removeEventListener('click', event => handleClick(event, scrollableArea));
	}
}

function handleTouchStart(event: TouchEvent): void {
	const touch = event.touches[0];
	touchStart = {
		x: touch.clientX,
		y: touch.clientY,
	};
}

function handleOverScroll(event: Event, scrollableArea: HTMLElement): void {
	const eventType = event.type;

	if (eventType !== 'mousedown') {
		const scrollY = scrollableArea.scrollTop;
		let deltaY: number | undefined;

		if (eventType === 'keydown') {
			const tagName = (<HTMLElement>event.srcElement).tagName.toLowerCase();
			const keyCode = (<KeyboardEvent>event).keyCode;
			if (hasFocus && tagName !== 'input' && tagName !== 'textarea' && USER_SCROLL_KEYBOARD_EVENTS.includes(keyCode)) {
				switch (keyCode) {
					case EKeyCodes.Up:
					case EKeyCodes.PageUp:
					case EKeyCodes.Home:
						deltaY = -1;
						break;
					default:
						deltaY = 1;
				}
			}
		} else if (eventType === 'touchmove') {
			deltaY = touchStart.y - (<TouchEvent>event).touches[0].clientY;
		} else {
			deltaY = (<MouseWheelEvent>event).deltaY;
		}

		if (deltaY) {
			// Handle -0 also
			if (deltaY.toString().includes('-')) {
				if (scrollY === 0) {
					event.preventDefault();
				}
			} else {
				if (scrollY + scrollableArea.offsetHeight === scrollableArea.scrollHeight) {
					event.preventDefault();
				}
			}
		}
	}
}

function handleClick(event: Event, scrollableArea: HTMLElement): void {
	const source = <HTMLElement>event.srcElement;

	if (source === scrollableArea || scrollableArea.contains(source)) {
		hasFocus = true;
	} else {
		hasFocus = false;
	}
}
