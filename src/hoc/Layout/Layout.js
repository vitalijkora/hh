import React, {Component} from 'react'
import TopNavigation from '../../components/TopNavigation/TopNavigation'
import SearchLine from '../../containers/SearchLine/SearchLine'

export default  class Layout extends Component {

	updateData = (value) => {
		this.props.updateData("keyword",value);
	};
	render(){
		return(
			<div>
				<SearchLine updateData={this.updateData}/>
				<TopNavigation/>
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}
