import React, {FC} from 'react';
import './Icon.css';
import {IoWarningOutline} from 'react-icons/io5';
import {FiClock} from 'react-icons/fi'
import {BsExclamationCircle} from 'react-icons/bs'
import {FiCheck} from 'react-icons/fi'

interface IconProps {
    icon : string;
}

const Icon: FC<IconProps> = ({icon}) => {
    let borderColor =
        icon === 'error' ? '#FFDEDE' :
        icon === 'errorPopUp' ? '#FFDEDE' :
        icon === 'clock' ? '#DEDEDE' :
        icon === 'warning' ? '#F29E1F' :
        icon === 'done' ? '#D6FFC8' : ''
    let backgroundErrorPopUp = icon === 'errorPopUp' ? 'bg-light-red' : 'bg-white'

  return(
      <>
          <div className={"icon-width " + backgroundErrorPopUp} style={{border: '1px solid ' + borderColor}}>
              {
                  icon === 'error' ? <IoWarningOutline className="red mb-1" /> :
                  icon === 'errorPopUp' ? <IoWarningOutline className="red mb-1" /> :
                  icon === 'clock' ? <FiClock className="dark-grey" /> :
                  icon === 'warning' ? <BsExclamationCircle className="orange" /> :
                  icon === 'done' ? <FiCheck className="green" /> : ''
              }
          </div>
      </>

  )
};

export default Icon;
