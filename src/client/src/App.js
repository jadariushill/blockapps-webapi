import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [tagName, setTagName] = useState('');

  const handleInput = (e) => {
    setTagName(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter a tag name: {tagName}
        </p>
        <div className="Input-holder">
          <input type="text" id="tagInput" onInput={handleInput} />
          <button>Submit</button>
        </div>
      </header>
    </div>
  );
}

export default App;
