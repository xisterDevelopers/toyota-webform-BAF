import React, { FC } from 'react';
import './SupplierIdentificationUpsert.css';

interface SupplierIdentificationUpsertProps {}

const SupplierIdentificationUpsert: FC<SupplierIdentificationUpsertProps> = () => (
  <div className="SupplierIdentificationUpsert">
    <h1 className="section-A-font-title">A. Supplier identification</h1>
      <form action="">
          <div className="inputGroup">
              <label htmlFor="supplierName" className="font-input-label">Supplier Name</label>
              <input type="text" id="supplierName" className="custom-input" />
          </div>
      </form>
  </div>
);

export default SupplierIdentificationUpsert;
