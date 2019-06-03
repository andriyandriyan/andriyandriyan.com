import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
	text-align: center;
	margin-bottom: 2rem;
`

export default () => (
	<Footer>
		©
		{new Date().getFullYear()}
		, Made with ❤️ using
		{' '}
		<a href="https://www.gatsbyjs.org">Gatsby</a>
		.
		{' '}
		Hosted on
		{' '}
		<a href="https://zeit.co">ZEIT Now</a>
		.
	</Footer>
)
