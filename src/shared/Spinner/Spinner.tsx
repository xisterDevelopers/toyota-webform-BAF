import './Spinner.css'

const Spinner = () => {
    return (
        <div className="d-flex flex-column align-center">
        <div className="center-body">
            <div className="loader-circle-11">
                <div className="arc"></div>
                <div className="arc"></div>
                <div className="arc"></div>
            </div>
        </div>
    <p className="loader-text">Loading</p></div>
    )
}

export default Spinner;