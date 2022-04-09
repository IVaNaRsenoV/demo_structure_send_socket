import React from 'react';
import io from 'socket.io-client';

import Chat from './components/Pages/Chat';

const App = () => {

  const socket = io('ws://localhost:8900');
  socket.on('dev', (dev) => { console.log(dev) });

  return (
    <div>
      <Chat />
    </div>
  );
}

export default App;
