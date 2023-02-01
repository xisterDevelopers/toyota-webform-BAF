import React from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import logo from '../src/assets/svg/toyota-logo.svg';
import CustomModal from "./shared/Modal/CustomModal";

const UpsertBAF = React.lazy(() => import('./components/UpsertBAF/UpsertBAF'));
const DetailBAF = React.lazy(() => import('./components/DetailBAF/DetailBAF'));

function App() {
  return (
    <div className="App px-5 py-4">
      <header className="App-header">
          <img className="mb-5" src={logo} alt="logo" />
          <h1 className="font-title black">Welcome on <span className="dark-red">Bank Account Form</span></h1>
              <React.Suspense fallback={""}>
                  <Routes>
                      <Route path='/upsert-BAF/:id?' element={<UpsertBAF />}/>
                      <Route path='/detail-BAF/:id' element={<DetailBAF />}/>
                      <Route path='*' element={<Navigate to='/upsert-BAF' replace/> }/>
                  </Routes>
              </React.Suspense>
      </header>
    </div>
  );
}

export default App;
