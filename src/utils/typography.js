import Typography from 'typography'
import doelgerTheme from 'typography-theme-doelger'

doelgerTheme.overrideStyles = () => ({
	a: {
		boxShadow: 'none',
		textDecoration: 'none',
		color: '#1e4b82',
	},
	code: {
		fontSize: '.85rem !important',
	},
})

const typography = new Typography(doelgerTheme)

// Export helper functions

if (process.env.NODE_ENV !== 'production') {
	typography.injectStyles()
}

export const { scale, rhythm, options } = typography
export default typography
