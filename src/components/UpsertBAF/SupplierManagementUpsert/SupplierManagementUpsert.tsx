import React, {FC, useContext, useState} from "react";
import {CountryModel} from "../../../models/country.model";
import {SupplierManagementObject} from "../../../models/SupplierManagementObject.model";
import {useGlobalContext} from "../../../utils/AppContext";

interface SupplierManagementUpsertProps {
    countries : CountryModel[];
    model: SupplierManagementObject;
}

interface RequireFields {
    name: null | boolean;
    surname: null | boolean;
    position: null | boolean;
    phoneNumber: null | boolean;
    name2: null | boolean;
    surname2: null | boolean;
    position2: null | boolean;
    phoneNumber2: null | boolean;
}

const SupplierManagementUpsert : FC<SupplierManagementUpsertProps> = ({countries, model}) => {
const [isValidEmail, setIsValidEmail] = useState(true);
const [isValidEmail2, setIsValidEmail2] = useState(true);
const [idd, setIdd] = useState(model.idd);
const [validationError, setValidationError] = useState({email: false, email2: false});
const [validationRequired, setValidationRequired] = useState<RequireFields>({
    name: null,
    name2: null,
    phoneNumber: null,
    phoneNumber2: null,
    position: null,
    position2: null,
    surname: null,
    surname2: null
});

const {setIsFormValidManagement} = useGlobalContext()

    const requireValidator = (field : string) => {
        switch(field) {
            case 'name':
                validationRequired.name =
                    model.name !== undefined && model.name?.length > 0 ? validationRequired.name = true : false;
                break;
            case 'surname':
                validationRequired.surname =
                    model.surname !== undefined && model.surname?.length > 0 ? validationRequired.surname = true : false;
                break;
            case 'position':
                validationRequired.position =
                    model.position !== undefined && model.position?.length > 0 ? validationRequired.position = true : false;
                break;
            case 'phoneNumber':
                validationRequired.phoneNumber =
                    model.phoneNumber !== undefined && model.phoneNumber.length > 0 ? validationRequired.phoneNumber = true : false;
                break;
            case 'name2':
                validationRequired.name2 =
                    model.name2 !== undefined && model.name2?.length > 0 ? validationRequired.name2 = true : false;
                break;
            case 'surname2':
                validationRequired.surname2 =
                    model.surname2 !== undefined && model.surname2?.length > 0 ? validationRequired.surname2 = true : false;
                break;
            case 'position2':
                validationRequired.position2 =
                    model.position2 !== undefined && model.position2?.length > 0 ? validationRequired.position2 = true : false;
                break;
            case 'phoneNumber2':
                validationRequired.phoneNumber2 =
                    model.phoneNumber2 !== undefined && model.phoneNumber2.length > 0 ? validationRequired.phoneNumber2 = true : false;
                break;
        }
        setValidationRequired({...validationRequired})
        identificationFormValidator()
    }

    const identificationFormValidator = () => {
        const booleanArray = [validationError.email, validationRequired.name,
            validationRequired.surname, validationRequired.position, validationRequired.phoneNumber,validationRequired.name2,
            validationRequired.surname2,validationRequired.position2, validationRequired.phoneNumber2];
        setIsFormValidManagement(booleanArray.every(bool => bool));
    }
    const emailValidator = (onChange : boolean, email: string) => {
        if (email === 'email') {
            const matchedEmail = String(model.emailAddress)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            if(onChange) {
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
        } if(email === 'email2') {
            const matchedEmail = String(model.emailAddress2)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            if(onChange) {
                if(matchedEmail  === null) {
                    validationError.email2 = false;
                    setValidationError({...validationError});
                } else {
                    validationError.email2 = true;
                    setValidationError({...validationError});
                }
            } else {
                if (matchedEmail === null) {
                    setIsValidEmail2(false)
                } else {
                    setIsValidEmail2(true)
                }
            }
        }


    }

    return (
        <div className="SupplierManagementUpsert">
            <h2 className="section-A-font-title mb-5">C. Supplier's management approval</h2>
            <form className="d-flex flex-column gap-4">
                <h3><strong>First Approval (Operations)</strong></h3>
                <div id="personNameContainer" className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label htmlFor="nameApproval" className="font-input-label">
                            Name <span className="red">*</span>
                            {!validationRequired.name && validationRequired.name !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" id="nameApproval" className="custom-input input-lg" onBlur={() => requireValidator('name')}
                               defaultValue={model.name} onChange={event => {
                            model.name = event.target.value;
                            requireValidator('name');
                        }}/>
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="surnameApproval" className="font-input-label">
                            Surname <span className="red">*</span>
                            {!validationRequired.surname && validationRequired.surname !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" id="surnameApproval" className="custom-input input-lg" onBlur={() => requireValidator('surname')}
                               defaultValue={model.surname} onChange={event => {
                            model.surname = event.target.value;
                            requireValidator('surname');
                        }}/>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column container-lg">
                        <label htmlFor="positionApproval" className="font-input-label">
                            Position <span className="red">*</span>
                            {!validationRequired.position && validationRequired.position !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" id="positionApproval" className="custom-input input-lg" onBlur={() => requireValidator('position')}
                               defaultValue={model.position} onChange={event => {
                            model.position = event.target.value;
                            requireValidator('position');
                        }}/>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column container-lg">
                        <label htmlFor="phoneNumberApproval" className="font-input-label">
                            Phone Number <span className="red">*</span>
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
                            <input type="number" id="phoneNumberApproval" className="custom-input input-fill" onBlur={() => requireValidator('phoneNumber')}
                                   defaultValue={model.phoneNumber} onChange={event => {
                                model.phoneNumber = event.target.value;
                                requireValidator('phoneNumber');
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column container-lg">
                        <label htmlFor="emailAddressApproval" className="font-input-label">
                            Email Address <span className="red">*</span>
                            {isValidEmail ? "" : <small> : <small className="red">Invalid</small></small>}
                        </label>
                        <input type="email" id="emailAddressApproval" className={"custom-input input-lg " + (isValidEmail ? "" : "red")} onBlur={() => emailValidator(false, "email")}
                               defaultValue={model.emailAddress} onChange={event => {
                            model.emailAddress = event.target.value;
                            emailValidator(true, "email");
                        }}/>
                    </div>
                </div>

                <h3 className="mt-6"><strong>Second Approval Operations (accounting finals)</strong></h3>
                <div id="personNameContainer" className="d-flex gap-5">
                    <div className="d-flex flex-column">
                        <label htmlFor="nameApproval2" className="font-input-label">
                            Name <span className="red">*</span>
                            {!validationRequired.name2 && validationRequired.name2 !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" id="nameApproval2" className="custom-input input-lg" onBlur={() => requireValidator('name2')}
                               defaultValue={model.name2} onChange={event => {
                            model.name2 = event.target.value;
                            requireValidator('name2');
                        }}/>
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="surnameApproval2" className="font-input-label">
                            Surname <span className="red">*</span>
                            {!validationRequired.surname2 && validationRequired.surname2 !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" id="surnameApproval2" className="custom-input input-lg" onBlur={() => requireValidator('surname2')}
                               defaultValue={model.surname2} onChange={event => {
                            model.surname2 = event.target.value;
                            requireValidator('surname2');
                        }}/>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column container-lg">
                        <label htmlFor="positionApproval2" className="font-input-label">
                            Position <span className="red">*</span>
                            {!validationRequired.position2 && validationRequired.position2 !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <input type="text" id="positionApproval2" className="custom-input input-lg" onBlur={() => requireValidator('position2')}
                               defaultValue={model.position2} onChange={event => {
                            model.position2 = event.target.value;
                            requireValidator('position2');
                        }}/>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column container-lg">
                        <label htmlFor="phoneNumberApproval2" className="font-input-label">
                            Phone Number <span className="red">*</span>
                            {!validationRequired.phoneNumber2 && validationRequired.phoneNumber2 !== null ? <small> : <small className="red">Required</small></small> : ""}
                        </label>
                        <div className="d-flex input-lg gap-2">
                            <select id="phonePrefix" className="custom-input custom-select input-md" value={model.idd2}
                                    onChange={(event => setIdd(model.idd2 = event.target.value))}>
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
                            <input type="number" id="phoneNumberApproval2" className="custom-input input-fill" onBlur={() => requireValidator('phoneNumber2')}
                                   defaultValue={model.phoneNumber2} onChange={event => {
                                model.phoneNumber2 = event.target.value;
                                requireValidator('phoneNumber2');
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column container-lg">
                        <label htmlFor="emailAddressApproval2" className="font-input-label">
                            Email Address <span className="red">*</span>
                            {isValidEmail2 ? "" : <small> : <small className="red">Invalid</small></small>}
                        </label>
                        <input type="email" id="emailAddressApproval2" className={"custom-input input-lg " + (isValidEmail2 ? "" : "red")} onBlur={() => emailValidator(false, "email2")}
                               defaultValue={model.emailAddress2} onChange={event => {
                            model.emailAddress2 = event.target.value;
                            emailValidator(true, "email2");
                        }}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SupplierManagementUpsert;