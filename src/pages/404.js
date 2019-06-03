import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title="404: Not Found" />
			<h1>Not Found</h1>
			<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
		</Layout>
	)
}

NotFoundPage.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	data: PropTypes.object.isRequired,
	location: PropTypes.string.isRequired,
}

export default NotFoundPage

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`
