import { Fragment } from 'react';
import { Side } from '@/layouts/side';
import { Board } from '@/layouts/board';
import './App.css';

function App() {
  return (
    <Fragment>
      <div>
        <div className="grid grid-cols-[400px_minmax(600px,_1fr)_100px] 20px">
          <Side />
          <Board />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
