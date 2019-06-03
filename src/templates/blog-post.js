/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import SEO from '../components/seo'
import Container from '../components/container'
import {
	HomeButton,
	Content,
	ContentTitle,
	ContentBody,
	ContentNav,
	ContentPublishDate,
} from '../components/post'
import Footer from '../components/footer'

const BlogPostTemplate = ({ data, pageContext }) => {
	const post = data.markdownRemark
	const { previous, next } = pageContext

	return (
		<>
			<Container>
				<div>
					<HomeButton to="/">Home</HomeButton>
					<div>
						<Content>
							<SEO
								title={post.frontmatter.title}
								description={post.excerpt}
							/>
							<ContentTitle>{post.frontmatter.title}</ContentTitle>
							<ContentPublishDate>
								Published
								{` ${post.frontmatter.date}`}
							</ContentPublishDate>
							<ContentBody dangerouslySetInnerHTML={{ __html: post.html }} />
							<hr />

							<ContentNav>
								<li>
									{previous && (
										<Link to={previous.fields.slug} rel="prev">
											←
											{` ${previous.frontmatter.title}`}
										</Link>
									)}
								</li>
								<li>
									{next && (
										<Link to={next.fields.slug} rel="next">
											{`${next.frontmatter.title} `}
											→
										</Link>
									)}
								</li>
							</ContentNav>
						</Content>
					</div>
				</div>
			</Container>
			<Footer />
		</>
	)
}

BlogPostTemplate.propTypes = {
	data: PropTypes.object.isRequired,
	pageContext: PropTypes.object.isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "DD MMM YYYY")
			}
		}
	}
`
