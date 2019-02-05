import React from 'react'
import classes from './Button.scss'

export default props => {
	const cls = [
		classes.Button,
		classes[props.type]
	];

	return (
		<button
			onClick={() => { props.onClickSearchButton(true)}}
			className={cls.join(' ')}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	)
}

