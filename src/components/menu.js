import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Menu = styled.nav`
	margin-bottom: 1.625rem;
`

const MenuList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`

const MenuListItem = styled.li`
	padding: 0;
	margin: 0.625rem 0;
`

const ItemLink = styled(Link)`
	font-size: 1rem;
	color: #222;
	font-weight: 400;
	border: 0;
	text-decoration: none;
	box-shadow: none;
`

export default () => (
	<Menu>
		<MenuList>
			<MenuListItem>
				<ItemLink to="/about">About Me</ItemLink>
			</MenuListItem>
		</MenuList>
	</Menu>
)
