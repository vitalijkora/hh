import React, {Component} from 'react'
import classes from './SearchLine.scss'
import SearchInput from '../../components/UI/SearchInput/SearchInput'
import SearchType from '../../components/UI/SearchType/SearchType'
import Button from '../../components/UI/Button/Button'
import {NavLink} from 'react-router-dom'

export default class SearchLine extends Component {
	state = {
		keyword:""
	};
	updateData = (value) => {
		this.setState({ keyword: value })
	};
	onClickSearchButton = () => {
		this.props.updateData(this.state.keyword);
	};
	render() {
		return(
		<div className={classes.SearchLine}>
			<div className={classes.Logo}> </div>
			<SearchInput
				updateData={this.updateData}
			/>
			<SearchType/>
			<NavLink
				to={"/"}
			>
				<Button
					type="primary"
					onClickSearchButton={this.onClickSearchButton}
				>
					Найти
				</Button>
			</NavLink>
		</div>)
	}
}