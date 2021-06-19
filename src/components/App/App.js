import {HashRouter as Router, Route} from 'react-router-dom';
// components/styling
import './App.css';
import MovieList from '../MovieList/MovieList';
import DetailsPage from '../DetailsPage/DetailsPage';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path='/details/:id' children={<DetailsPage />}>
        </Route>
        <Route path='/addmovie'>
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
