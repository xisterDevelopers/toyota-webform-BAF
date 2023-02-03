import db from "../utils/db.json";

const getAll = () => {
    return db.uploadedFiles;
};

const UploadFileService = {
    getAll
};

export default UploadFileService;
