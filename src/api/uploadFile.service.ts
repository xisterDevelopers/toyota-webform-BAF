import db from "../utils/db.json";

const getAll = () => {
    return db.uploadedFiles;
};

const FormService = {
    getAll
};

export default FormService;
