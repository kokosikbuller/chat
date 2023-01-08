export function notifyMe(text) {
	new Notification('Message', {
		body: text,
	});
}

export const settingsNotification = () => {
	Notification.requestPermission((per) => {
		if (!('permission' in Notification)) {
			Notification.permission = per;
		}
	});
};
