import { allProjects, faqKeys, installs, org, principleKeys, projectGroups } from '$lib/data/projects';
import en from '$lib/i18n/en.json';
import { supportedLanguages } from '$lib/languages';
import { pageUrl } from '$lib/seo';

type Key = keyof typeof en;
const t = (k: Key) => en[k];

function license(id?: string) {
	return id ? id : 'see repository';
}

/** llms.txt: the short, link-first map (https://llmstxt.org). */
export function llmsTxt(): string {
	const lines: string[] = [
		`# ${org.name}`,
		'',
		`> ${t('pitch')}`,
		'',
		t('faq_what_a'),
		'',
		`Contact (funding, partnerships, press): ${org.email}. GitHub: ${org.github}.`,
		'',
		'## Site',
		'',
		...supportedLanguages.map((l) => `- [${org.name} (${l.name})](${pageUrl(l.code)}): ${l.code} edition of the landing page`),
		`- [Full text for LLMs](${org.site}/llms-full.txt): every section of the page, projects, install commands and FAQ in one file`,
		''
	];

	for (const g of projectGroups) {
		lines.push(`## ${t(g.labelKey)}: ${t(g.descKey).replace(/\.$/, '')}`, '');
		for (const p of g.projects) {
			const status = p.status === 'wip' ? ' (work in progress)' : '';
			lines.push(
				`- [${p.name}](${p.href}): ${t(p.blurbKey)} ${p.language}, license ${license(p.license)}${status}. Source: ${p.repo}`
			);
		}
		lines.push('');
	}

	lines.push(
		'## Optional',
		'',
		`- [Site source](${org.siteRepo}): this website's SvelteKit code`,
		`- [Sitemap](${org.site}/sitemap.xml)`,
		''
	);
	return lines.join('\n');
}

/** llms-full.txt: the whole page as plain Markdown, English edition. */
export function llmsFullTxt(): string {
	const out: string[] = [
		`# ${org.name}: ${t('tagline')}`,
		'',
		`> ${t('pitch')}`,
		'',
		`Website: ${org.site} · Source: ${org.github} · Contact: ${org.email}`,
		`What we make: ${org.makes.join(', ')}`,
		`Languages: ${supportedLanguages.map((l) => `${l.name} ${pageUrl(l.code)}`).join(', ')}`,
		'',
		`## ${t('letter_title')}`,
		'',
		t('letter_intro'),
		'',
		...principleKeys.map((p) => `- **${t(p.titleKey)}.** ${t(p.bodyKey)}`),
		'',
		`## ${t('projects_title')}`,
		'',
		t('projects_lede'),
		''
	];

	for (const g of projectGroups) {
		out.push(`### ${t(g.labelKey)}`, '', t(g.descKey), '');
		for (const p of g.projects) {
			out.push(
				`#### ${p.name}`,
				'',
				t(p.blurbKey),
				'',
				`- Website: ${p.href}`,
				`- Repository: ${p.repo}`,
				`- Language: ${p.language}`,
				`- License: ${license(p.license)}`,
				`- Status: ${p.status === 'wip' ? 'work in progress' : 'available'}`,
				''
			);
		}
	}

	out.push(
		`## ${t('route_title')}`,
		'',
		t('route_lede'),
		'',
		`1. ${t('route_app')}: ${t('route_app_note')}`,
		`2. ${t('route_relay')}: ${t('route_relay_note')}`,
		`3. ${t('route_exchange')}: ${t('route_exchange_note')}`,
		`4. ${t('route_relay2')}: ${t('route_relay2_note')}`,
		`5. ${t('route_app2')}: ${t('route_app2_note')}`,
		'',
		`${t('route_aside_admin')} ${t('route_aside_ping')} ${t('route_aside_wiki')} ${t('route_aside_bedrud')}`,
		'',
		`## ${t('install_title')}`,
		'',
		t('install_lede'),
		''
	);

	for (const i of installs) {
		out.push(`### ${i.name}: ${t(i.titleKey)}`, '', t(i.noteKey), '', '```sh', i.command, '```', '', `Docs: ${i.docs}`, '');
	}

	out.push(
		`## ${t('fund_title')}`,
		'',
		t('fund_body'),
		'',
		`Write to ${org.email}.`,
		'',
		`${t('fund_review_title')}:`,
		'',
		`- ${t('fund_review_code')}`,
		`- ${t('fund_review_licenses')}`,
		`- ${t('fund_review_live')}`,
		'',
		`## ${t('faq_title')}`,
		''
	);

	for (const f of faqKeys) {
		out.push(`### ${t(f.q)}`, '', t(f.a), '');
	}

	out.push(`---`, '', `${allProjects.length} projects. Generated from the site's own data at build time.`, '');
	return out.join('\n');
}
