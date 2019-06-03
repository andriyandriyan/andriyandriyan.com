import styled from 'styled-components'

const Container = styled.div`
	max-width: 66.875rem;
	margin-left: auto;
	margin-right: auto;

	:before {
		content: '';
		display: table;
	}

	:after {
		content: '';
		display: table;
		clear: both;
	}
`
export default Container
