import { Provider } from 'react-redux';
import './App.css'
import HomePage from './page/HomePage'
import FreindDetailsPage from './page/FreindDetailsPage';
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { Route, Routes, Navigate, Link, useLocation } from "react-router-dom";

// Create browser history to use in the Redux store
import { history } from "./store/configureStore";

const App = (): JSX.Element => {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/friend/:id" element={<FreindDetailsPage />} />
      </Routes>
    </Router>

  )
}

export default App
