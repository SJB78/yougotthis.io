const title = 'You Got This | Core Skills Events';
const baseUrl = 'https://yougotthisconf-next.netlify.app';
export default {
	target: 'static',
	head: {
		title,
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: 'A community event series focused on discussing core skills needed for a happy, healthy work life.',
			},
			{
				name: 'msapplication-TileColor',
				content: '#ec4899',
			},
			{
				name: 'msapplication-config',
				content: '/img/brand/browserconfig.xml',
			},
			{
				name: 'theme-color',
				content: '#000000',
			},
			{
				hid: 'og:image',
				property: 'og:image',
				content: baseUrl + '/img/brand/main.png',
			},
			{
				property: 'og:image:height',
				content: '627',
			},
			{
				property: 'og:image:width',
				content: '1200',
			},
			{
				hid: 'og:description',
				property: 'og:description',
				content: 'A community event series focused on discussing core skills needed for a happy, healthy work life.',
			},
		],
		link: [
			{ rel: 'shortcut icon', href: '/img/brand/favicon.ico' },
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/img/brand/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/img/brand/favicon-16x16.png',
			},
			{ rel: 'manifest', href: '/img/brand/site.webmanifest' },
			{
				rel: 'mask-icon',
				href: '/img/brand/safari-pinned-tab.svg',
				color: '#ec4899',
			},
		],
	},
	components: true,
	plugins: [
		{ src: '~/plugins/plyr.js', mode: 'client' },
		{ src: '~/plugins/simple-analytics.js', mode: 'client' },
	],
	buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/moment', '@nuxtjs/color-mode', '@nuxt/image'],
	modules: ['@nuxt/content', '@nuxtjs/feed', '@nuxtjs/markdownit'],
	moment: {
		timezone: true,
	},
	image: {
		provider: 'netlify',
	},
	feed: [
		{
			path: '/feed.xml',
			cacheTime: 1000 * 60 * 15,
			type: 'rss2',
			async create(feed) {
				feed.options = {
					title: 'You Got This | Core Skills Events',
					description: "Let's talk about core skills",
					link: 'https://yougotthis.io/feed.xml',
				};

				const { $content } = require('@nuxt/content');
				const talks = await $content('talks')
					.sortBy('date', 'desc')
					.fetch();

				talks.forEach(item => {
					const url = `https://yougotthis.io/talks/${item.slug}`;
					feed.addItem({
						title: item.talk.title,
						id: url,
						link: url,
						description: item.talk.abstract,
						author: item.speakers.map(s => s.name).join(' & '),
						pubDate: item.date,
					});
				});
			},
		},
	],
	colorMode: {
		classSuffix: '',
	},
	env: {
		title,
		baseUrl,
	},
};
