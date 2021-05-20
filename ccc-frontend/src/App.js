import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* 
        <nav>
          {/* navbar at top of page
          <div class="navbar">
            <h1 class="nav-header">Team XXX</h1>
            <div class="nav-links">
              <ul>
                {/* hrefs are IDs for the sections
                <li><a href="#about">Data</a></li>
                <li><a href="#experience">About</a></li>
                <li><a href="https://github.com/mawni/CityAnalytics">GitHub</a></li>
                <li><a href="#interest">abcd</a></li>
              </ul>
            </div>
          </div>
        </nav> 
      */}
      <header className="App-header">
        
        <h1>City Twitter Analytics</h1>
        {/* https://github.com/mawni/CityAnalytics */}
        <section id="scenarios">
          <h3>Scenario 1</h3>
          <h3>Scenario 2</h3>
          <h3>Scenario 3</h3>
          <h3>Scenario 4</h3>
          <h3>Scenario 5</h3>
        </section>
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      
    </div>
  );
}

export default App;
