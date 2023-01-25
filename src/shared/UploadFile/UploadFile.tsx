import React, { FC } from 'react';
import './UploadFile.css';
import upload from '../../assets/svg/upload.svg';

interface UploadFileProps {
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    upload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    overrideEventDefaults: (event: React.DragEvent<HTMLDivElement>) => void;
}

const UploadFile: FC<UploadFileProps> = (uploadFileProps) => {

    const hiddenFileInput = React.useRef({ } as HTMLInputElement );

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    return(
        <div onDragOver={uploadFileProps.overrideEventDefaults} onDragEnter={uploadFileProps.overrideEventDefaults}
             onDragStart={uploadFileProps.overrideEventDefaults} onDragLeave={uploadFileProps.overrideEventDefaults}
             onDrop={uploadFileProps.handleDrop} className="UploadFile d-flex justify-center align-center flex-column">
                <img width="69" height="54" className="" src={upload} alt="upload"/>
                <span className="mt-3 dark-grey">
                  Drag and drop your files here
                </span>
                <span className="my-3 dark-grey">
                  OR
                </span>
                <button onClick={handleClick}>
                    Browse File
                </button>
                <input type="file" style={{display: 'none'}}
                       ref={hiddenFileInput}
                       onChange={uploadFileProps.upload}/>
        </div>
    );
};

export default UploadFile;
