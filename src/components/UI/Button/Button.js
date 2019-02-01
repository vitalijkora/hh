import React from 'react'
import classes from './Button.scss'

export default props => {
	const cls = [
		classes.Button,
		classes[props.type],
		classes[props.size],
		classes[props.cursor],
		classes[props.color]
	];

	return (
		<button
			onClick={props.onClick}
			className={cls.join(' ')}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	)
}

