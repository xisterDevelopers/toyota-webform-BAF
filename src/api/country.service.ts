import httpCommon from "./http-common";

const getAll = () => {
    return httpCommon.get("/countries");
};

const get = (cca2: any) => {
    return httpCommon.get(`/countries?cca2=${cca2}`);
};

const CountryService = {
    getAll,
    get
};

export default CountryService;
