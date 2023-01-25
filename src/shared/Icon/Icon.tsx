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
        icon === 'clock' ? '#DEDEDE' :
        icon === 'warning' ? '#FFA500' :
        icon === 'done' ? '#D6FFC8' : ''

  return(
      <>
          <div className="icon-width" style={{border: '1px solid ' + borderColor}}>
              {
                  icon === 'error' ? <IoWarningOutline className="mb-1" style={{color: '#df0000'}} /> :
                  icon === 'clock' ? <FiClock style={{color: 'gray'}}/> :
                  icon === 'warning' ? <BsExclamationCircle style={{color: '#ffa500'}} /> :
                  icon === 'done' ? <FiCheck style={{color: '#26BC00'}} /> : ''
              }
          </div>
      </>

  )
};

export default Icon;
