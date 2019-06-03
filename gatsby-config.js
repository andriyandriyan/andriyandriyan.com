module.exports = {
	siteMetadata: {
		title: 'Blognya Andriy',
		author: 'Andriy',
		description: 'Fullstack Software Developer',
		siteUrl: 'https://blog.andriyandriyan.now.sh/',
		socials: [
			{
				name: 'mail',
				value: 'mailto:andriy.andriyan1@gmail.com',
			},
			{
				name: 'linkedin',
				value: 'https://www.linkedin.com/in/andriy-andriyan-107820b7/',
			},
			{
				name: 'github',
				value: 'https://github.com/andriyandriyan',
			},
			{
				name: 'telegram',
				value: 'https://t.me/andriyandriyan',
			},
		],
	},
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/blog`,
				name: 'blog',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/assets`,
				name: 'assets',
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
						options: {
							wrapperStyle: 'margin-bottom: 1.0725rem',
						},
					},
					'gatsby-remark-prismjs',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants',
				],
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-140498923-1',
			},
		},
		'gatsby-plugin-feed',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'Blognya Andriy',
				short_name: 'Blognya Andriy',
				start_url: '/',
				background_color: '#ffffff',
				theme_color: '#1e4b82',
				display: 'standalone',
				icon: 'content/assets/icon.png',
			},
		},
		'gatsby-plugin-offline',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-styled-components',
			options: {
				displayName: process.env.NODE_ENV !== 'production',
			},
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /assets/, // See below to configure properly
				},
			},
		},
		{
			resolve: 'gatsby-plugin-typography',
			options: {
				pathToConfigModule: 'src/utils/typography',
			},
		},
		'gatsby-plugin-catch-links',
	],
}
