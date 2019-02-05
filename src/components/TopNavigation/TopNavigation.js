import React from 'react'
import classes from './TopNavigation.scss'
import {NavLink} from 'react-router-dom'

const links=[
	{to: '/', label: 'Вакансии', exact :true},
	{to: '/about', label: 'О проекте', exact :true}
];

export default ()=> {
	let renderLinks = () =>
		links.map((link, index) => (
			<li key={index}>
				<NavLink
					to={link.to}
					exact={link.exact}
				>
					{link.label}
				</NavLink>
			</li>
		));
	return (
		<div className={classes.TopNavigation}>
			<ul className={classes.Links}>
				{renderLinks() }
			</ul>
		</div>
	)
}