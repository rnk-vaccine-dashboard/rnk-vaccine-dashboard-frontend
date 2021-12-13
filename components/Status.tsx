import React, { PropsWithChildren } from 'react'

import styles from './Status.module.css'

interface StatusProps {
	label: string
	status: "available" | "unavailable" | "unknown",
	lastUpdated: string
}

const maxDeltaMinutesUntilOld = 10

const Status : React.FC<StatusProps> = ({label, status, lastUpdated}) => {

	const createdDate = new Date(lastUpdated)
	const currentDate = new Date()
	const diff = currentDate.getTime() - createdDate.getTime()

	const diffMinutes = Math.round(diff / 60000)

	const isOld = diffMinutes > maxDeltaMinutesUntilOld

	const statusClass = isOld ? styles['status-unknown'] : styles['status-' + status]


	return (
		<a href="https://c19.rhein-neckar-kreis.de/impftermin" target="_blank" rel="noreferrer" className={`${styles.line} ${statusClass}`}>
			<span className={styles.label}>{label}</span> {diffMinutes}
		</a>
	)
}

export default Status
