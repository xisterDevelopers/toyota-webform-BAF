import React, {FC, useLayoutEffect, useState} from 'react';
import './SupplierIdentificationUpsert.css';
import {SupplierIdentificationUpsertModel} from "../../../models/supplierIdentificationUpsert.model";
import CountryService from "../../../api/country.service";
import {CountryModel} from "../../../models/country.model";
import {useGlobalContext} from "../../../utils/AppContext";

interface SupplierIdentificationUpsertProps {
    model: SupplierIdentificationUpsertModel;
    countries: CountryModel[];
}

const SupplierIdentificationUpsert: FC<SupplierIdentificationUpsertProps> = ({model, countries}) => {

    const {isFormValid, setIsFormValid} = useGlobalContext();
    const [sameTaxID, setSameTaxID] = useState(false);
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
    const [vatRegimeBool, setVatRegimeBool] = useState<boolean>();
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidZipCode, setIsValidZipCode] = useState(true);
    const [isEstablishmentZipCodeValid, setIsEstablishmentZipCodeValid] = useState(true);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useLayoutEffect(() => {
        if(model.vatRegime) {
            if(model.vatRegime == "Encaissement/Deferred") {
                setVatRegimeBool(true)
            } else if (model.vatRegime == "Debit/Non deferred") {
                setVatRegimeBool(false)
            }
        }
        if(model.establishment !== undefined) {
            setEstablishment(model.establishment)
        }
        if(model.governmentInstitution !== undefined) {
            setGovernmentInstitution(model.governmentInstitution)
        }
        if(model.companySize !== undefined) {
            setCompanySize(model.companySize)
        }
        if(model.country !== undefined) {
            setCountry(model.country)
        }
        if(model.taxID !== undefined && model.vatNumber !== undefined) {
            if(model.vatNumber !== model.taxID && !isLoaded ) {
                setSameTaxID(true)
                setIsLoaded(true)
            }
            if (model.vatNumber === model.taxID && !isLoaded) {
                model.taxID = ""
                setSameTaxID(false)
                setIsLoaded(true)
            }
        }
    }, [model.vatRegime, model.establishment, model.governmentInstitution,
        model.companySize, model.country, model.taxID, model,vatNumber, isLoaded])

    const zipCodeValidator = (valueToSet: string) => {
        if(model.postalCode !== undefined) {
            let isNum = /^\d+$/.test(model.postalCode);
            if(valueToSet === "zipCode") {
                setIsValidZipCode(isNum)
            }
        }
        if (model.establishmentPostalCode !== undefined) {
            let isNum = /^\d+$/.test(model.establishmentPostalCode);
            if(valueToSet === "establishmentZipCode") {
                setIsEstablishmentZipCodeValid(isNum)
            }
        }
    }

    const emailValidator = () => {
        const matchedEmail = String(model.emailAddress)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (matchedEmail === null) {
            setIsValidEmail(false)
        } else {
            setIsValidEmail(true)
        }
    }

    const phoneValidator = () => {
        if(model.idd !== undefined && model.phoneNumber !== undefined) {
            const matchedPhone = String(model.idd + model.phoneNumber)
                .match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
            if (matchedPhone === null) {
                setIsValidPhoneNumber(false)
            } else {
                setIsValidPhoneNumber(true)
            }
        }
    }

    return (
      <div className="SupplierIdentificationUpsert">
          <h2 className="section-A-font-title mb-5">A. Supplier identification</h2>
          <form className="d-flex flex-column gap-4">
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="supplierName" className="font-input-label">Supplier Name<span className="red">*</span></label>
                      <input type="text" id="supplierName" className="custom-input input-lg"
                              defaultValue={model.supplierName} onChange={event => model.supplierName = event.target.value}/>
                  </div>
              </div>
              <div className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="personName" className="font-input-label">Person Name<span className="red">*</span></label>
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
                      <label htmlFor="emailAddress" className="font-input-label">
                          Email Address
                          {isValidEmail ? "" : <small> : <small className="red">Invalid</small></small>}
                      </label>
                      <input type="email" id="emailAddress" className={"custom-input input-lg " + (isValidEmail ? "" : "red")} onBlur={emailValidator}
                             defaultValue={model.emailAddress} onChange={event => model.emailAddress = event.target.value}/>
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
                      <label htmlFor="postalCode" className="font-input-label">
                          Postal Code
                          {isValidZipCode ? "" : <small> : <small className="red">Invalid</small></small>}
                      </label>
                      <input type="text" id="postalCode" className={"custom-input input-md " + (isValidZipCode ? "" : "red")} onBlur={() => zipCodeValidator("zipCode")}
                             defaultValue={model.postalCode} onChange={event => model.postalCode = event.target.value}/>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="country" className="font-input-label">Country</label>
                      <select id="country" className="custom-input custom-select input-lg"
                              value={model.country}
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
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="establishment" className="d-flex font-input-label">
                          <input type="checkbox" id="establishment" hidden checked={establishment !== undefined ? establishment : false}
                                 onChange={() => {
                                         setEstablishment(!establishment)
                                         model.establishment = !establishment
                                 }}/>
                          <label htmlFor="establishment" className="font-input-label custom-checkbox mr-3"></label>
                          Establishment (legal registration address if different from above)
                      </label>
                  </div>
              </div>
              <div className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="address" className="font-input-label">Address</label>
                      <input type="text" id="address" className="custom-input input-lg"
                             defaultValue={model.establishmentAddress} onChange={event => model.establishmentAddress = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="city" className="font-input-label">City</label>
                      <input type="text" id="city" className="custom-input input-lg"
                             defaultValue={model.establishmentCity} onChange={event => model.establishmentCity = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="postalCode" className="font-input-label">
                          Postal Code
                          {isEstablishmentZipCodeValid ? "" : <small> : <small className="red">Invalid</small></small>}
                      </label>
                      <input type="text" id="postalCode" className={"custom-input input-md " + (isEstablishmentZipCodeValid ? "" : "red")}
                             onBlur={() => zipCodeValidator("establishmentZipCode")}
                             defaultValue={model.establishmentPostalCode} onChange={event => model.establishmentPostalCode = event.target.value}/>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="country" className="font-input-label">Country</label>
                          <select id="country" className="custom-input custom-select input-lg"
                                  value={model.establishmentCountry}
                                  onChange={(event) => {
                                      setEstablishmentCountry(model.establishmentCountry = event.target.value);
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
                              <input type="radio" id="yes" name="governmentInstitution" checked={governmentInstitution === true}
                                     onChange={() => {
                                         setGovernmentInstitution(true)
                                         model.governmentInstitution = true
                                     }} hidden />
                              <label htmlFor="yes" className="font-input-label custom-radio"></label>
                              <label htmlFor="yes" className="font-input-label">Yes</label>
                          </div>
                          <div className="d-flex gap-2">
                              <input type="radio" id="no" name="governmentInstitution" defaultChecked={governmentInstitution === false}
                                     onChange={() => {
                                         setGovernmentInstitution(false)
                                         model.governmentInstitution = false
                                     }} hidden />
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
                              value={companySize} onChange={event => {
                                  setCompanySize(event.target.value)
                                  model.companySize = event.target.value
                      }}>
                          <option value=""></option>
                          <option value="small">Small [0 - 249]</option>
                          <option value="medium">Medium [250 - 999]</option>
                          <option value="large">Large [1000+]</option>
                      </select>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="phoneNumber" className="font-input-label">
                          Phone Number
                          {isValidPhoneNumber ? "" : <small> : <small className="red">Invalid</small></small>}
                      </label>
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
                          <input type="tell" id="phoneNumber" className={"custom-input input-fill " + (isValidPhoneNumber ? "" : "red")} onBlur={phoneValidator}
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
                          <input type="checkbox" id="differentTaxID" hidden checked={sameTaxID !== undefined ? sameTaxID : false}
                                 onChange={() => {
                                     setSameTaxID(!sameTaxID)
                                 }}/>
                          <label htmlFor="differentTaxID" className="font-input-label custom-checkbox mr-3"></label>
                          Different from vat number
                      </label>
                      <input type="text" id="taxID" className="custom-input input-lg mt-3" disabled={!sameTaxID}
                             defaultValue={model.taxID} onChange={event => model.taxID = event.target.value}/>
                  </div>
              </div>
              <div id="vatRegime" className="d-flex flex-column">
                  <label htmlFor="vatRegime" className="font-input-label mb-2">Vat regime</label>
                  <div className="d-flex gap-6">
                      <div className="d-flex gap-2">
                          <input type="radio" id="encaissement_deferred" name="vatRegime" value="Encaissement/Deferred" hidden
                                 checked={vatRegimeBool === true} onChange={(event) => {
                                     setVatRegimeBool(true)
                                     model.vatRegime = event.target.value
                          }}/>
                          <label htmlFor="encaissement_deferred" className="font-input-label custom-radio"></label>
                          <label htmlFor="encaissement_deferred" className="font-input-label">Encaissement/Deferred</label>
                      </div>
                      <div className="d-flex gap-2">
                          <input type="radio" id="debit_non_deferred" name="vatRegime" value="Debit/Non deferred" hidden
                                 checked={vatRegimeBool === false} onChange={(event) => {
                                     setVatRegimeBool(false)
                                     model.vatRegime = event.target.value
                          }}/>
                          <label htmlFor="debit_non_deferred" className="font-input-label custom-radio"></label>
                          <label htmlFor="debit_non_deferred" className="font-input-label">Debit/Non deferred</label>
                      </div>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="registrationNumber" className="font-input-label">Registration number</label>
                      <input type="text" id="registrationNumber" className="custom-input input-lg"
                             defaultValue={model.registrationNumber} onChange={event => model.registrationNumber = event.target.value}/>
                  </div>
              </div>
          </form>
      </div>
  );
};

export default SupplierIdentificationUpsert;
