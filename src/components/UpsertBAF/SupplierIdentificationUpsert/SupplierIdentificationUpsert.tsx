import React, { FC } from 'react';
import './SupplierIdentificationUpsert.css';
import {SupplierIdentificationUpsertModel} from "../../../models/supplierIdentificationUpsert.model";

interface SupplierIdentificationUpsertProps {
    model?: SupplierIdentificationUpsertModel;
}

const SupplierIdentificationUpsert: FC<SupplierIdentificationUpsertProps> = (supplierIdentificationUpsertProps) => {
  return (
      <div className="SupplierIdentificationUpsert">
          <h1 className="section-A-font-title mb-5">A. Supplier identification</h1>
          <form className="d-flex flex-column gap-4">
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
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="emailAddress" className="font-input-label">Email Address</label>
                      <input type="email" id="emailAddress" className="custom-input input-lg" />
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="establishment" className="d-flex font-input-label">
                          <input type="checkbox" id="establishment" hidden />
                          <label htmlFor="establishment" className="font-input-label custom-checkbox mr-3"></label>
                          Establishment (legal registration address if different from above)
                      </label>
                  </div>
              </div>
              <div className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="address" className="font-input-label">Address</label>
                      <input type="text" id="address" className="custom-input input-lg" />
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="city" className="font-input-label">City</label>
                      <input type="text" id="city" className="custom-input input-lg" />
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="postalCode" className="font-input-label">Postal Code</label>
                      <input type="text" id="postalCode" className="custom-input input-md" />
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="country" className="font-input-label">Country</label>
                      <select id="country" className="custom-input custom-select input-lg" />
                  </div>
              </div>
              <div className="d-flex py-3">
                  <div id="governmentInstitution" className="d-flex flex-column">
                      <label htmlFor="governmentInstitution" className="font-input-label mb-2">Government institution</label>
                      <div className="d-flex gap-6">
                          <div className="d-flex gap-2">
                              <input type="radio" id="yes" name="governmentInstitution" value="true" hidden />
                              <label htmlFor="yes" className="font-input-label custom-radio"></label>
                              <label htmlFor="yes" className="font-input-label">Yes</label>
                          </div>
                          <div className="d-flex gap-2">
                              <input type="radio" id="no" name="governmentInstitution" value="false" hidden />
                              <label htmlFor="no" className="font-input-label custom-radio"></label>
                              <label htmlFor="no" className="font-input-label">No</label>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="numberPrefix" className="font-input-label">Company Size</label>
                      <select id="companySize" className="custom-input custom-select input-lg" />
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="phoneNumber" className="font-input-label">Phone Number</label>
                      <div className="d-flex input-lg gap-2">
                          <select id="companySize" className="custom-input custom-select input-sm" />
                          <input type="tell" id="phoneNumber" className="custom-input input-fill" />
                      </div>
                  </div>
              </div>
              <div className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="vatNumber" className="font-input-label">Vat Number</label>
                      <div className="d-flex input-lg gap-2">
                          <select id="vatPrefix" className="custom-input custom-select input-sm" />
                          <input type="text" id="vatNumber" className="custom-input input-fill" />
                      </div>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="taxResidenceCountry" className="font-input-label">Tax residence country</label>
                      <select id="taxResidenceCountry" className="custom-input custom-select input-lg" />
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="taxID" className="font-input-label mb-2">Tax ID</label>
                      <label htmlFor="differentTaxID" className="d-flex font-input-label">
                          <input type="checkbox" id="differentTaxID" hidden />
                          <label htmlFor="differentTaxID" className="font-input-label custom-checkbox mr-3"></label>
                          Different from vat number
                      </label>
                      <input type="text" id="taxID" className="custom-input input-lg mt-3" disabled />
                  </div>
              </div>
              <div id="vatRegime" className="d-flex flex-column">
                  <label htmlFor="vatRegime" className="font-input-label mb-2">Vat regime</label>
                  <div className="d-flex gap-6">
                      <div className="d-flex gap-2">
                          <input type="radio" id="encaissement_deferred" name="vatRegime" value="Encaissement/Deferred" hidden />
                          <label htmlFor="encaissement_deferred" className="font-input-label custom-radio"></label>
                          <label htmlFor="encaissement_deferred" className="font-input-label">Encaissement/Deferred</label>
                      </div>
                      <div className="d-flex gap-2">
                          <input type="radio" id="debit_non_deferred" name="vatRegime" value="Debit/Non deferred" hidden />
                          <label htmlFor="debit_non_deferred" className="font-input-label custom-radio"></label>
                          <label htmlFor="debit_non_deferred" className="font-input-label">Debit/Non deferred</label>
                      </div>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="registrationNumber" className="font-input-label">Registration number</label>
                      <input type="text" id="registrationNumber" className="custom-input input-lg" />
                  </div>
              </div>
          </form>
      </div>
  );
};

export default SupplierIdentificationUpsert;
