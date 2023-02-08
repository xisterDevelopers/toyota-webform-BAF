import axios from "axios";
import {ChangeCategoryRequestDTO} from "../models/ChangeCategoryRequestDTO.model";
import {UpdateFileRequestDTO} from "../models/UpdateFileRequestDTO.model";

const GetDocumentsByBAFId = (bafId: number) => {
    return  axios.get(process.env.REACT_APP_API_URL! + '/Document/GetDocumentsByBAFId/'+ bafId);
};

const GetPrintedBAFById = (bafId: number) => {
    return  axios.get(process.env.REACT_APP_API_URL! + '/Document/GetPrintedBAFById/'+ bafId);
};

const ChangeCategoryByFileURL = (changeCategoryRequestDTO: ChangeCategoryRequestDTO) => {
    return  axios.post(process.env.REACT_APP_API_URL! + '/Document/ChangeCategoryByFileURL', changeCategoryRequestDTO);
};

const UploadFileForBAF = (updateFileRequestDTO: UpdateFileRequestDTO) => {
    return  axios.post(process.env.REACT_APP_API_URL! + '/Document/UploadFileForBAF', updateFileRequestDTO);
};

const DeleteFileForBAF = (fileUrl: string) => {
    return  axios.delete(process.env.REACT_APP_API_URL! + '/Document/DeleteFileForBAF/' + fileUrl);
};

const DocumentService = {
    GetDocumentsByBAFId,
    GetPrintedBAFById,
    ChangeCategoryByFileURL,
    UploadFileForBAF,
    DeleteFileForBAF
};

export default DocumentService;
