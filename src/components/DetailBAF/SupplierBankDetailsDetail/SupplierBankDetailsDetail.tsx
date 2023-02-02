import React, { FC } from 'react';
import './SupplierBankDetailsDetail.css';
import {SupplierBankDetailsDetailModel} from "../../../models/supplierBankDetailsDetail.model";

interface SupplierBankDetailsDetailProps {
    model: SupplierBankDetailsDetailModel;
}

const SupplierBankDetailsDetail: FC<SupplierBankDetailsDetailProps> = ({model}) => (
  <div className="SupplierBankDetailsDetail">
      <h2 className="mb-5">B. Supplier bank details</h2>

      <div className="d-flex flex-column gap-3" >
          <div className="d-flex gap-5">
              <div className="d-flex flex-column">
                  <p className="m-0"><strong>Bank name</strong></p>
                  <p>{model.bankName}</p>
              </div>
          </div>
          <div className="d-flex gap-5">
              <div className="d-flex flex-column">
                  <p className="m-0"><strong>Bank account currency</strong></p>
                  <p>{model.bankAccountCurrency}</p>
              </div>
          </div>
          <div className="d-flex gap-5">
              <div className="d-flex flex-column">
                  <p className="m-0"><strong>Effective date</strong></p>
                  <p>{model.effectiveDate}</p>
              </div>
          </div>
          <div className="d-flex gap-5">
              <div className="d-flex flex-column">
                  <p className="m-0"><strong>Bank account holder name</strong></p>
                  <p>{model.bankAccountHolderName}</p>
              </div>
          </div>
          <div className="d-flex gap-5">
              <div id="accountHolderName" className="d-flex flex-column">
                  <p className="m-0"><strong>Supplier name is different from bank account holder name?</strong></p>
                  <p>{model.nameIsDifferentFromBankAccountName ? "Yes" : "No"}</p>
              </div>
          </div>
          <div className="d-flex gap-5">
              <div className="d-flex flex-column">
                  <p className="m-0"><strong>Reason</strong></p>
                  <p>{model.reasonName}</p>
              </div>
          </div>
          <div className="d-flex gap-5">
              <div id="factoryCompany" className="d-flex flex-column">
                  <p className="m-0"><strong>Factory company?</strong></p>
                  <p>{model.factoryCompany ? "Yes" : "No"}</p>
              </div>
          </div>
          <div className="d-flex gap-5">
              <div className="d-flex flex-column">
                  <p className="m-0"><strong>Reason</strong></p>
                  <p>{model.reasonFactory}</p>
              </div>
          </div>
          <div className="d-flex gap-5">
              <div className="d-flex flex-column">
                  <p className="m-0"><strong>Bank account number</strong></p>
                  <p>{model.bankAccountNumber}</p>
              </div>
          </div>
          <div className="d-flex gap-5">
              <div className="d-flex flex-column w-25">
                  <p className="m-0"><strong>IBAN number</strong></p>
                  <p>{model.ibanNumber}</p>
              </div>
              <div className="d-flex flex-column w-25">
                  <p className="m-0"><strong>SWIFT code</strong></p>
                  <p>{model.swiftCode}</p>
              </div>
              <div className="d-flex flex-column w-50">
                  <p className="m-0"><strong>SORT code (UK) / FIK (Denmark) / GIRO (Sweden)</strong></p>
                  <p>{model.sortCode}</p>
              </div>
          </div>
      </div>
  </div>
);

export default SupplierBankDetailsDetail;
