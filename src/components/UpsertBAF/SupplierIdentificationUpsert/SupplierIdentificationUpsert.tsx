import React, {FC, useLayoutEffect, useState} from 'react';
import './SupplierIdentificationUpsert.css';
import {CountryModel} from "../../../models/country.model";
import {useGlobalContext} from "../../../utils/AppContext";
import {SupplierIdentificationObject} from "../../../models/SupplierIdentificationObject.model";
import {FiInfo} from 'react-icons/fi'

interface SupplierIdentificationUpsertProps {
    model: SupplierIdentificationObject;
    countries: CountryModel[];
}

interface RequiredFields {
    supplierName: null | boolean,
    personName: null | boolean,
    personSurname: null | boolean,
    address: null | boolean,
    city: null | boolean,
    postalCode: null | boolean,
    country: null | boolean,
    governmentInstitution: null | boolean,
    companySize: null | boolean,
    phoneNumber: null | boolean,
    vatNumber: null | boolean,
    taxResidenceCountry: null | boolean
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
    const [isLoaded, setIsLoaded] = useState(false);
    const [tooltipCompanySize, setTooltipCompanySize] = useState(false);
    const [tooltipGovernment, setTooltipGovernment] = useState(false);
    const [validationError, setValidationError] = useState({email: false, phoneNumber: false, vatNumber: false});
    const [validationRequired, setValidationRequired] = useState<RequiredFields>({
        supplierName: null,
        personName: null,
        personSurname: null,
        address: null,
        city: null,
        postalCode: null,
        country: null,
        governmentInstitution: null,
        companySize: null,
        phoneNumber: null,
        vatNumber: null,
        taxResidenceCountry: null
    })

    const {setIsFormValidIdentification, setIsOnlyFirstApproval} = useGlobalContext()
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
        identificationFormValidator()
    }, [model.vatRegime, model.establishment, model.governementInstitution,
        model.companySize, model.address1.country, model.taxId, model,vatNumber, isLoaded, model.emailAddress,model.phoneNumber,model.vatNumber,model.address1.postalCode])

    const identificationFormValidator = () => {
        const booleanArray = [validationError.email, validationRequired.supplierName,
            validationRequired.personName, validationRequired.personSurname, validationRequired.address,validationRequired.city,
            validationRequired.postalCode,validationRequired.country, validationRequired.governmentInstitution,
            validationRequired.companySize,validationRequired.phoneNumber,validationRequired.vatNumber, validationRequired.taxResidenceCountry];
        setIsFormValidIdentification(booleanArray.every(bool => bool));
    }

    const requireValidator = (field : string) => {
        switch(field) {
            case 'supplierName':
                validationRequired.supplierName =
                    model.supplierName !== undefined && model.supplierName?.length > 0 ? validationRequired.supplierName = true : false;
                break;
            case 'personName':
                validationRequired.personName =
                    model.personName !== undefined && model.personName?.length > 0 ? validationRequired.personName = true : false;
                break;
            case 'personSurname':
                validationRequired.personSurname =
                    model.personSurname !== undefined && model.personSurname?.length > 0 ? validationRequired.personSurname = true : false;
                break;
            case 'address':
                validationRequired.address =
                    model.address1.address !== undefined && model.address1.address?.length > 0 ? validationRequired.address = true : false;
                break;
            case 'city':
                validationRequired.city =
                    model.address1.city !== undefined && model.address1.city?.length > 0 ? validationRequired.city = true : false;
                break;
            case 'postalCode':
                validationRequired.postalCode =
                    model.address1.postalCode !== undefined && model.address1.postalCode?.length > 0 ? validationRequired.postalCode = true : false;
                break;
            case 'country':
                validationRequired.country =
                    model.address1.country !== undefined && model.address1.country?.length > 0 ? validationRequired.country = true : false;
                break;
            case 'governmentInstitution':
                validationRequired.governmentInstitution =
                    model.governementInstitution !== undefined ? validationRequired.governmentInstitution = true : false;
                break;
            case 'companySize':
                validationRequired.companySize =
                    model.companySize !== undefined && model.companySize.length > 0 ? validationRequired.companySize = true : false;
                break;
            case 'phoneNumber':
                validationRequired.phoneNumber =
                    model.phoneNumber !== undefined && model.phoneNumber.length > 0 ? validationRequired.phoneNumber = true : false;
                break;
            case 'vatNumber':
                validationRequired.vatNumber =
                    model.vatNumber !== undefined && model.vatNumber.length > 0 ? validationRequired.vatNumber = true : false;
                break;
            case 'taxResidenceCountry':
                validationRequired.taxResidenceCountry =
                    model.taxResidenceCountry !== undefined && model.taxResidenceCountry.length > 0 ? validationRequired.taxResidenceCountry = true : false;
                break;
        }
        setValidationRequired({...validationRequired})
        identificationFormValidator()
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

    return (
      <div className="SupplierIdentificationUpsert">
          <h2 className="section-A-font-title mb-5">A. Supplier identification</h2>
          <form className="d-flex flex-column gap-4">
              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="supplierName" className="font-input-label">
                          Supplier Name<span className="red">*</span>
                          {!validationRequired.supplierName && validationRequired.supplierName !== null ? <small> : <small className="red">Required</small></small> : ""}
                      </label>
                      <input type="text" id="supplierName" className="custom-input input-lg" onBlur={() => requireValidator('supplierName')}
                              defaultValue={model.supplierName} onChange={event => {
                                  model.supplierName = event.target.value;
                                  requireValidator('supplierName');
                      }}/>
                  </div>
              </div>
              <div id="personNameContainer" className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="personName" className="font-input-label">
                          Person Name<span className="red">*</span>
                          {!validationRequired.personName && validationRequired.personName !== null ? <small> : <small className="red">Required</small></small> : ""}
                      </label>
                      <input type="text" id="personName" className="custom-input input-lg" onBlur={() => requireValidator('personName')}
                             defaultValue={model.personName} onChange={event => {
                                  model.personName = event.target.value;
                                  requireValidator('personName');
                      }}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="personSurname" className="font-input-label">
                          Person Surname<span className="red">*</span>
                          {!validationRequired.personSurname && validationRequired.personSurname !== null ? <small> : <small className="red">Required</small></small> : ""}
                      </label>
                      <input type="text" id="personSurname" className="custom-input input-lg" onBlur={() => requireValidator('personSurname')}
                             defaultValue={model.personSurname} onChange={event => {
                                  model.personSurname = event.target.value;
                                  requireValidator('personSurname');
                      }}/>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="emailAddress" className="font-input-label">
                          Email Address<span className="red">*</span>
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
                      <label htmlFor="address" className="font-input-label">
                          Address<span className="red">*</span>
                          {!validationRequired.address && validationRequired.address !== null ? <small> : <small className="red">Required</small></small> : ""}
                      </label>
                      <input type="text" id="address" className="custom-input input-lg" onBlur={() => requireValidator('address')}
                             defaultValue={model.address1.address} onChange={event => {
                                  model.address1.address = event.target.value;
                                  requireValidator('address');
                      }}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="city" className="font-input-label">
                          City<span className="red">*</span>
                          {!validationRequired.city && validationRequired.city !== null ? <small> : <small className="red">Required</small></small> : ""}
                      </label>
                      <input type="text" id="city" className="custom-input input-lg" onBlur={() => requireValidator('city')}
                             defaultValue={model.address1.city} onChange={event => {
                                  model.address1.city = event.target.value;
                                  requireValidator('city');
                      }}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="postalCode" className="font-input-label">
                          Postal Code<span className="red">*</span>
                          {!validationRequired.postalCode && validationRequired.postalCode !== null ? <small> : <small className="red">Required</small></small> : ""}
                      </label>
                      <input type="text" id="postalCode" className="custom-input input-md" onBlur={() => requireValidator('postalCode')}
                             defaultValue={model.address1.postalCode} onChange={event => {
                                 model.address1.postalCode = event.target.value;
                                 requireValidator('postalCode');
                      }}/>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="country" className="font-input-label">
                          Country<span className="red">*</span>
                          {!validationRequired.country && validationRequired.country !== null ? <small> : <small className="red">Required</small></small> : ""}
                      </label>
                      <select id="country" className="custom-input custom-select input-lg" onBlur={() => requireValidator('country')}
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
                             defaultValue={model.address2.address} disabled={!establishment}
                             onChange={event => model.address2.address = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="city" className="font-input-label">City</label>
                      <input type="text" id="city" className="custom-input input-lg"
                             defaultValue={model.address2.city} disabled={!establishment}
                             onChange={event => model.address2.city = event.target.value}/>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="postalCode" className="font-input-label">Postal Code</label>
                      <input type="text" id="postalCode" className="custom-input input-md"
                             defaultValue={model.address2.postalCode} disabled={!establishment}
                             onChange={event => model.address2.postalCode = event.target.value}/>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="country" className="font-input-label">Country</label>
                          <select id="country" className="custom-input custom-select input-lg"
                                  value={model.address2.country} disabled={!establishment}
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
                      <div className="d-flex">
                          <label htmlFor="governmentInstitution" className="font-input-label mb-2">
                              Government institution<span className="red">*</span>
                              {!validationRequired.governmentInstitution && validationRequired.governmentInstitution !== null ? <small> : <small className="red">Required</small></small> : ""}
                          </label>
                          <div className="tooltip">
                            <span className="tooltiptext">
                                <b>Government agency - One signature and one call back required + Supporting documentation
                                    (government agency’s website validated by is department)</b>
                            </span>
                              <div className="dark-grey d-flex justify-center align-center mx-2 font-icon mt-2">
                                  <FiInfo onClick={() => setTooltipGovernment(!tooltipGovernment)}></FiInfo>
                              </div>
                          </div>
                      </div>


                      <div className="d-flex gap-6">
                          <div className="d-flex gap-2">
                              <input type="radio" id="yes" name="governmentInstitution" checked={governmentInstitution === true}
                                     onChange={() => {
                                         setGovernmentInstitution(true)
                                         model.governementInstitution = true
                                         requireValidator('governmentInstitution')
                                     }} hidden />
                              <label htmlFor="yes" className="font-input-label custom-radio"></label>
                              <label htmlFor="yes" className="font-input-label">Yes</label>
                          </div>
                          <div className="d-flex gap-2">
                              <input type="radio" id="no" name="governmentInstitution" defaultChecked={governmentInstitution === false}
                                     onChange={() => {
                                         setGovernmentInstitution(false)
                                         model.governementInstitution = false
                                         requireValidator('governmentInstitution')
                                     }} hidden />
                              <label htmlFor="no" className="font-input-label custom-radio"></label>
                              <label htmlFor="no" className="font-input-label">No</label>
                          </div>
                      </div>
                  </div>
              </div>

              {
                  tooltipGovernment ? <span className="tooltipclick"><b>Government agency - One signature and one call back required + Supporting documentation
                                    (government agency’s website validated by is department)</b></span> : ""
              }

              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="numberPrefix" className="font-input-label">
                          Company Size<span className="red">*</span>
                          {!validationRequired.companySize && validationRequired.companySize !== null ? <small> : <small className="red">Required</small></small> : ""}
                      </label>
                          <select id="companySize" className="custom-input custom-select input-lg" onBlur={() => requireValidator('companySize')}
                                  value={companySize} onChange={event => {
                              setCompanySize(event.target.value);
                              model.companySize = event.target.value;
                              event.target.value === 'small' ? setIsOnlyFirstApproval(true) : setIsOnlyFirstApproval(null)
                          }}>
                              <option value="small">1 Person companies/small companies</option>
                              <option value="large">Large companies</option>
                          </select>

                  </div>
                  <div className="tooltip">
                      <span className="tooltiptext"><b>1 Person companies/small companies* - One signature and one call back required</b>
                            <p>*1 person companies/small companies - only one person within the company of managment level</p>
                            <b>Large companies - Double signature and double call back required</b></span>
                      <div className="dark-grey d-flex justify-center align-center mx-2 font-icon mt-5">
                          <FiInfo onClick={() => setTooltipCompanySize(!tooltipCompanySize)}></FiInfo>
                      </div>
                  </div>
              </div>
              {
                tooltipCompanySize ? <span className="tooltipclick"><b>1 Person companies/small companies* - One signature and one call back required</b>
                            <p>*1 person companies/small companies - only one person within the company of managment level</p>
                            <b>Large companies - Double signature and double call back required</b></span> : ""
              }
              <div className="d-flex">
                  <div className="d-flex flex-column container-lg">
                      <label htmlFor="phoneNumber" className="font-input-label">
                          Phone Number<span className="red">*</span>
                          {!validationRequired.phoneNumber && validationRequired.phoneNumber !== null ? <small> : <small className="red">Required</small></small> : ""}
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
                          <input type="number" id="phoneNumber" className="custom-input input-fill" onBlur={() => requireValidator('phoneNumber')}
                                 defaultValue={model.phoneNumber} onChange={event => {
                                      model.phoneNumber = event.target.value;
                                      requireValidator('phoneNumber');
                          }}/>
                      </div>
                  </div>
              </div>
              <div id="vatContainer" className="d-flex gap-5">
                  <div className="d-flex flex-column">
                      <label htmlFor="vatNumber" className="font-input-label">
                          Vat Number<span className="red">*</span>
                          {!validationRequired.vatNumber && validationRequired.vatNumber !== null ? <small> : <small className="red">Required</small></small> : ""}
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
                          <input type="text" id="vatNumber" className="custom-input input-fill" onBlur={() => requireValidator('vatNumber')}
                                 defaultValue={model.vatNumber} onChange={event => {
                                        model.vatNumber = event.target.value;
                                        requireValidator('vatNumber');
                          }}/>
                      </div>
                  </div>
                  <div className="d-flex flex-column">
                      <label htmlFor="taxResidenceCountry" className="font-input-label">
                          Tax residence country<span className="red">*</span>
                          {!validationRequired.taxResidenceCountry && validationRequired.taxResidenceCountry !== null ? <small> : <small className="red">Required</small></small> : ""}
                      </label>
                      <select id="taxResidenceCountry" onBlur={() => requireValidator('taxResidenceCountry')}
                              className="custom-input custom-select input-lg" onChange={event => model.taxResidenceCountry = event.target.value}>
                          <option value=""></option>
                          <option value=" "></option>
                      </select>
                  </div>
              </div>
              <div className="d-flex">
                  <div className="d-flex flex-column">
                      <label htmlFor="taxID" className="font-input-label mb-2">Tax ID<span className="red">*</span></label>
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
