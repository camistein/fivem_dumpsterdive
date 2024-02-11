window.addEventListener('message', (event: MessageEvent) => {
	switch (event.data.action) {
		case 'dv_progressbar_open':
			DV_ProgressBar.open(event.data);
			break;
		case 'dv_progressbar_close':
		default:
			DV_ProgressBar.close();
			break;
	}
});

interface ProgressBarSettings {
	duration: number;
	label: string;
}

const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

const DV_ProgressBar = {
	getProgressBar: () => {
		return document.getElementById('dv-progressbar') as HTMLElement;
	},
	getProgressBarContainer: () => {
		return document.getElementById('dv-progressbar-wrapper') as HTMLElement;
	},
	getProgressBarLabel: () => {
		return document.getElementById('dv-progressbar-label') as HTMLElement;
	},
	open: (settings: ProgressBarSettings) => {
		const container = DV_ProgressBar.getProgressBarContainer();
		container.style.display = 'flex';

		const progressbar = DV_ProgressBar.getProgressBar();
		progressbar.style.width = '0%';

		const label = DV_ProgressBar.getProgressBarLabel();

		label.textContent = settings.label;

		const textContent = document.getElementById(
			'dv-progressbar-text',
		) as HTMLElement;
		if (!!textContent) {
			const textContentAnimation = async () => {
				const percentageOfDuration = settings.duration / 10;
				let percentage = 0;
				for (let i = 0; i < settings.duration; i += percentageOfDuration) {
					textContent.textContent = `${percentage}%`;
					percentage += 10;
					await delay(percentageOfDuration);
				}
			};

			textContentAnimation();
		}

		const animation = progressbar.animate(
			[
				{ width: '0' },
				{ width: '10%' },
				{ width: '20%' },
				{ width: '30%' },
				{ width: '40%' },
				{ width: '50%' },
				{ width: '60%' },
				{ width: '70%' },
				{ width: '80%' },
				{ width: '90%' },
				{ width: '100%' },
			],
			settings.duration,
		);

		animation.finished.then(() => {
			DV_ProgressBar.close();
			fetch(`https://dumpsterdive/dumpsterdive:Finished`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=UTF-8',
				},
			})
				.then((resp) => resp.json())
				.then((resp) => console.log(resp));
		});
	},
	close: () => {
		const container = DV_ProgressBar.getProgressBarContainer();
		container.style.display = 'none';
		const progressbar = DV_ProgressBar.getProgressBar();
		progressbar.style.width = '0%';
	},
};
