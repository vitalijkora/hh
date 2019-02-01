import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import About from './components/About/About'
import {Route, Switch} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
					<Route path="/about" component={About} />
					<Route path="/" exact component={About} />
        </Switch>
      </Layout>
    )
  }
}