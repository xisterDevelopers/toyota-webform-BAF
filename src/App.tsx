import React, {useState} from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import logo from '../src/assets/svg/toyota-logo.svg';
import {AppContext} from "./utils/AppContext";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const UpsertBAF = React.lazy(() => import('./components/UpsertBAF/UpsertBAF'));
const DetailBAF = React.lazy(() => import('./components/DetailBAF/DetailBAF'));

function App() {
    const [formState, setFormState] = useState<string>('supplier pending');
    const [isFormValidIdentification, setIsFormValidIdentification] = useState<boolean>(false);
    const [isFormValidBank, setIsFormValidBank] = useState<boolean>(false);
    const [isFormValidManagement, setIsFormValidManagement] = useState<boolean>(false);
    const [isOnlyFirstApproval, setIsOnlyFirstApproval] = useState<boolean|null>(true);

  return (
  <AppContext.Provider value={
      {formState, setFormState,
          isFormValidIdentification, setIsFormValidIdentification,
          isFormValidBank, setIsFormValidBank,
          isFormValidManagement, setIsFormValidManagement,
          isOnlyFirstApproval, setIsOnlyFirstApproval}
  }>
    <div className="App app-wrapper">
      <header className="App-header">
          <img className="mb-5" src={logo} alt="logo" />
          <h1 className="font-title black mb-5 pb-4">Welcome on <span className="dark-red">Bank Account Form</span></h1>
              <React.Suspense fallback={""}>
                  <Routes>
                      <Route path='/error' element={<ErrorPage />}/>
                      <Route path='/upsert-BAF/:id?' element={formState !== 'Revised' ? <UpsertBAF /> : <Navigate to='/error' replace/>}/>
                      <Route path='/detail-BAF/:id' element={formState !== 'Revised' ? <DetailBAF /> :<Navigate to='/error' replace/>}/>
                      <Route path='*' element={formState !== 'Revised' ? <Navigate to='/upsert-BAF' replace/> : <Navigate to='/error' replace/> }/>
                  </Routes>
              </React.Suspense>
      </header>
    </div>
  </AppContext.Provider>
  );
}

export default App;
