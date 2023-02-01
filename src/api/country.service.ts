import db from "../utils/db.json";

const getAll = () => {
    return db.countries;
};

const get = (cca2: any) => {
    return db.countries.filter(c => c.cca2 === cca2);
};

const CountryService = {
    getAll,
    get
};

export default CountryService;
