import React, { FC } from 'react';
import './DetailBAF.css';
import {useParams} from "react-router-dom";

interface DetailBafProps {}

const DetailBaf: FC<DetailBafProps> = () => {
    let {id} = useParams();

    return(
        <div className="DetailBAF">
            {id}
        </div>
    );
};

export default DetailBaf;
