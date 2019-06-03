import React from 'react'
import PropTypes from 'prop-types'
import Container from './container'
import Sidebar from './sidebar'
import Page from './page'
import Footer from './footer'

const Layout = ({ children, pageTitle }) => (
	<>
		<Container>
			<Sidebar />
			<Page pageTitle={pageTitle}>{children}</Page>
		</Container>
		<Footer />
	</>
)

Layout.defaultProps = {
	pageTitle: '',
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	pageTitle: PropTypes.string,
}

export default Layout
