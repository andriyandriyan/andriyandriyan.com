import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const About = () => (
	<Layout pageTitle="About Me">
		<SEO
			title="About Me"
			keywords={[
				'software developer',
				'fullstack',
				'front end',
				'back end',
				'laravel',
				'codeigniter',
				'ionic',
				'react',
				'vue',
				'react native',
				'javascript',
				'php',
				'lumen',
			]}
		/>
		<p>
			I&apos;m a Muslim and I&apos;m also a Fullstack Software Developer from Bekasi
			with industry experience building websites, web applications and
			mobile applications. I specialize in PHP and JavaScript and have
			professional experience working with Lumen and Ionic. I also have
			experience working with Laravel, Vue, React and React Native.
		</p>
	</Layout>
)

export default About
