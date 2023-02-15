import React from 'react';

//pages and components
import Calendar from '../Calendar';
import Recorder from '../Recorder';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Recorder />
      <Calendar />
    </div>
  );
};

export default App;
