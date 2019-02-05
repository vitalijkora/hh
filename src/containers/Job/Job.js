import React, {Component} from 'react'
import classes from './Job.scss'
import Parser from "html-react-parser";

export default class Job extends Component{
	state = {
		name:"",
		area:"",
		description:"",
		salary:"",
		experience:"",
		contacts:"",
		apiURL:`https://api.hh.ru/vacancies/${this.props.match.params.id}`,
		currency:""
	};
	ajaxHH() {
		fetch(this.state.apiURL, {
			headers: {
				'User-Agent': 'api-test-agent'
			}
		})
			.then(function (response) {
				return response.json();
			})
			.then(
				(result) => {
					let {name, area, description, salary, experience, contacts,employer} = result;
					let salaryLine="";
					if (salary!==null) {
						if (salary.from === salary.to)
							salaryLine=salary.from;
						else{
							if (salary.from !== null)
								salaryLine += `от ${salary.from}`;
							if (salary.to !== null)
								salaryLine += ` до ${salary.to}`;
						}
						salaryLine += ` ${this.state.currency[salary.currency]}`;
					}
					let contactLine="";
					if (contacts!==null) {
						if(contacts.name!==undefined) contactLine+=`${contacts.name}<br />`;
						if(contacts.email!==undefined) contactLine+=`${contacts.email}<br />`;
						if(contacts.phones!==undefined) {
							contacts.phones.forEach(function(item,i){
								contactLine+=`+${item.country} (${item.city}) ${item.number}<br />`;
							});
						}
					}
					this.setState({
						name,
						area:area.name,
						description,
						salary:salaryLine,
						experience:experience.name,
						contacts:contactLine,
						employer:employer.name
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
	}
	render() {
		return (
			<div className={classes.Job}>
				<h1 className={classes.Top}>{this.state.name}</h1>
				<h3>{this.state.salary}</h3>
				<h4>{this.state.employer}</h4>
				<div>{this.state.area}</div>
				<div>Требуемый опыт работы: {this.state.experience}</div>
				<div>{Parser(this.state.description)}</div>
				<b>Контакты:</b><br/><i className={classes.CompanyName}>{Parser(this.state.contacts)}</i>
			</div>
		)
	}
}


