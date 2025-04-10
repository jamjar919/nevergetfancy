import React from 'react';

interface ViceCaptainIconProps {
  className?: string;
  size?: number;
}

const ViceCaptainIcon: React.FC<ViceCaptainIconProps> = ({
  className = '',
  size = 24
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      focusable="false"
      className={className}
    >
      <title>Vice Captain</title>
      <circle cx="12" cy="12" r="12" aria-hidden="true"></circle>
      <polygon
        points="13.5 .375 8.925 12.375 4.65 12.375 0 .375 3.15 .375 6.75 10.05 10.35 .375"
        transform="translate(5.25 6)"
        fill={"#FFF"}
        aria-hidden="true"
      ></polygon>
    </svg>
  );
};

export default ViceCaptainIcon;