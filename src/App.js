import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import { SheepRacing } from './SheepRacing';
  
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <SheepRacing/>
            </header>
        </div>
);
}

export default App;
