import logo from './logo.svg';
import './App.css';

import { ActionMenu } from './components/ActionMenu/ActionMenu';

function App() {
  const actionMenuItems = [
    {
      label: 'Action 1',
      active: false,
      submenu: ['Submenu Item 1', 'Submenu Item 2'],
    },
    {
      label: 'Action 2',
      active: false,
      submenu: ['Submenu Item 3', 'Submenu Item 4'],
    },
    // Add more items as needed
  ];
  return (
    <div className="App">
      <ActionMenu items={actionMenuItems}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
