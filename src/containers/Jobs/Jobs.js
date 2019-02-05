import React, {Component} from 'react'
import classes from './Jobs.scss'
import ClusterGroup from '../../components/ClusterGroup/ClusterGroup'
import JobPreview from '../../components/JobPreview/JobPreview'
import Pagination from '../../components/Pagination/Pagination'

export default class Jobs extends Component {
	state = {
		page: 0,
		pages: 0,
		found: 0,
		items: [],
		keyword: this.props.keyword,
		clusters:[],
		experience:"",
		experienceName:"",
		area:"",
		areaName:"",
		areaHidden:true,
		apiURL:"https://api.hh.ru/vacancies?clusters=true",
		currency:""
	};
	updateData = (type,value,name) => {
		switch(type) {
			case 'experience':
			case 'area':
				this.setState({
					[type]: value,
					[`${type}Name`]: name,
					page:0
				});
				break;
			default:
				console.log("type",type,"value",value);
				this.setState({
					[type]: value
				});
				break;
		}
	};
	ajaxHH() {
		let options="";
		if (this.state.keyword!=="") options+=`&text=${this.state.keyword}`;
		if (this.state.experience!=="") options+=`&experience=${this.state.experience}`;
		if (this.state.area!=="") options+=`&area=${this.state.area}`;
		if (this.state.page!=="") options+=`&page=${this.state.page}`;

		fetch(`${this.state.apiURL}${options}`, {
			headers: {
				'User-Agent': 'api-test-agent'
			}
		})
			.then(function (response) {
				return response.json();
			})
			.then(
				(result) => {
					let {items, page, pages, found, clusters} = result;
					this.setState({
						items,
						page,
						pages,
						found,
						clusters
					});
					console.log('result',result);
				})
			.catch(function (error) {
				console.log('Request failed', error)
			});
	}
	componentDidMount() {
		this.ajaxHH();
		fetch('https://api.hh.ru/dictionaries', {
			headers: {
				'User-Agent': 'api-test-agent'
			}
		})
			.then(function (response) {
				return response.json();
			})
			.then(
				(result) => {
					let {currency} = result;
					let currencyObj={};
					currency.forEach((item) => {
						currencyObj[item.code]=item.abbr;
					});
					this.setState({currency:currencyObj});
				})
	};
	componentDidUpdate(prevProps,prevState) {
		if(
			(prevState.page !== this.state.page)||
			(prevState.experience !== this.state.experience)||
			(prevState.area !== this.state.area)||
			(prevState.areaHidden !== this.state.areaHidden)
		){
			this.ajaxHH();
		}
	}
	render() {
		let renderJobPreview = () =>{
			return(
				this.state.items.map((data, index) => {
					let salary="";
					if (data.salary!==null) {
						if (data.salary.from === data.salary.to)
							salary=data.salary.from;
						else{
							if (data.salary.from !== null)
								salary += `от ${data.salary.from}`;
							if (data.salary.to !== null)
								salary += ` до ${data.salary.to}`;
						}
						salary += ` ${this.state.currency[data.salary.currency]}`;
					}
					return(
						<JobPreview key={index}
												nameJob={data.name}
												id={data.id}
												salary={salary}
												nameCompany={data.employer.name}
												city={data.area.name}
												requirement={data.snippet.requirement}
												responsibility={data.snippet.responsibility}
						/>
					)})
			)
		};
		console.log(this.props);
		return (
			<div className={classes.Jobs}>
				<h1>
					Найдено {this.state.found} вакансии {this.state.keyword===""?"":`«${this.state.keyword}»`}
				</h1>
					<ClusterGroup
						clusters={this.state.clusters}
						updateData={this.updateData}
						experience={this.state.experienceName}
						area={this.state.areaName}
						areaHidden={this.state.areaHidden}
					/>
				<div className={classes.RightColomn}>
					<Pagination
						updateData={this.updateData}
						page={this.state.page}
						pages={this.state.pages}
					/>
					<div>
						{renderJobPreview()}
					</div>
					<Pagination
						updateData={this.updateData}
						page={this.state.page}
						pages={this.state.pages}
					/>
				</div>
			</div>
		)
	}
}