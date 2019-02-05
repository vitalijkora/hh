import React from 'react'
import classes from './SearchInput.scss'

export default props => {
	return(
		<input
			id={"searchInput"}
			type='text'
			className={classes.SearchInput}
			placeholder="Я ищу…"
			onChange={() => {	props.updateData(document.getElementById('searchInput').value)	}}
		/>
	)
}
