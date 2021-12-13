import React, { PropsWithChildren } from 'react'

import styles from './StatusLine.module.css'

interface StatusLineProps {
	isHeading?: boolean
}

const StatusLine : React.FC<PropsWithChildren<StatusLineProps>> = ({children, isHeading = false}) => {
	return (
		<div className={`${styles.line} ${isHeading ? styles.isHeading : ''}`}>
			{children}
		</div>
	)
}

export default StatusLine
