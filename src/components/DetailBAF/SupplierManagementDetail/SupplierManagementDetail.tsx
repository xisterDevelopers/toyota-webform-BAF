import {SupplierManagementObject} from "../../../models/SupplierManagementObject.model";
import React, {FC} from "react";

interface SupplierManagementDetailProps {
    model: SupplierManagementObject;
}
const SupplierManagementDetail: FC<SupplierManagementDetailProps> = ({model}) => (
    <div className="SupplierManagementDetail">
        <h2 className="section-A-font-title mb-5">C. Supplier's management approval</h2>
        <h3 className="mb-5"><b>First Approval (Operations)</b></h3>
        <div className="d-flex flex-column gap-4">
            <div className="d-flex gap-5">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Name</strong></p>
                    <p>{model.name}</p>
                </div>
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Surname</strong></p>
                    <p>{model.surname}</p>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Position</strong></p>
                    <p>{model.position}</p>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Phone number</strong></p>
                    <p>{model.idd}{model.phoneNumber}</p>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column w-25">
                    <p className="m-0"><strong>Email Address</strong></p>
                    <p>{model.emailAddress}</p>
                </div>
            </div>
        </div>

        {model.name2?.length !== undefined && model.name2.length > 0 ?
            <>
            <h3 className="mb-5"><b>Second Approval Operations (accounting finals)</b></h3>
            <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-5">
                    <div className="d-flex flex-column w-25">
                        <p className="m-0"><strong>Name</strong></p>
                        <p>{model.name2}</p>
                    </div>
                    <div className="d-flex flex-column w-25">
                        <p className="m-0"><strong>Surname</strong></p>
                        <p>{model.surname2}</p>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column w-25">
                        <p className="m-0"><strong>Position</strong></p>
                        <p>{model.position2}</p>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column w-25">
                        <p className="m-0"><strong>Phone number</strong></p>
                        <p>{model.idd2}{model.phoneNumber2}</p>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column w-25">
                        <p className="m-0"><strong>Email Address</strong></p>
                        <p>{model.emailAddress2}</p>
                    </div>
                </div>
            </div>
            </>
            : ""}
    </div>
);

export default SupplierManagementDetail;