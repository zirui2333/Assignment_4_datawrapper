import React, { useEffect } from 'react';
import './App.css';
import Datawrapper from './DatawrapperEmbed';
import { initializeMenu, handleResize, toggleMenu } from './menu'; // Import all functions I defined

function App() {
  useEffect(() => {
    initializeMenu(); // Initialize menu 

    return () => {
    if (document.getElementById('ham_menu')) {
      document.getElementById('ham_menu').removeEventListener('click', toggleMenu);
    }
    window.removeEventListener('resize', handleResize);
};

  }, []);

  return (
    <div className="App">
      <nav>
        <div className="left">
          <a href="https://zirui2333.github.io/WDB-education/">Home</a>
        </div>
        <div id="ham_menu" className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="right nav-links">
          <a href="https://zirui2333.github.io/WDB-education/calculator.html">GPA Calculator</a>
          <a href="index.html">Music Calendar</a>
          <a href="https://zirui2333.github.io/WDB-education/project.html">Interest</a>
          <a href="https://zirui2333.github.io/WDB-education/contact.html">Contact Me</a>
        </div>
      </nav>

      <header className="App-header">
        <h1>Zirui Zheng HW 4</h1>
        <h4>
          Note: Some of the playtrack couldn't show album cover because of the
          blocking mechanism from the music website itself
        </h4>
      </header>
      <main>
        <Datawrapper />
      </main>

      <footer>
        <p>Created by Zirui Zheng</p>
      </footer>
    </div>
  );
}

export default App;
