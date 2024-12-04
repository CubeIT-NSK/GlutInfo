import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { postApiEmailConfirmationVerify } from "../../../../api/api";
import styles from './index.module.css'

export default function RegistrationEmailConfirmationMessage() {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    console.log('Токен получен:', token);

    useEffect(() => {
        const confirmEmail = async () => {
            if  (!token) {
                console.log("Token is missing");
                return;
            }

            try {
                const status = await postApiEmailConfirmationVerify({ token });

                if (status === 200) {
                    console.log("Verification complete", status);
                    navigate('/registration/confirmation-success');
                } else if (status === 400) {
                    console.error("Invalid or expired token", status);
                    navigate('/registration/account-confirmation-error');
                } else {
                    console.error("Unexpected error:", status);
                    navigate('/registration/account-confirmation-error');
                }
            } catch (error) {
                console.error("Error during email confirmation");
                navigate('/registration/account-confirmation-error');
            }
        };

        confirmEmail();

    }, [token, navigate]);

    return (
            <>
                <div className={styles.Wrapper}>
                    <section className={styles.successTokSection}>
                        <div className={styles.successTokTitleWrapper}>
                            <h1 className={styles.tokTitle}>Подтверждаем ваш email...</h1>
                        </div>
                    </section>
                </div>
            </>
    );
}
