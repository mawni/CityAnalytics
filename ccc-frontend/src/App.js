import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

function TestHeader(props){
  return <h1>{props.name}</h1>
}

class ScenarioButton extends Component {
  constructor(props){
    super(props);
    this.doRequest = this.doRequest.bind(this);
  }
  doRequest(){
    alert('Hello there o7');
    //to something upon the button being clicked
  }

  render() {
    return (
      <button onClick={this.doRequest}>
        {this.props.name}
      </button>
    )
  }
}

function App() {
  return (
    <body>
      <div className="App">
        <nav>
          {/* navbar at top of page */}
          <div class="navbar">
            <h1 class="nav-header">Team 55</h1>
            <div class="nav-links">
              <ul>
                {/* hrefs are IDs for the sections */}
                {/* <li><a href="#about">Data</a></li> */}
                <li><a href="https://github.com/mawni/CityAnalytics">GitHub</a></li>
              </ul>
            </div>
          </div>
        </nav> 
        <main className="App-header">
          
          <h1>City Twitter Analytics</h1>
          <ScenarioButton name="Scenario 1"></ScenarioButton>
          <ScenarioButton name="Scenario 2"></ScenarioButton>
          <ScenarioButton name="Scenario 3"></ScenarioButton>
          <ScenarioButton name="Scenario 4"></ScenarioButton>
          <ScenarioButton name="Scenario 5"></ScenarioButton>
          {/* https://github.com/mawni/CityAnalytics */}
          <section id="scenarios">
            <h3>Scenario 1</h3>
            <h3>Scenario 2</h3>
            <h3>Scenario 3</h3>
            <h3>Scenario 4</h3>
            <h3>Scenario 5</h3>
          </section>
          {/* <img src={logo} className="App-logo" alt="logo"/> */}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <TestHeader name="test lol"></TestHeader>
          
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </main>
        
      </div>
    </body>
  );
}

export default App;
