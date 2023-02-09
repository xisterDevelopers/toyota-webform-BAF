import React, {FC, useLayoutEffect, useState} from 'react';
import './SupplierIdentificationUpsert.css';
import {CountryModel} from "../../../models/country.model";
import {useGlobalContext} from "../../../utils/AppContext";
import {SupplierIdentificationObject} from "../../../models/SupplierIdentificationObject.model";

interface SupplierIdentificationUpsertProps {
    model: SupplierIdentificationObject;
    countries: CountryModel[];
}

const SupplierIdentificationUpsert: FC<SupplierIdentificationUpsertProps> = ({model, countries}) => {

    const [sameTaxID, setSameTaxID] = useState(false);
    const [cca2, setCca2] = useState(model.cca2);
    const [idd, setIdd] = useState(model.idd);
    const [country, setCountry] = useState(model.address1.country);
    const [establishment, setEstablishment] = useState(model.establishment);
    const [companySize, setCompanySize] = useState(model.companySize);
    const [establishmentCountry, setEstablishmentCountry] = useState(model.address2.country);
    const [governmentInstitution, setGovernmentInstitution] = useState(model.governementInstitution);
    const [vatNumber, setVatNumber] = useState(model.vatNumber);
    const [vatRegimeBool, setVatRegimeBool] = useState<boolean>();
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidZipCode, setIsValidZipCode] = useState(true);
    const [isEstablishmentZipCodeValid, setIsEstablishmentZipCodeValid] = useState(true);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isVatNumberValid, setIsVatNumberValid] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [validationError, setValidationError] = useState({email: false, zipCode: false, phoneNumber: false, vatNumber: false});

    const {setIsFormValidIdentification} = useGlobalContext()

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
        if(model.governementInstitution !== undefined) {
            setGovernmentInstitution(model.governementInstitution)
        }
        if(model.companySize !== undefined) {
            setCompanySize(model.companySize)
        }
        if(model.address1.country !== undefined) {
            setCountry(model.address1.country)
        }
        if(model.taxId !== undefined && model.vatNumber !== undefined) {
            if(model.vatNumber !== model.taxId && !isLoaded ) {
                setSameTaxID(true)
                setIsLoaded(true)
            }
            if (model.vatNumber === model.taxId && !isLoaded) {
                model.taxId = ""
                setSameTaxID(false)
                setIsLoaded(true)
            }
        }
        if (model.emailAddress !== undefined) {
            emailValidator(true)
        }
        if(model.phoneNumber !== undefined) {
            phoneValidator(true)
        }
        if (model.vatNumber !== undefined) {
            vatNumberValidator(true)
        }
        if (model.address1.postalCode !== undefined) {
            zipCodeValidator(true)
        }
        identificationFormValidator()
    }, [model.vatRegime, model.establishment, model.governementInstitution,
        model.companySize, model.address1.country, model.taxId, model,vatNumber, isLoaded, model.emailAddress,model.phoneNumber,model.vatNumber,model.address1.postalCode])

    const identificationFormValidator = () => {
        const booleanArray = [validationError.email,validationError.zipCode,validationError.phoneNumber, validationError.vatNumber];
        setIsFormValidIdentification(booleanArray.every(bool => bool));
    }

    const zipCodeValidator = (isActuallyValid: boolean) => {
        if(model.address1.postalCode !== undefined) {
            let isNum = /^\d+$/.test(model.address1.postalCode);
                if(isActuallyValid) {
                    validationError.zipCode = isNum;
                    setValidationError({...validationError});

                } else {
                    setIsValidZipCode(isNum)
                }
        }
    }

    const emailValidator = (isActuallyValid : boolean) => {
        const matchedEmail = String(model.emailAddress)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if(isActuallyValid) {
            if(matchedEmail  === null) {
                validationError.email = false;
                setValidationError({...validationError});
            } else {
                validationError.email = true;
                setValidationError({...validationError});
            }
        } else {
            if (matchedEmail === null) {
                setIsValidEmail(false)
            } else {
                setIsValidEmail(true)
            }
        }

    }

    const phoneValidator = (isActuallyValid : boolean) => {
        if(model.idd !== undefined && model.phoneNumber !== undefined) {
            const matchedPhone = String(model.idd + model.phoneNumber)
                .match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
            if(isActuallyValid) {
                if (matchedPhone === null) {
                    validationError.phoneNumber = false;
                    setValidationError({...validationError});
                } else {
                    validationError.phoneNumber = true;
                    setValidationError({...validationError});
                }
            } else {
                if (matchedPhone === null) {
                    setIsValidPhoneNumber(false)
                } else {
                    setIsValidPhoneNumber(true)
                }
            }

        }
    }

    const vatNumberValidator = (isActuallyValid : boolean) => {
        if (model.vatNumber !== undefined) {
            const matchedVat = /[A-Za-z0-9]{1,20}/.test(model.vatNumber);
            if (isActuallyValid) {
                validationError.vatNumber = matchedVat;
                setValidationError({...validationError});
            } else {
                setIsVatNumberValid(matchedVat);
            }
        }
    }

    return (
      <div className="SupplierIdentificationUpsert">
          <h2 className="section-A-font-title mb-5">A. Supplier identification</h2>
          <form className="d-flex flex-column gap-4">
              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="supplierName" className="font-input-label">Supplier Name<span className="red">*</span></label>
                      <input type="text" id="supplierName" className="custom-input input-lg"
                              defaultValue={model.supplierName} onChange={event => model.supplierName = event.target.value}/>
                  </div>
              </div>
              <div id="personNameContainer" className="d-flex gap-5">
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
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="emailAddress" className="font-input-label">
                          Email Address
                          {isValidEmail ? "" : <small> : <small className="red">Invalid</small></small>}
                      </label>
                      <input type="email" id="emailAddress" className={"custom-input input-lg " + (isValidEmail ? "" : "red")} onBlur={() => emailValidator(false)}
                             defaultValue={model.emailAddress} onChange={event => {
                          model.emailAddress = event.target.value;
                          emailValidator(true);
                          identificationFormValidator();
                      }}/>
                  </div>
              </div>
              <div id="addressContainer" className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="address" className="font-input-label">Address</label>
                      <input type="text" id="address" className="custom-input input-lg"
                             defaultValue={model.address1.address} onChange={event => model.address1.address = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="city" className="font-input-label">City</label>
                      <input type="text" id="city" className="custom-input input-lg"
                             defaultValue={model.address1.city} onChange={event => model.address1.city = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="postalCode" className="font-input-label">
                          Postal Code
                          {isValidZipCode ? "" : <small> : <small className="red">Invalid</small></small>}
                      </label>
                      <input type="text" id="postalCode" className={"custom-input input-md " + (isValidZipCode ? "" : "red")} onBlur={() => {
                          zipCodeValidator( false);
                      }}
                             defaultValue={model.address1.postalCode} onChange={event => {
                                 model.address1.postalCode = event.target.value
                                 zipCodeValidator( true);
                                 identificationFormValidator()
                      }}/>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="country" className="font-input-label">Country</label>
                      <select id="country" className="custom-input custom-select input-lg"
                              value={model.address1.country}
                              onChange={(event) => {
                                  setCca2(model.cca2 = countries?.find(c => c.name === event.target.value)?.cca2);
                                  setIdd(model.idd = countries?.find(c => c.name === event.target.value)?.idd.at(0));
                                  setCountry(model.address1.country = event.target.value);
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
                                         model.establishment = !establishment;
                                 }}/>
                          <label id="establishmentCheckbox" htmlFor="establishment" className="font-input-label custom-checkbox mr-3"></label>
                          Establishment (legal registration address if different from above)
                      </label>
                  </div>
              </div>
              <div id="estAddressContainer" className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="address" className="font-input-label">Address</label>
                      <input type="text" id="address" className="custom-input input-lg"
                             defaultValue={model.address2.address} disabled={establishment}
                             onChange={event => model.address2.address = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="city" className="font-input-label">City</label>
                      <input type="text" id="city" className="custom-input input-lg"
                             defaultValue={model.address2.city} disabled={establishment}
                             onChange={event => model.address2.city = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="postalCode" className="font-input-label">
                          Postal Code
                          {isEstablishmentZipCodeValid ? "" : <small> : <small className="red">Invalid</small></small>}
                      </label>
                      <input type="text" id="postalCode" className={"custom-input input-md " + (isEstablishmentZipCodeValid ? "" : "red")}
                             defaultValue={model.address2.postalCode} disabled={establishment}
                             onChange={event => model.address2.postalCode = event.target.value}/>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="country" className="font-input-label">Country</label>
                          <select id="country" className="custom-input custom-select input-lg"
                                  value={model.address2.country} disabled={establishment}
                                  onChange={(event) =>  setEstablishmentCountry(model.address2.country = event.target.value)}>
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
                                         model.governementInstitution = true
                                     }} hidden />
                              <label htmlFor="yes" className="font-input-label custom-radio"></label>
                              <label htmlFor="yes" className="font-input-label">Yes</label>
                          </div>
                          <div className="d-flex gap-2">
                              <input type="radio" id="no" name="governmentInstitution" defaultChecked={governmentInstitution === false}
                                     onChange={() => {
                                         setGovernmentInstitution(false)
                                         model.governementInstitution = false
                                     }} hidden />
                              <label htmlFor="no" className="font-input-label custom-radio"></label>
                              <label htmlFor="no" className="font-input-label">No</label>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="numberPrefix" className="font-input-label">Company Size</label>
                      <div className="tooltip">
                          <span className="tooltiptext"><span className="red">Large companies</span><br />Double signature and double call back required.</span>
                          <select id="companySize" className="custom-input custom-select input-lg tooltip"
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
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
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
                          <input type="tell" id="phoneNumber" className={"custom-input input-fill " + (isValidPhoneNumber ? "" : "red")} onBlur={() => phoneValidator(false)}
                                 defaultValue={model.phoneNumber} onChange={event => {
                              model.phoneNumber = event.target.value;
                              phoneValidator(true);
                              identificationFormValidator();
                          }}/>
                      </div>
                  </div>
              </div>
              <div id="vatContainer" className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="vatNumber" className="font-input-label">
                          Vat Number
                          {isVatNumberValid ? "" : <small> : <small className="red">Invalid</small></small>}
                      </label>
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
                          <input type="text" id="vatNumber" className={"custom-input input-fill " + (isVatNumberValid ? "" : "red")} onBlur={() => vatNumberValidator(false)}
                                 defaultValue={model.vatNumber} onChange={event => {

                                        model.vatNumber = event.target.value;
                                        vatNumberValidator(true);
                                        identificationFormValidator();
                          }}/>
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
                             defaultValue={model.taxId} onChange={event => model.taxId = event.target.value}/>
                  </div>
              </div>
              <div id="vatRegime" className="d-flex flex-column">
                  <label htmlFor="vatRegime" className="font-input-label mb-2">Vat regime</label>
                  <div id="vatRegimeContainer" className="d-flex gap-6">
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
                  <div className="d-flex flex-column container-lg">
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
