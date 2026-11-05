import { allProjects, faqKeys, org } from '$lib/data/projects';
import type { I18n } from '$lib/i18n.svelte';
import { supportedLanguages, type LangCode } from '$lib/languages';

export const ogLocales: Record<LangCode, string> = {
	en: 'en_US',
	fa: 'fa_IR',
	es: 'es_ES',
	ru: 'ru_RU'
};

export const ogImage = {
	url: `${org.site}/og.png`,
	width: 1200,
	height: 630
};

export function pageUrl(lang: string): string {
	return `${org.site}/${lang}/`;
}

/**
 * One JSON-LD graph per locale: who we are, the site, this page, every project,
 * and the FAQ exactly as it is rendered on the page.
 */
export function structuredData(i18n: I18n) {
	const lang = i18n.lang;
	const url = pageUrl(lang);
	const orgId = `${org.site}/#organization`;
	const siteId = `${org.site}/#website`;

	const projects = allProjects.map((p) => ({
		'@type': 'SoftwareSourceCode',
		'@id': `${org.site}/#${p.id}`,
		name: p.name,
		description: i18n.t(p.blurbKey),
		url: p.href,
		codeRepository: p.repo,
		programmingLanguage: p.language,
		...(p.license ? { license: `https://spdx.org/licenses/${p.license}.html` } : {}),
		...(p.shot ? { image: `${org.site}${p.shot}` } : {}),
		creativeWorkStatus: p.status === 'wip' ? 'Draft' : 'Published',
		author: { '@id': orgId },
		isAccessibleForFree: true
	}));

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': orgId,
				name: org.name,
				alternateName: ['The Mad Org', 'TMO', 'themadorg'],
				url: org.site,
				logo: {
					'@type': 'ImageObject',
					url: `${org.site}${org.logo}`,
					width: 512,
					height: 512
				},
				image: ogImage.url,
				slogan: i18n.t('tagline'),
				description: i18n.t('faq_what_a'),
				email: org.email,
				// sameAs is for profiles of this same entity. Project sites are
				// separate things: they are the projects' own `url`s below.
				sameAs: [org.github],
				contactPoint: [
					{
						'@type': 'ContactPoint',
						contactType: 'partnerships',
						email: org.email,
						availableLanguage: ['English', 'Persian', 'Spanish', 'Russian']
					}
				],
				knowsAbout: [
					'Delta Chat',
					'chatmail',
					'email relays',
					'end-to-end encryption',
					'self-hosting',
					'video conferencing',
					'WebXDC'
				]
			},
			{
				'@type': 'WebSite',
				'@id': siteId,
				url: org.site,
				name: org.name,
				description: i18n.t('meta_description'),
				publisher: { '@id': orgId },
				inLanguage: supportedLanguages.map((l) => l.code)
			},
			{
				'@type': 'WebPage',
				'@id': `${url}#webpage`,
				url,
				name: i18n.t('meta_title'),
				description: i18n.t('meta_description'),
				inLanguage: lang,
				isPartOf: { '@id': siteId },
				about: { '@id': orgId },
				primaryImageOfPage: { '@type': 'ImageObject', url: ogImage.url },
				mainEntity: { '@id': `${url}#projects` },
				hasPart: { '@id': `${url}#faq` }
			},
			{
				'@type': 'ItemList',
				'@id': `${url}#projects`,
				name: i18n.t('projects_title'),
				numberOfItems: projects.length,
				itemListElement: projects.map((p, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					item: p
				}))
			},
			{
				'@type': 'FAQPage',
				'@id': `${url}#faq`,
				url: `${url}#faq`,
				inLanguage: lang,
				isPartOf: { '@id': `${url}#webpage` },
				mainEntity: faqKeys.map((f) => ({
					'@type': 'Question',
					name: i18n.t(f.q),
					acceptedAnswer: { '@type': 'Answer', text: i18n.t(f.a) }
				}))
			}
		]
	};
}

/** Serialize for an inline <script>, safe against `</script>` injection. */
export function jsonLd(data: unknown): string {
	const json = JSON.stringify(data).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</script>`;
}
