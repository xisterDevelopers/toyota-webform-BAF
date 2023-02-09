import React, {FC, ReactElement} from 'react';
import './Banner.css';
import Icon from "../Icon/Icon";

interface BannerProps {
    stroke: string;
    fill: string;
    content: ReactElement;
    icon: string;
}

const Banner: FC<BannerProps> = ({stroke,fill,content,icon}) => {
    return(
      <div id="sharedBanner" className={"banner-container p-4 " + fill + " " + stroke}>
          <Icon icon={icon} />
          <div className="mx-3 content-container">
              {content}
          </div>
      </div>
    );
};

export default Banner;
