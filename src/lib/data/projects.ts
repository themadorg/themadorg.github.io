import type { TranslationKey } from '$lib/i18n.svelte';

export type ProjectStatus = 'stable' | 'wip';

export type Project = {
	name: string;
	blurbKey: TranslationKey;
	language: string;
	status: ProjectStatus;
	href: string;
	repo: string;
	/** Public path under static/, e.g. /projects/madmail.png */
	logo?: string;
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
	siteRepo: 'https://github.com/themadorg/themadorg.github.io'
};

export const projectGroups: ProjectGroup[] = [
	{
		id: 'meet',
		labelKey: 'group_meet_label',
		descKey: 'group_meet_desc',
		projects: [
			{
				name: 'Bedrud',
				blurbKey: 'project_bedrud_blurb',
				language: 'Go',
				status: 'stable',
				href: 'https://bedrud.org',
				repo: 'https://github.com/themadorg/bedrud',
				featured: true
			}
		]
	},
	{
		id: 'relay',
		labelKey: 'group_relay_label',
		descKey: 'group_relay_desc',
		projects: [
			{
				name: 'Madmail',
				blurbKey: 'project_madmail_blurb',
				language: 'Rust',
				status: 'stable',
				href: 'https://madmail.chat',
				repo: 'https://github.com/themadorg/madmail',
				logo: '/projects/madmail.png',
				featured: true
			},
			{
				name: 'Madexchanger',
				blurbKey: 'project_madexchanger_blurb',
				language: 'Go',
				status: 'wip',
				href: 'https://github.com/themadorg/madexchanger',
				repo: 'https://github.com/themadorg/madexchanger'
			},
			{
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
		id: 'sdk',
		labelKey: 'group_sdk_label',
		descKey: 'group_sdk_desc',
		projects: [
			{
				name: 'Madcore',
				blurbKey: 'project_madcore_blurb',
				language: 'TypeScript',
				status: 'wip',
				href: 'https://github.com/themadorg/madcore',
				repo: 'https://github.com/themadorg/madcore'
			}
		]
	},
	{
		id: 'operate',
		labelKey: 'group_operate_label',
		descKey: 'group_operate_desc',
		projects: [
			{
				name: 'Madmail Admin',
				blurbKey: 'project_madmail_admin_blurb',
				language: 'TypeScript',
				status: 'stable',
				href: 'https://admin.madmail.chat',
				repo: 'https://github.com/themadorg/madmail-admin-web'
			},
			{
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
		id: 'learn',
		labelKey: 'group_learn_label',
		descKey: 'group_learn_desc',
		projects: [
			{
				name: 'Delta Chat Wiki',
				blurbKey: 'project_deltachat_wiki_blurb',
				language: 'Svelte',
				status: 'stable',
				href: 'https://deltachat.wiki',
				repo: 'https://github.com/themadorg/deltachat-wiki',
				logo: '/projects/deltachat-wiki.png'
			}
		]
	}
];

export const principleKeys = [
	{
		titleKey: 'principle_selfhosted_title' as const,
		bodyKey: 'principle_selfhosted_body' as const
	},
	{
		titleKey: 'principle_encrypted_title' as const,
		bodyKey: 'principle_encrypted_body' as const
	},
	{
		titleKey: 'principle_lowops_title' as const,
		bodyKey: 'principle_lowops_body' as const
	},
	{
		titleKey: 'principle_opensource_title' as const,
		bodyKey: 'principle_opensource_body' as const
	}
];
