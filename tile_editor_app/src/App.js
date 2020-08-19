import React, { useState } from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';

import LoginPage from './components/LandingPage/LoginPage';
import Editor from './containers/Editor/Editor';
import GitHubLogo from './assets/images/GitHub-Mark-Light-32px.png';

function App() {
  document.title = 'Tiles';  
  return (
    <div className={'App bg'}>
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
