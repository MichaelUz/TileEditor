import React from 'react';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

import LoginPage from './components/LoginPage/LoginPage';
import Editor from './components/Editor/Editor';
import GitHubLogo from './assets/images/GitHub-Mark-64px.png';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <LoginPage/>
        </Route>
        <Route path='/editor'>
          <Editor/>
        </Route>
      </Switch>
     
      <a href={'https://github.com/MichaelUz/TileEditor'} target="_blank" rel="noopener noreferrer">
        <img className='githubLogo' src= {GitHubLogo}/>
      </a>
    </div>
  );
}

export default App;
