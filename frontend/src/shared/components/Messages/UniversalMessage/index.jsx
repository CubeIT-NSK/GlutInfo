import React from "react";
import styles from "./index.module.css";
import Button from "../../Buttons";

const UniversalMessage = ({ title, subtitle, buttonLabel, onButtonClick }) => {

    return (
        <div className={styles.universalTitleWrapper}>
            <h1 className={styles.universalTitle}>{title}</h1>
            <h3 className={styles.universalSubTitle}>{subtitle}</h3>
            <Button
                variant="gradient"
                padding="15px 260.8px"
                onClick={onButtonClick}

            >
                {buttonLabel}
            </Button>
        </div>
    );
}

export default UniversalMessage ;
