import { Route } from 'react-router-dom';
import './App.css';

import Shelves from './containers/Shelves';
import Search from './containers/Search';

export default function App() {
  return (
    <div className="App">
      <Route path='/' exact component={Shelves}></Route>
      <Route path='/search' component={Search}></Route>
    </div>
  );
}

