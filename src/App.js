import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//App component.
function App() {
  return (
    <div>
      {/*Wrap routes render into AuthWrapper to enable app's navigation to authenticated user's */}
      <AuthWrapper>
        {/*Router configuration*/}
        <Router>
          {/*App routes creation*/}
          <Routes>
            {/*Dashboard page route. PrivateRoute wrap Dashboard to restrict access to unauthorize users.*/}
            <Route path='/' element={
              <PrivateRoute >
                <Dashboard />
              </PrivateRoute>
            } />
            {/*Login page route.*/}
            <Route path='/login' element={<Login />} />
            {/*Error page route.*/}
            <Route path='*' element={<Error />} />
          </Routes>
        </Router>
      </AuthWrapper>
    </div >
  );
}

export default App;
