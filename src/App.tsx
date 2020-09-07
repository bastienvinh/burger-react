import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'


interface IProps {

}

interface IState {
}

class App extends Component<IProps, IState> {
  
  render() {
    return <div className="App">
        <Layout>
          <BurgerBuilder />
          <h1>Im learning React like burger</h1>
        </Layout>
      </div>
  }
}

export default App;
