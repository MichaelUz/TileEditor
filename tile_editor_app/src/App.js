import React from 'react';
import './App.css';

import LoginBox from './components/LoginBox/LoginBox';
import GitHubLogo from './assets/images/GitHub-Mark-64px.png'

function App() {
  return (
    <div className="App">
     <h1 className = 'TitleText'>Tiles</h1>
     <LoginBox/>
     <a href={'https://github.com/MichaelUz/TileEditor'} target="_blank" rel="noopener noreferrer">
      <img className='githubLogo' src= {GitHubLogo}/>
     </a>
    </div>
  );
}

export default App;