import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

const Photo = styled(Image)`
	display: inline-block;
	margin-bottom: 0;
	border-radius: 50%;
	background-clip: padding-box;
	border: 0;
	max-width: 100%;
`

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 600;
	line-height: 1.82813rem;
	margin: 0.8125rem 0;
`

const TitleLink = styled(Link)`
	color: #222;
	text-decoration: none;
	box-shadow: none;
`

const Subtitle = styled.p`
	color: #777575;
	line-height: 1.625rem;
	margin-bottom: 1.625rem;
`

export default () => (
	<StaticQuery
		query={authorQuery}
		render={data => {
			const { author } = data.site.siteMetadata
			return (
				<div>
					<Link to="/">
						<Photo
							fixed={data.avatar.childImageSharp.fixed}
							alt={author}
							width="75"
							height="75"
						/>
					</Link>
					<Title>
						<TitleLink to="/">Andriy</TitleLink>
					</Title>
					<Subtitle>A Muslim. A Fullstack Software Developer</Subtitle>
				</div>
			)
		}}
	/>
)

const authorQuery = graphql`
	query authorQuery {
		avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
			childImageSharp {
				fixed(width: 50, height: 50) {
					...GatsbyImageSharpFixed
				}
			}
		}
		site {
			siteMetadata {
				author
			}
		}
	}
`
