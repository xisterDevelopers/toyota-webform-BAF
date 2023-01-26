import {CountryModel} from "./country.model";

export interface SupplierIdentificationUpsertModel {
    supplierName: string;
    personName: string;
    personSurname?: string;
    emailAddress?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: CountryModel;
    establishment: boolean;
    establishmentAddress?: string;
    establishmentCity?: string;
    establishmentPostalCode?: string;
    establishmentCountry?: CountryModel;
    governmentInstitution?: boolean;
    companySize?: string;
    idd?: string;
    phoneNumber?: number;
    cca2?: string;
    vatNumber?: string;
    taxResidenceCountry?: CountryModel;
    taxID?: number;
    vatRegime?: string;
    registrationNumber?: number;
}
