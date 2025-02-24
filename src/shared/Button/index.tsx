import React from "react";

type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: ButtonType
};

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button" }) => {
    return <button className="fba-button" type={type} onClick={onClick}>{children}</button>;
};

export default Button;

