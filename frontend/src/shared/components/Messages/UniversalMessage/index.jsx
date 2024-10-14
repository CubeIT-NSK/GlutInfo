import React from "react";
import styles from "./index.module.css";

const UniversalMessage = ({ title, subtitle, buttonLabel, onButtonClick }) => {

    return (
        <div className={styles.universalTitleWrapper}>
            <h1 className={styles.universalTitle}>{title}</h1>
            <h3 className={styles.universalSubTitle}>{subtitle}</h3>
            <button className={styles.universalBtn} onClick={onButtonClick}>
                <span>{buttonLabel}</span>
            </button>
        </div>
    );
}

export default UniversalMessage ;
