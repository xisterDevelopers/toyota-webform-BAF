import React, { FC } from 'react';
import './SupplierIdentificationDetail.css';
import {SupplierIdentificationDetailModel} from "../../../models/supplierIdentificationDetail.model";

interface SupplierIdentificationDetailProps {
    model: SupplierIdentificationDetailModel;
}

const SupplierIdentificationDetail: FC<SupplierIdentificationDetailProps> = ({model}) => (
    <div className="SupplierIdentificationDetail">
        <h2 className="section-A-font-title mb-5">A. Supplier identification</h2>
        <div className="d-flex flex-column gap-4">
            <div className="d-flex w-25">
                <div className="d-flex flex-column">
                    <p className="m-0"><strong>Supplier Name</strong></p>
                    <p>{model.supplierName}</p>
                </div>
            </div>
            <div className="d-flex gap-5">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Person Name</strong></p>
                    <p>{model.personName}</p>
                </div>
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Person Surname</strong></p>
                    <p>{model.personSurname}</p>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Email Address</strong></p>
                    <p>{model.emailAddress}</p>
                </div>
            </div>
            <div className="d-flex gap-5">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Address</strong></p>
                    <p>{model.address}</p>
                </div>
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>City</strong></p>
                    <p>{model.city}</p>
                </div>
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Postal Code</strong></p>
                    <p>{model.postalCode}</p>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Country</strong></p>
                    <p>{model.country}</p>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column">
                    <label htmlFor="establishment" className="d-flex font-input-label">
                        <input type="checkbox" id="establishment" hidden defaultChecked={model.establishment} disabled={true} />
                        <label htmlFor="establishment" className="font-input-label custom-checkbox mr-3"></label>
                        Establishment (legal registration address if different from above)
                    </label>
                </div>
            </div>
            <div className="d-flex gap-5">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Address</strong></p>
                    <p>{model.establishmentAddress}</p>
                </div>
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>City</strong></p>
                    <p>{model.establishmentCity}</p>
                </div>
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Postal Code</strong></p>
                    <p>{model.establishmentPostalCode}</p>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Country</strong></p>
                    <p>{model.establishmentCountry}</p>
                </div>
            </div>
            <div className="d-flex py-3">
                <div id="governmentInstitution" className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Government institution</strong></p>
                    <p>{model.governmentInstitution ? "Yes" : "No"}</p>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Company size</strong></p>
                    <p>{model.companySize}</p>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Phone number</strong></p>
                    <p>{model.idd}{model.phoneNumber}</p>
                </div>
            </div>
            <div className="d-flex gap-5">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Vat number</strong></p>
                    <p className="word-wrap">{model.cca2}{model.vatNumber}</p>
                </div>
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Tax residence country</strong></p>
                    <p>{model.taxResidenceCountry?.name}</p>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>TaxID</strong></p>
                    <p>{model.taxID}</p>
                </div>
            </div>
            <div id="vatRegime" className="d-flex flex-column">
                <p className="m-0"><strong>Vat regime</strong></p>
                <p>{model.vatRegime}</p>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Registration number</strong></p>
                    <p>{model.registrationNumber}</p>
                </div>
            </div>
        </div>
    </div>
);

export default SupplierIdentificationDetail;
