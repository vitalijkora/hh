import React from 'react'
import classes from './JobPreview.scss'
import {NavLink} from 'react-router-dom'
import Parser from 'html-react-parser';

export default props => {
	return(
		<div className={classes.JobPreview}>
			<div className={classes.Top}>
				<NavLink
					to={`/job/${props.id}`}
					className={classes.JobName}> {props.nameJob}
				</NavLink>
				<div className={classes.Price}>{props.salary}</div>
			</div>
			<div className={classes.CompanyName}>{props.nameCompany}</div>
			<div className={classes.City}>{props.city}</div>
			<div>
				{Parser((props.requirement+"<br/>"+props.responsibility).replace(/highlighttext/g,'b').replace(/null/g,''))}
			</div>
		</div>
	)
}