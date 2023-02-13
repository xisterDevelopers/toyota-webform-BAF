import axios from "axios";
import {ChangeCategoryRequestDTO} from "../models/ChangeCategoryRequestDTO.model";
import {UpdateFileRequestDTO} from "../models/UpdateFileRequestDTO.model";
import {BafDocumentDTO} from "../models/BafDocumentDTO.model";
import {FileRequestDTO} from "../models/FileRequestDTO.model";
import {DownloadResponseDTO} from "../models/DownloadResponseDTO.model";
import {BaseResponseDTO} from "../models/BaseResponseDTO.model";

const GetDocumentsByBAFId = (bafId: string) : Promise<BafDocumentDTO> => {
    return  axios.get(process.env.REACT_APP_API_URL! + '/Document/GetDocumentsByBAFId/'+ bafId);
};

const DownloadFile = (fileRequest : FileRequestDTO) : Promise<DownloadResponseDTO> => {
    return axios.post(process.env.REACT_APP_API_URL! + '/Document/DownloadFile/', fileRequest)
}

// const GetPrintedBAFById = (bafId: number) => {
//     return  axios.get(process.env.REACT_APP_API_URL! + '/Document/GetPrintedBAFById/'+ bafId);
// };

const ChangeCategoryByFileURL = (changeCategoryRequestDTO: ChangeCategoryRequestDTO) : Promise<BaseResponseDTO> => {
    return  axios.post(process.env.REACT_APP_API_URL! + '/Document/ChangeCategoryByFileURL', changeCategoryRequestDTO);
};

const UploadFileForBAF = (updateFileRequestDTO: UpdateFileRequestDTO) : Promise<BaseResponseDTO> => {
    return  axios.post(process.env.REACT_APP_API_URL! + '/Document/UploadFileForBAF', updateFileRequestDTO);
};

const DeleteFileForBAF = (file: FileRequestDTO) : Promise<BaseResponseDTO> => {
    return  axios.post(process.env.REACT_APP_API_URL! + '/Document/DeleteFileForBAF/', file);
};

const DocumentService = {
    GetDocumentsByBAFId,
    // GetPrintedBAFById,
    ChangeCategoryByFileURL,
    UploadFileForBAF,
    DeleteFileForBAF,
    DownloadFile
};

export default DocumentService;
