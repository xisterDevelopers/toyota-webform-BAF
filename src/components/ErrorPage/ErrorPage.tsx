import React, { FC } from 'react';
import './ErrorPage.css';
import Banner from "../../shared/Banner/Banner";

interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = () => (
  <div className="ErrorPage">
      <Banner
          stroke='border-red'
          fill='bg-light-red'
          content={
              <p>
                  <strong>Attenzione! </strong>
                  Il Form da te selezionato non è più disponibile.
              </p>
          }
          icon='error' />
  </div>
);

export default ErrorPage;
