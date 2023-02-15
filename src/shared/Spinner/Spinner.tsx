import './Spinner.css'
import {FC} from "react";

interface SpinnerProps {
    text: string;
}
const Spinner: FC<SpinnerProps> = ({text}) => {
    return (
        <div className="d-flex flex-column align-center">
        <div className="center-body">
            <div className="loader-circle-11">
                <div className="arc"></div>
                <div className="arc"></div>
                <div className="arc"></div>
            </div>
        </div>
    <p className="loader-text">{text}</p></div>
    )
}

export default Spinner;