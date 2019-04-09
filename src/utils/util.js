export function capitalize(str) {
	if (str === 'spf') return 'SPF';
	return str.replace(/\b\w/g, l => l.toUpperCase())
}

export function camelize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export const isMobile = (userAgent) => {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(userAgent));
}