/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Author from './author'
import Menu from './menu'

const Sidebar = styled.aside`
	width: 100%;

	@media screen and (min-width: 685px) {
		width: calc(41.625% - 1.09375rem);

		:nth-child(12n + 1) {
			clear: both;
		}

		:nth-child(1n) {
			float: left;
			margin-right: 1.875rem;
			clear: none;
		}
	}

	@media screen and (min-width: 960px) {
		width: calc(33.3% - 1.25rem);

		:nth-child(3n + 1) {
			clear: both;
		}

		:nth-child(1n) {
			float: left;
			margin-right: 1.875rem;
			clear: none;
		}
	}
`
const SidebarInner = styled.div`
	position: relative;
	padding: 1.5625rem 1.25rem 0;

	@media screen and (min-width: 685px) {
		padding: 1.875rem 1.25rem 0;

		:after {
			background: #e6e6e6;
			background: linear-gradient(180deg, #e6e6e6 0, #e6e6e6 48%, #fff);
			position: absolute;
			content: '';
			width: 0.0625rem;
			height: 540px;
			top: 30px;
			right: -10px;
			bottom: 0;
		}
	}

	@media screen and (min-width: 960px) {
		padding: 2.5rem;
	}
`

const Contacts = styled.div`
	margin-bottom: 1.625rem;
`

const ContactsList = styled.ul`
	display: flex;
	flex-flow: row wrap;
	flex-grow: 0;
	flex-shrink: 0;
	list-style: none;
	padding: 0;
	margin: 0.625rem -0.1875rem;
	width: 11.75rem;
`

const ContactsListIitem = styled.li`
	padding: 0;
	margin: 0.25rem;
	display: flex;
	align-content: center;
	align-items: center;
	justify-content: center;
	height: 35px;
	width: 2.1875rem;
	line-height: 2.1875rem;
	border-radius: 50%;
	text-align: center;
	border: 1px solid #ebebeb;
`

const ContactsListIitemLink = styled.a`
	border: 0;
	display: flex;
	color: #222;
	display: inline-block;
	width: 1em;
	height: 1em;
	stroke-width: 0;
	stroke: currentColor;
	fill: currentColor;
	font-style: normal;
	font-weight: 400;
	speak: none;
	margin-right: 0.2em;
	text-align: center;
	font-variant: normal;
	text-transform: none;
	line-height: 1em;
	margin-left: 0.2em;
	-webkit-font-smoothing: antialiased;

	:hover {
		color: #1e4b82;
	}
`

const Icon = ({ icon }) => {
	const IconData = require(`../assets/icons/${icon}.svg`)
	return <IconData />
}

Icon.propTypes = {
	icon: PropTypes.string.isRequired,
}

export default () => (
	<Sidebar>
		<SidebarInner>
			<Author />
			<Menu />
			<Contacts>
				<ContactsList>
					<StaticQuery
						query={socialQuery}
						render={data => {
							const { socials } = data.site.siteMetadata
							return socials.map((social, i) => (
								<ContactsListIitem key={i}>
									<ContactsListIitemLink
										aria-label={`${social.name} link`}
										href={social.value}
										target="_blank"
										rel="noopener"
									>
										<Icon icon={social.name} />
									</ContactsListIitemLink>
								</ContactsListIitem>
							))
						}}
					/>
				</ContactsList>
			</Contacts>
		</SidebarInner>
	</Sidebar>
)

const socialQuery = graphql`
	query socialQuery {
		site {
			siteMetadata {
				socials {
					name
					value
				}
			}
		}
	}
`
