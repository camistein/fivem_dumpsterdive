window.addEventListener('message', (event: MessageEvent) => {
	switch (event.data.action) {
		case 'dv_notify_open':
			DV_Notify.open(event.data);
			break;
		case 'dv_notify_close':
		default:
			DV_Notify.close();
			break;
	}
});

interface NotifySettings {
	text: string;
}

const DV_Notify = {
	getNotifyWrapper: () => {
		return document.getElementById('dv-notify-wrapper') as HTMLElement;
	},
	getTextContainer: () => {
		return document.getElementById('dv-notify-content') as HTMLElement;
	},
	getTextComponent: () => {
		return document.getElementById('dv-notify-text') as HTMLElement;
	},
	open: (settings: NotifySettings) => {
		const wrapper = DV_Notify.getNotifyWrapper();
		wrapper.style.display = 'flex';

		const label = DV_Notify.getTextComponent();
		label.innerHTML = settings.text;

		const container = DV_Notify.getTextContainer();

		const animation = container.animate(
			[
				{ opacity: '0', marginTop: '-100px', offset: 0 },
				{ opacity: '1', marginTop: '0', offset: 0.2 },
				{ opacity: '1', marginTop: '0', offset: 0.8 },
				{ marginTop: '-50px', offset: 0.9 },
				{ opacity: '0', marginTop: '-100px', offset: 1 },
			],
			5000,
		);

		animation.finished.then(() => {
			wrapper.style.display = 'none';
			wrapper.style.marginTop = '-100px';
		});
	},
	close: () => {
		const wrapper = DV_Notify.getNotifyWrapper();
		wrapper.style.display = 'none';
	},
};
