import React from 'react';
import './App.css';
import Datawrapper from './DatawrapperEmbed';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Zirui Zheng hw 4</h1>
        <p>Note: Some of the playtrack couldn't show album cover because of the blocking mechanism 
          from the music website itself</p>
          
      </header>

      <main>
        <Datawrapper/>
      </main>

      <footer>
        <p>Created by Zirui Zheng</p>
      </footer>
    </div>
  );
}

export default App;
