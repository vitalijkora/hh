import React, {Component} from 'react'
import TopNavigation from '../../components/TopNavigation/TopNavigation'
import SearchLine from '../../components/SearchLine/SearchLine'
import classes from './Layout.scss'

export default  class Layout extends Component {
	render(){
		return(
			<div className={classes.Layout}>
				<SearchLine/>
				<TopNavigation/>
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}
