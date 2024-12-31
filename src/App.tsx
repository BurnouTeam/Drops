import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import LoginPage from './components/LoginPage'
import PrivateRoute from './routes/privateRoute'

const App: React.FC = () => {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route
          path="/panel"
          element={
            <PrivateRoute>
              <Header/>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
