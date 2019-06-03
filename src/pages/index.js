import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import SEO from '../components/seo'

const BlogIndex = ({ data }) => {
	const posts = data.allMarkdownRemark.edges

	return (
		<Layout>
			<SEO
				title="All Posts"
				keywords={['blog', 'software developer', 'front end', 'back end']}
			/>
			{posts.map(({ node }) => {
				const title = node.frontmatter.title || node.fields.slug
				return (
					<div key={node.fields.slug}>
						<h3>
							<Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
								{title}
							</Link>
						</h3>
						<small>{node.frontmatter.date}</small>
						<p
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{
								__html: node.excerpt,
							}}
						/>
					</div>
				)
			})}
		</Layout>
	)
}

BlogIndex.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	data: PropTypes.object.isRequired,
}

export default BlogIndex

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "DD MMM YYYY")
						title
					}
				}
			}
		}
	}
`
