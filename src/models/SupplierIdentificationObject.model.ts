import {AddressObject} from "./AddressObject.model";

export interface SupplierIdentificationObject {
    supplierName?: string;
    personName?: string;
    personSurname?: string;
    emailAddress?: string;
    establishment?: boolean;
    address1: AddressObject;
    address2: AddressObject;
    governementInstitution?: boolean;
    companySize?: string;
    phoneNumber?: string;
    vatNumber?: string;
    taxResidenceCountry?: string;
    isDifferentFromVATNumber?: boolean;
    taxId?: string;
    vatRegime?: string;
    registrationNumber?: string;
    idd?: string;
    cca2?: string;
}