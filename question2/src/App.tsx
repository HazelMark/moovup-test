import { Provider } from 'react-redux';
import './App.css'
import HomePage from './page/HomePage'
import FriendDetailsPage from './page/FriendDetailsPage';
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { Route, Routes, Navigate, Link, useLocation } from "react-router-dom";
import { styled } from '@mui/system';

// Create browser history to use in the Redux store
import { history } from "./store/configureStore";
import Header from './component/Header';
import { Card, Container } from '@mui/material';

const App = (): JSX.Element => {
  return (
    <Router history={history}>
      <Background>
        <Container maxWidth="xl">
          <Card>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/friend/:id" element={<FriendDetailsPage />} />
            </Routes>
          </Card>
        </Container>
      </Background>
    </Router>

  )
}



const Background = styled('div')({
  position: 'relative',
  display: 'flex',
  '-webkit-box-pack': 'center',
  
  justifyContent: 'center',
  
  padding: '24px',
  backgroundColor: 'rgba(243, 246, 249, 0.6)',
  border: '1px solid rgb(229, 234, 242)',

});


export default App
