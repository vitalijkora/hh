import React from 'react'
import classes from './Pagination.scss'

export default props => {
	let renderPageLinks = (updateData) =>{
		let count=props.pages,
				current=props.page;
		let pages=[];
		if(current>3){
			pages.push(<li key={0} onClick={ ()=> updateData("page",0)} className={classes.Link}>В начало </li>);
			pages.push(<li key={-1}>...</li>);
		}
		for(let i=current-3>0?current-3:0;(i<=current+2)&&(i<count);i++){
			if(i===current)	pages.push(<li key={i}>{i+1}</li>);
			else	pages.push(<li key={i} onClick={ ()=> updateData("page",i)}  className={classes.Link}>{i+1}</li>);
		}
		if(current<count-2){
			pages.push(<li key={-2}>...</li>);
			pages.push(<li key ={count} onClick={ ()=> updateData("page",count-1)}  className={classes.Link}>{count}</li>);
		}
		return(
			pages
		)
	};
	return(
		<div className={classes.Pagination}>
			<ul>
				{renderPageLinks(props.updateData)}
			</ul>
		</div>
	)
}