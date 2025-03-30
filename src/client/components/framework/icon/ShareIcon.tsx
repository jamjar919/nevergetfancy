import React from "react";

type ShareIconProps = React.SVGProps<SVGSVGElement> & {}

const ShareIcon: React.FC<ShareIconProps> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
            <path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z"/>
        </svg>
    )
}

export { ShareIcon }