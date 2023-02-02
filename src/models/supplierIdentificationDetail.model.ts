import {CountryModel} from "./country.model";

export interface SupplierIdentificationDetailModel {
    supplierName?: string;
    personName?: string;
    personSurname?: string;
    emailAddress?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    establishment?: boolean;
    establishmentAddress?: string;
    establishmentCity?: string;
    establishmentPostalCode?: string;
    establishmentCountry?: string;
    governmentInstitution?: boolean;
    companySize?: string;
    idd?: string;
    phoneNumber?: string;
    cca2?: string;
    vatNumber?: string;
    taxResidenceCountry?: CountryModel;
    taxID?: string;
    vatRegime?: string;
    registrationNumber?: string;
}
