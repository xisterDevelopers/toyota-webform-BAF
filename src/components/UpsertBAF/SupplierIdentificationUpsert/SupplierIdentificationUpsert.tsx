import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import './SupplierIdentificationUpsert.css';
import {SupplierIdentificationUpsertModel} from "../../../models/supplierIdentificationUpsert.model";
import CountryService from "../../../api/country.service";
import {CountryModel} from "../../../models/country.model";

interface SupplierIdentificationUpsertProps {
    model: SupplierIdentificationUpsertModel;
    countries: CountryModel[];
}

const SupplierIdentificationUpsert: FC<SupplierIdentificationUpsertProps> = ({model, countries}) => {

    const [sameTaxID, setSameTaxID] = useState(true);
    const [cca2, setCca2] = useState(model.cca2);
    const [idd, setIdd] = useState(model.idd);
    const [country, setCountry] = useState(model.country);
    const [supplierName, setSupplierName] = useState(model.supplierName);
    const [establishment, setEstablishment] = useState(model.establishment);
    const [personName, setPersonName] = useState(model.personName);
    const [address, setAddress] = useState(model.address);
    const [city, setCity] = useState(model.city);
    const [companySize, setCompanySize] = useState(model.companySize);
    const [emailAddress, setEmailAddress] = useState(model.emailAddress);
    const [establishmentAddress, setEstablishmentAddress] = useState(model.establishmentAddress);
    const [establishmentCity, setEstablishmentCity] = useState(model.establishmentCity);
    const [establishmentCountry, setEstablishmentCountry] = useState(model.establishmentCountry);
    const [establishmentPostalCode, setEstablishmentPostalCode] = useState(model.establishmentPostalCode);
    const [governmentInstitution, setGovernmentInstitution] = useState(model.governmentInstitution);
    const [personSurname, setPersonSurname] = useState(model.personSurname);
    const [phoneNumber, setPhoneNumber] = useState(model.phoneNumber);
    const [registrationNumber, setRegistrationNumber] = useState(model.registrationNumber);
    const [taxID, setTaxID] = useState(model.taxID);
    const [taxResidenceCountry, setTaxResidenceCountry] = useState(model.taxResidenceCountry);
    const [vatNumber, setVatNumber] = useState(model.vatNumber);
    const [vatRegime, setVatRegime] = useState(model.vatRegime);
    const [postalCode, setPostalCode] = useState(model.postalCode);

    return (
      <div className="SupplierIdentificationUpsert">
          <h2 className="section-A-font-title mb-5">A. Supplier identification</h2>
          <form className="d-flex flex-column gap-4">
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="supplierName" className="font-input-label">Supplier Name</label>
                      <input type="text" id="supplierName" className="custom-input input-lg"
                              defaultValue={model.supplierName} onChange={event => model.supplierName = event.target.value}/>
                  </div>
              </div>
              <div className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="personName" className="font-input-label">Person Name</label>
                      <input type="text" id="personName" className="custom-input input-lg"
                             defaultValue={model.personName} onChange={event => model.personName = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="personSurname" className="font-input-label">Person Surname</label>
                      <input type="text" id="personSurname" className="custom-input input-lg"
                             defaultValue={model.personSurname} onChange={event => model.personSurname = event.target.value}/>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="emailAddress" className="font-input-label">Email Address</label>
                      <input type="email" id="emailAddress" className="custom-input input-lg"
                             defaultValue={model.emailAddress} onChange={event => model.emailAddress = event.target.value}/>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="establishment" className="d-flex font-input-label">
                          <input type="checkbox" id="establishment" hidden defaultChecked={true} onChange={event => model.establishment = event.target.checked}/>
                          <label htmlFor="establishment" className="font-input-label custom-checkbox mr-3"></label>
                          Establishment (legal registration address if different from above)
                      </label>
                  </div>
              </div>
              <div className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="address" className="font-input-label">Address</label>
                      <input type="text" id="address" className="custom-input input-lg"
                             defaultValue={model.address} onChange={event => model.address = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="city" className="font-input-label">City</label>
                      <input type="text" id="city" className="custom-input input-lg"
                             defaultValue={model.city} onChange={event => model.city = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="postalCode" className="font-input-label">Postal Code</label>
                      <input type="text" id="postalCode" className="custom-input input-md"
                             defaultValue={model.postalCode} onChange={event => model.postalCode = event.target.value}/>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="country" className="font-input-label">Country</label>
                          <select id="country" className="custom-input custom-select input-lg"
                                  value={country}
                                  onChange={(event) => {
                                      setCca2(model.cca2 = countries?.find(c => c.name === event.target.value)?.cca2);
                                      setIdd(model.idd = countries?.find(c => c.name === event.target.value)?.idd.at(0));
                                      setCountry(model.country = event.target.value);
                                  }}>
                              {
                                  countries?.map((country,i) =>
                                      (
                                          <option key={i}>{country.name}</option>
                                      ))
                              }
                          </select>
                  </div>
              </div>
              <div className="d-flex py-3">
                  <div id="governmentInstitution" className="d-flex flex-column">
                      <label htmlFor="governmentInstitution" className="font-input-label mb-2">Government institution</label>
                      <div className="d-flex gap-6">
                          <div className="d-flex gap-2">
                              <input type="radio" id="yes" name="governmentInstitution" value={1} checked={model.governmentInstitution === true}
                                     onChange={event => model.governmentInstitution = (event.target.value === "1")} hidden />
                              <label htmlFor="yes" className="font-input-label custom-radio"></label>
                              <label htmlFor="yes" className="font-input-label">Yes</label>
                          </div>
                          <div className="d-flex gap-2">
                              <input type="radio" id="no" name="governmentInstitution" value={0} checked={model.governmentInstitution === false}
                                     onChange={event => model.governmentInstitution = (event.target.value === "0")} hidden />
                              <label htmlFor="no" className="font-input-label custom-radio"></label>
                              <label htmlFor="no" className="font-input-label">No</label>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="numberPrefix" className="font-input-label">Company Size</label>
                      <select id="companySize" className="custom-input custom-select input-lg"
                              value={model.companySize} onChange={event => model.companySize = event.target.value}>
                          <option value=""></option>
                          <option value="small">Small [0 - 249]</option>
                          <option value="medium">Medium [250 - 999]</option>
                          <option value="large">Large [1000+]</option>
                      </select>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="phoneNumber" className="font-input-label">Phone Number</label>
                      <div className="d-flex input-lg gap-2">
                          <select id="phonePrefix" className="custom-input custom-select input-md" value={model.idd}
                                  onChange={(event => setIdd(model.idd = event.target.value))}>
                              {
                                  countries?.map(country =>
                                      (
                                          country?.idd?.map((suffix, i) =>
                                              (
                                                  <option key={i}>{suffix}</option>
                                              ))
                                      ))
                              }
                          </select>
                          <input type="tell" id="phoneNumber" className="custom-input input-fill"
                                 defaultValue={model.phoneNumber} onChange={event => model.phoneNumber = event.target.value}/>
                      </div>
                  </div>
              </div>
              <div className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="vatNumber" className="font-input-label">Vat Number</label>
                      <div className="d-flex input-lg gap-2">
                          <select id="vatPrefix" className="custom-input custom-select input-sm" value={model.cca2}
                                  onChange={(event => setCca2(model.cca2 = event.target.value))}>
                              {
                                  countries?.map((country,i) =>
                                      (
                                          <option key={i}>{country?.cca2}</option>
                                      ))
                              }
                          </select>
                          <input type="text" id="vatNumber" className="custom-input input-fill"
                                 defaultValue={model.vatNumber} onChange={event => model.vatNumber = event.target.value}/>
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
                          <input type="checkbox" id="differentTaxID" hidden checked={model.vatNumber !== model.taxID}
                                 onChange={event => setSameTaxID(!event.target.checked)}/>
                          <label htmlFor="differentTaxID" className="font-input-label custom-checkbox mr-3"></label>
                          Different from vat number
                      </label>
                      <input type="text" id="taxID" className="custom-input input-lg mt-3" disabled={sameTaxID}
                             defaultValue={model.taxID} onChange={event => model.taxID = event.target.value}/>
                  </div>
              </div>
              <div id="vatRegime" className="d-flex flex-column">
                  <label htmlFor="vatRegime" className="font-input-label mb-2">Vat regime</label>
                  <div className="d-flex gap-6">
                      <div className="d-flex gap-2">
                          <input type="radio" id="encaissement_deferred" name="vatRegime" value="Encaissement/Deferred" hidden
                                 onChange={event => model.vatRegime = event.target.value}/>
                          <label htmlFor="encaissement_deferred" className="font-input-label custom-radio"></label>
                          <label htmlFor="encaissement_deferred" className="font-input-label">Encaissement/Deferred</label>
                      </div>
                      <div className="d-flex gap-2">
                          <input type="radio" id="debit_non_deferred" name="vatRegime" value="Debit/Non deferred" hidden
                                 onChange={event => model.vatRegime = event.target.value}/>
                          <label htmlFor="debit_non_deferred" className="font-input-label custom-radio"></label>
                          <label htmlFor="debit_non_deferred" className="font-input-label">Debit/Non deferred</label>
                      </div>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="registrationNumber" className="font-input-label">Registration number</label>
                      <input type="text" id="registrationNumber" className="custom-input input-lg"
                             value={registrationNumber} onChange={event => model.registrationNumber = event.target.value}/>
                  </div>
              </div>
          </form>
      </div>
  );
};

export default SupplierIdentificationUpsert;
