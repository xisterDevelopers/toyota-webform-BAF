export interface UpdateFileRequestDTO {
    base64File?: string;
    fileName?: string;
    bafId?: string;

    // Not in BE schema
    category?: string
}