import type { TranslationKey } from '$lib/i18n.svelte';

export type ProjectStatus = 'stable' | 'wip';

export type Project = {
	/** Stable id, also used for anchors and structured data. */
	id: string;
	name: string;
	blurbKey: TranslationKey;
	language: string;
	/** SPDX id when the repository declares one. */
	license?: string;
	status: ProjectStatus;
	href: string;
	repo: string;
	/** Real screenshot of the project's live site, under static/. */
	shot?: string;
	featured?: boolean;
};

export type ProjectGroup = {
	id: string;
	labelKey: TranslationKey;
	descKey: TranslationKey;
	projects: Project[];
};

export const org = {
	name: 'TheMadOrg',
	/** Public website (GitHub Pages custom domain). */
	site: 'https://themadorg.net',
	github: 'https://github.com/themadorg',
	siteRepo: 'https://github.com/themadorg/themadorg.github.io',
	email: 'hello@themadorg.net',
	/** What we make, shown wherever a return address would carry a place. */
	makes: ['Madmail', 'Bedrud', 'Madcore'],
	logo: '/logo.png'
};

export const projectGroups: ProjectGroup[] = [
	{
		id: 'relay',
		labelKey: 'group_relay_label',
		descKey: 'group_relay_desc',
		projects: [
			{
				id: 'madmail',
				name: 'Madmail',
				blurbKey: 'project_madmail_blurb',
				language: 'Rust',
				license: 'AGPL-3.0',
				status: 'stable',
				href: 'https://madmail.chat',
				repo: 'https://github.com/themadorg/madmail',
				shot: '/stamps/madmail.webp',
				featured: true
			},
			{
				id: 'madexchanger',
				name: 'Madexchanger',
				blurbKey: 'project_madexchanger_blurb',
				language: 'Go',
				license: 'GPL-3.0',
				status: 'wip',
				href: 'https://github.com/themadorg/madexchanger',
				repo: 'https://github.com/themadorg/madexchanger'
			},
			{
				id: 'madexchanger-php',
				name: 'Madexchanger-php',
				blurbKey: 'project_madexchanger_php_blurb',
				language: 'PHP',
				status: 'stable',
				href: 'https://github.com/themadorg/madexchanger-php',
				repo: 'https://github.com/themadorg/madexchanger-php'
			}
		]
	},
	{
		id: 'meet',
		labelKey: 'group_meet_label',
		descKey: 'group_meet_desc',
		projects: [
			{
				id: 'bedrud',
				name: 'Bedrud',
				blurbKey: 'project_bedrud_blurb',
				language: 'Go',
				license: 'AGPL-3.0',
				status: 'stable',
				href: 'https://bedrud.org',
				repo: 'https://github.com/themadorg/bedrud',
				shot: '/stamps/bedrud.webp',
				featured: true
			}
		]
	},
	{
		id: 'operate',
		labelKey: 'group_operate_label',
		descKey: 'group_operate_desc',
		projects: [
			{
				id: 'madmail-admin',
				name: 'Madmail Admin',
				blurbKey: 'project_madmail_admin_blurb',
				language: 'TypeScript',
				license: 'GPL-3.0',
				status: 'stable',
				href: 'https://admin.madmail.chat',
				repo: 'https://github.com/themadorg/madmail-admin-web',
				shot: '/stamps/madmail-admin.webp'
			},
			{
				id: 'relay-ping',
				name: 'Relay Ping',
				blurbKey: 'project_relay_ping_blurb',
				language: 'Go',
				status: 'stable',
				href: 'https://github.com/themadorg/relay-ping',
				repo: 'https://github.com/themadorg/relay-ping'
			}
		]
	},
	{
		id: 'sdk',
		labelKey: 'group_sdk_label',
		descKey: 'group_sdk_desc',
		projects: [
			{
				id: 'madcore',
				name: 'Madcore',
				blurbKey: 'project_madcore_blurb',
				language: 'TypeScript',
				license: 'LGPL-3.0-or-later',
				status: 'wip',
				href: 'https://github.com/themadorg/madcore',
				repo: 'https://github.com/themadorg/madcore'
			}
		]
	},
	{
		id: 'learn',
		labelKey: 'group_learn_label',
		descKey: 'group_learn_desc',
		projects: [
			{
				id: 'deltachat-wiki',
				name: 'Delta Chat Wiki',
				blurbKey: 'project_deltachat_wiki_blurb',
				language: 'Svelte',
				license: 'GPL-3.0',
				status: 'stable',
				href: 'https://deltachat.wiki',
				repo: 'https://github.com/themadorg/deltachat-wiki',
				shot: '/stamps/deltachat-wiki.webp'
			}
		]
	}
];

export const allProjects: Project[] = projectGroups.flatMap((g) => g.projects);

export const principleKeys = [
	{ titleKey: 'principle_selfhosted_title', bodyKey: 'principle_selfhosted_body' },
	{ titleKey: 'principle_encrypted_title', bodyKey: 'principle_encrypted_body' },
	{ titleKey: 'principle_lowops_title', bodyKey: 'principle_lowops_body' },
	{ titleKey: 'principle_opensource_title', bodyKey: 'principle_opensource_body' }
] as const satisfies ReadonlyArray<{ titleKey: TranslationKey; bodyKey: TranslationKey }>;

/** The four people the envelope can be addressed to. Funders lead. */
export type Role = 'funders' | 'selfhosters' | 'developers' | 'contributors';

export const roles: ReadonlyArray<{
	id: Role;
	labelKey: TranslationKey;
	lineKey: TranslationKey;
	actionKey: TranslationKey;
	actionHref: string;
	altKey: TranslationKey;
	altHref: string;
}> = [
	{
		id: 'funders',
		labelKey: 'role_funders',
		lineKey: 'role_funders_line',
		actionKey: 'role_funders_action',
		actionHref: `mailto:${org.email}?subject=${encodeURIComponent('Funding TheMadOrg')}`,
		altKey: 'role_funders_alt',
		altHref: '#fund'
	},
	{
		id: 'selfhosters',
		labelKey: 'role_selfhosters',
		lineKey: 'role_selfhosters_line',
		actionKey: 'role_selfhosters_action',
		actionHref: '#self-host',
		altKey: 'role_selfhosters_alt',
		altHref: 'https://madmail.chat'
	},
	{
		id: 'developers',
		labelKey: 'role_developers',
		lineKey: 'role_developers_line',
		actionKey: 'role_developers_action',
		actionHref: org.github,
		altKey: 'role_developers_alt',
		altHref: 'https://github.com/themadorg/madcore'
	},
	{
		id: 'contributors',
		labelKey: 'role_contributors',
		lineKey: 'role_contributors_line',
		actionKey: 'role_contributors_action',
		actionHref: org.github,
		altKey: 'role_contributors_alt',
		altHref: 'https://github.com/themadorg/deltachat-wiki'
	}
];

/** FAQ entries. Rendered on the page and mirrored into FAQPage structured data. */
export const faqKeys = [
	{ q: 'faq_what_q', a: 'faq_what_a' },
	{ q: 'faq_chatmail_q', a: 'faq_chatmail_a' },
	{ q: 'faq_deltachat_q', a: 'faq_deltachat_a' },
	{ q: 'faq_free_q', a: 'faq_free_a' },
	{ q: 'faq_selfhost_q', a: 'faq_selfhost_a' },
	{ q: 'faq_fund_q', a: 'faq_fund_a' }
] as const satisfies ReadonlyArray<{ q: TranslationKey; a: TranslationKey }>;

/** Real install commands, copied from each project's README / site. */
export const installs = [
	{
		id: 'madmail',
		name: 'Madmail',
		titleKey: 'install_madmail_title',
		noteKey: 'install_madmail_note',
		docs: 'https://github.com/themadorg/madmail#readme',
		command: [
			`ARCH=$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/')`,
			'curl -fsSL "https://github.com/themadorg/madmail/releases/latest/download/madmail-linux-${ARCH}" -o madmail',
			'chmod +x madmail',
			'sudo ./madmail install --simple --ip YOUR_IP'
		].join('\n')
	},
	{
		id: 'bedrud',
		name: 'Bedrud',
		titleKey: 'install_bedrud_title',
		noteKey: 'install_bedrud_note',
		docs: 'https://bedrud.org',
		command: 'curl -fsSL https://bedrud.org/install.sh | bash'
	}
] as const satisfies ReadonlyArray<{
	id: string;
	name: string;
	titleKey: TranslationKey;
	noteKey: TranslationKey;
	docs: string;
	command: string;
}>;
