import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import About from './components/About/About'
import Jobs from './containers/Jobs/Jobs'
import Job from './containers/Job/Job'
import {Route, Switch} from 'react-router-dom'

export default class App extends Component {
	state = {
		keyword:""
	};
	updateData = (type,value) => {
		this.setState({ [type]: value })
	};
  render() {
		let e=this;
		const WrappedJobs = function(props) {
			return (
				<Jobs
					{...props}
					keyword={e.state.keyword}
					updateData={e.updateData}/>
			);
		};
    return (
      <Layout updateData={this.updateData}>
        <Switch>
					<Route path="/about" component={About} />
					<Route path="/job/:id" component={Job} />
					<Route path="/" exact component={WrappedJobs} />
        </Switch>
      </Layout>
    )
  }
}