/**
 * Staggered entrance for a section's direct children, played once when it scrolls into view.
 * Content stays visible without script: the hidden state only applies under `html.js`
 * (see app.css), and reduced-motion users skip the travel entirely.
 */
export function reveal(node: HTMLElement) {
	node.dataset.reveal = '';
	Array.from(node.children).forEach((child, i) => {
		(child as HTMLElement).style.setProperty('--i', String(i));
	});

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('in');
		return;
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in');
					io.disconnect();
				}
			}
		},
		{ rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
	);
	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
}
