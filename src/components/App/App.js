import {HashRouter as Router, Route} from 'react-router-dom';
// components/styling
import './App.css';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import MovieList from '../MovieList/MovieList';
import DetailsPage from '../DetailsPage/DetailsPage';
import AddMovie from '../AddMovie/AddMovie';
import EditPage from '../EditPage/EditPage';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-main">
        <Router>
          <Navbar />
          <Route path="/" exact>
            <MovieList />
          </Route>
          <Route path='/addmovie'>
            <AddMovie />
          </Route>
          <Route path='/details/:id' children={<DetailsPage />}>
          </Route>
          <Route path='/edit/:id' children={<EditPage />}>
          </Route>
        </Router>
      </div>
    </div>
  );
}


export default App;
