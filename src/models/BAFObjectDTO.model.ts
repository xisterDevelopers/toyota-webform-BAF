import {SupplierIdentificationObject} from "./SupplierIdentificationObject.model";
import {SupplierBankDetailsObject} from "./SupplierBankDetailsObject.model";

export interface BAFObjectDTO {
    supplierIdentification?: SupplierIdentificationObject;
    supplierBankDetails?: SupplierBankDetailsObject;
    bafId?: string;
    bafState?: string;
    comebackReason?: string;
    riskCategory?: string;
    acceptGeneralRules?: boolean;
    acceptCodeOfConduct?: boolean;
}