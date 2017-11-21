import { USER_SCROLL_EVENTS, USER_SCROLL_KEYBOARD_EVENTS } from './user-scroll-events';
import { IPosition } from './models';
import { EKeyCodes } from './keycodes';

const win = window;

export class ScrollableArea {
	private touchStart: IPosition;
	private hasFocus: boolean = false;

	constructor(public Element: HTMLElement) {}

	public SetEventListeners(enable: boolean): void {
		USER_SCROLL_EVENTS.forEach(eventType => {
			if (enable) {
				this.Element.addEventListener(eventType, this.handleOverScroll.bind(this));
			} else {
				this.Element.removeEventListener(eventType, this.handleOverScroll.bind(this));
			}
		});

		if (enable) {
			this.Element.addEventListener('touchstart', this.handleTouchStart.bind(this));
			win.addEventListener('keydown', this.handleOverScroll.bind(this));
			win.addEventListener('click', this.handleClick.bind(this));
		} else {
			this.Element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
			win.removeEventListener('keydown', this.handleOverScroll.bind(this));
			win.removeEventListener('click', this.handleClick.bind(this));
		}
	}

	private handleTouchStart(event: TouchEvent): void {
		const touch = event.touches[0];
		this.touchStart = {
			x: touch.clientX,
			y: touch.clientY,
		};
	}

	private handleClick(event: Event): void {
		const source = <HTMLElement>event.srcElement;

		if (source === this.Element || this.Element.contains(source)) {
			this.hasFocus = true;
		} else {
			this.hasFocus = false;
		}
	}

	private handleOverScroll(event: Event): void {
		const eventType = event.type;

		if (eventType !== 'mousedown') {
			const scrollY = this.Element.scrollTop;
			let deltaY: number | undefined;

			if (eventType === 'keydown') {
				const tagName = (<HTMLElement>event.srcElement).tagName.toLowerCase();
				const keyCode = (<KeyboardEvent>event).keyCode;
				if (this.hasFocus && tagName !== 'input' && tagName !== 'textarea' && USER_SCROLL_KEYBOARD_EVENTS.includes(keyCode)) {
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
				deltaY = this.touchStart.y - (<TouchEvent>event).touches[0].clientY;
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
					if (scrollY + this.Element.offsetHeight === this.Element.scrollHeight) {
						event.preventDefault();
					}
				}
			}
		}
	}
}
