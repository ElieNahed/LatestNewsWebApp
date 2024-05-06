import React from "react";

interface ButtonIconProps {
  placeholder?: string;
  icon?: string;
  className?: string;
  clickListener: () => void;
  logoClassName?: string;
  style?: React.CSSProperties; // Add this line
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  placeholder,
  icon,
  className,
  clickListener,
  logoClassName,
  style, // Add this line
}) => {
  return (
    <div
      onClick={clickListener}
      className={`flex justify-between items-center px-3 py-1.5 font-monserat cursor-pointer ${className}`}
      style={style} // Add this line
    >
      <div>{placeholder}</div>
      {icon && <img alt="logo" className={logoClassName} src={icon} />}
    </div>
  );
};

export default ButtonIcon;
