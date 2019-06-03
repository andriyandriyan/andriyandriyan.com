import styled from 'styled-components'
import { Link } from 'gatsby'

export const HomeButton = styled(Link)`
    display: block;
    max-width: 6.625rem;
    padding: 0 1.5rem;
    line-height: 2.1875rem;
    text-align: center;
    color: #222;
    border: 1px solid #e6e6e6;
    border-radius: 1.25rem;
    font-size: 1rem;
    font-weight: 400;
    margin-left: auto;
    margin-right: auto;
	margin-top: 1.625rem;
	text-decoration: none;
	
	@media screen and (min-width: 960px) {
		position: fixed;
		margin: 0;
		top: 30px;
		left: 30px;
	}
`

export const Content = styled.div`
	max-width: 59.0625rem;
	padding: 0 .9375rem;
	margin: 0 auto;

	@media screen and (min-width: 960px) {
		padding: 0;
	}
`

export const ContentTitle = styled.h1`
	font-size: 2rem;
	max-width: 42rem;
	font-weight: 600;
	text-align: center;
	line-height: 2.68125rem;
	margin: 1.625rem auto 0;

	@media screen and (min-width: 960px) {
		font-size: 3rem;
		line-height: 3.65625rem;
		margin-top: 3.65625rem;
		margin-bottom: 2.4375rem;
	}
`

export const ContentPublishDate = styled.p`
	max-width: 42rem;
	margin-left: auto;
	margin-right: auto;
`

export const ContentBody = styled.div`
	@media screen and (min-width: 960px) {
		font-size: 1.125rem;
		line-height: 1.82813rem;
		margin-bottom: 1.82813rem;
		max-width: 42rem;
		margin-left: auto;
		margin-right: auto;
	}
`

export const ContentNav = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	list-style: none;
	padding: 0px;
`
