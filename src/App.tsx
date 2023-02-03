import React, {useState} from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import logo from '../src/assets/svg/toyota-logo.svg';
import {AppContext} from "./utils/AppContext";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const UpsertBAF = React.lazy(() => import('./components/UpsertBAF/UpsertBAF'));
const DetailBAF = React.lazy(() => import('./components/DetailBAF/DetailBAF'));

function App() {
    const [formState, setFormState] = useState<string>('Supplier Pending - ERROR');
    const [isFormValid, setIsFormValid] = useState<boolean>(true);

  return (
  <AppContext.Provider value={{formState, setFormState, isFormValid, setIsFormValid}}>
    <div className="App px-5 py-4">
      <header className="App-header">
          <img className="mb-5" src={logo} alt="logo" />
          <h1 className="font-title black">Welcome on <span className="dark-red">Bank Account Form</span></h1>
              <React.Suspense fallback={""}>
                  <Routes>
                      <Route path='/upsert-BAF/:id?' element={formState !== 'Revised' ? <UpsertBAF /> : <ErrorPage />}/>
                      <Route path='/detail-BAF/:id' element={formState !== 'Revised' ? <DetailBAF /> : <ErrorPage />}/>
                      <Route path='*' element={formState !== 'Revised' ? <Navigate to='/upsert-BAF' replace/> : <ErrorPage /> }/>
                  </Routes>
              </React.Suspense>
      </header>
    </div>
  </AppContext.Provider>
  );
}

export default App;
