import React from 'react';
import styles from './index.module.css';

const Button = ({
    onClick,
    children,
    variant = 'gradient',
    padding = '22.5px 45px',
    className = '',
    color = '',
    disabled = false,
    fontSize = 'big',
    boxShadow = "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
    ...props
  }) => {
    const buttonClass =
      `${variant === 'gradient' ? styles.gradientBtn : variant === 'gray' ? styles.grayBtn : styles.whiteBtn}
       ${disabled ? styles.disabledBtn : ''}`;

    const spanClass =
      `${color === 'black' ? styles.blackBtnColor : color === 'gray' ? styles.grayBtnColor : styles.whiteBtnColor}
       ${fontSize === 'big' ? styles.bigBtnSpan : fontSize === 'mini' ? styles.miniBtnSpan :styles.smallBtnSpan}`;

    return (
      <button
        onClick={onClick}
        className={`${buttonClass} ${className}`}
        style={{ boxShadow }}
        disabled={disabled}
        {...props}
      >
        <span
          className={`${spanClass}`}
          style={{ padding }}
        >
          {children}
        </span>
      </button>
    );
  };

  export default Button;
