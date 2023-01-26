import React, { FC } from 'react';
import './SupplierIdentificationUpsert.css';

interface SupplierIdentificationUpsertProps {}

const SupplierIdentificationUpsert: FC<SupplierIdentificationUpsertProps> = () => (
  <div className="SupplierIdentificationUpsert">
    <h1 className="section-A-font-title">A. Supplier identification</h1>
      <form action="" className="d-flex flex-column gap-3">
          <div className="d-flex">
              <div className="d-flex flex-column">
                  <label htmlFor="supplierName" className="font-input-label">Supplier Name</label>
                  <input type="text" id="supplierName" className="custom-input input-lg" />
              </div>
          </div>
          <div className="d-flex gap-5">
              <div className="d-flex flex-column">
                  <label htmlFor="personName" className="font-input-label">Person Name</label>
                  <input type="text" id="personName" className="custom-input input-lg" />
              </div>
              <div className="d-flex flex-column">
                  <label htmlFor="personSurname" className="font-input-label">Person Surname</label>
                  <input type="text" id="personSurname" className="custom-input input-lg" />
              </div>
          </div>
      </form>
  </div>
);

export default SupplierIdentificationUpsert;
