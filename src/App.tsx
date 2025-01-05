import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import LoginPage from './components/LoginPage'
import PanelPage from './components/PanelPage'
import RecoveryPage from './components/RecoveryPage'
import PrivateRoute from './routes/privateRoute'

const App: React.FC = () => {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/rec" element={<RecoveryPage/>}/>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PanelPage/>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
