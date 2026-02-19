import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import CustomSelect from "../../shared/components/CustomSelect";
import Button from "../../shared/components/Buttons";
import icons from "../../shared/resources/icon";
import { useTranslation } from "../../hooks/useTranslation";
import { api } from "../../shared/api/api";

import styles from "./index.module.css";

const createValidationSchema = (t) =>
  yup.object().shape({
    firstName: yup.string().required(t("registration.errors.firstNameRequired")),
    lastName: yup.string().required(t("registration.errors.lastNameRequired")),
    middleName: yup.string().required(t("registration.errors.middleNameRequired")),
    birthDate: yup
      .date()
      .transform((value, originalValue) => (originalValue === "" ? null : value))
      .nullable()
      .required(t("registration.errors.birthDateRequired"))
      .max(new Date(), t("registration.errors.birthDateFuture")),
    phoneNumber: yup
      .string()
      .required(t("registration.errors.phoneRequired"))
      .matches(/^[+][7] \(\d{3}\) \d{3}-\d{2}-\d{2}$/, t("registration.errors.phoneInvalid")),
    email: yup
      .string()
      .email(t("registration.errors.emailInvalid"))
      .required(t("registration.errors.emailRequired")),
    userType: yup.string().required(t("registration.errors.userTypeRequired")),
    password: yup.string().required(t("registration.errors.passwordRequired")),
  });

const createUserTypeOptions = (t) => [
  { value: "", label: t("registration.options.placeholder"), isPlaceholder: true },
  { value: "patient", label: t("registration.options.patient") },
  { value: "consultant", label: t("registration.options.consultant") },
];

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = useMemo(() => createValidationSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const userTypeOptions = useMemo(() => createUserTypeOptions(t), [t]);

  useEffect(() => {
    register("userType");
    setValue("userType", "");
  }, [register, setValue]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit = useCallback(
    async (formData) => {
      setSubmitError(null);
      setIsSubmitting(true);

      const birthDate = formData.birthDate
        ? new Date(formData.birthDate).toISOString().split("T")[0]
        : null;
      const phoneDigits = formData.phoneNumber ? formData.phoneNumber.replace(/\D/g, "") : "";
      const phone = phoneDigits ? `+${phoneDigits}` : "";

      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.firstName,
        surname: formData.lastName,
        patronymic: formData.middleName,
        born_date: birthDate,
        phone,
        role: formData.userType,
      };

      try {
        await api.post("/auth/register", payload);

        if (payload.role === "consultant") {
          navigate("/profile-consultant/fill");
        } else {
          navigate("/registration/email-confirmation");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const detail = error.response?.data?.detail;
          if (detail === "REGISTER_USER_ALREADY_EXISTS") {
            setError("email", { type: "manual", message: t("registration.errors.emailTaken") });
          } else {
            setSubmitError(t("registration.errors.registrationFailed"));
          }
        } else {
          setSubmitError(t("registration.errors.registrationFailed"));
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigate, setError, t]
  );

  const userTypeValue = watch("userType") ?? "";

  return (
    <div className={styles.Wrapper}>
      <section className={styles.registrationSection}>
        <h2 className={styles.title}>{t("registration.title")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.registrationForm}>
          <div className={styles.formGroup}>
            <label className={styles.authFormLabel}>
              {t("registration.labels.firstName")}
              <input
                type="text"
                {...register("firstName")}
                placeholder={t("registration.placeholders.firstName")}
                className={`${styles.authFormInput} ${errors.firstName ? styles.errorInput : ""} ${
                  errors.firstName ? styles.errorText : ""
                } ${errors.firstName ? styles.redPlaceholder : ""}`}
                onFocus={() => clearErrors("firstName")}
              />
              {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
            </label>
            <label className={styles.authFormLabel}>
              {t("registration.labels.lastName")}
              <input
                type="text"
                {...register("lastName")}
                placeholder={t("registration.placeholders.lastName")}
                className={`${styles.authFormInput} ${errors.lastName ? styles.errorInput : ""} ${
                  errors.lastName ? styles.errorText : ""
                } ${errors.lastName ? styles.redPlaceholder : ""}`}
                onFocus={() => clearErrors("lastName")}
              />
              {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
            </label>
            <label className={styles.authFormLabel}>
              {t("registration.labels.middleName")}
              <input
                type="text"
                {...register("middleName")}
                placeholder={t("registration.placeholders.middleName")}
                className={`${styles.authFormInput} ${errors.middleName ? styles.errorInput : ""} ${
                  errors.middleName ? styles.errorText : ""
                } ${errors.middleName ? styles.redPlaceholder : ""}`}
                onFocus={() => clearErrors("middleName")}
              />
              {errors.middleName && <p className={styles.error}>{errors.middleName.message}</p>}
            </label>
            <label className={styles.authFormLabel}>
              {t("registration.labels.birthDate")}
              <input
                type="date"
                {...register("birthDate")}
                className={`${styles.authFormInput} ${errors.birthDate ? styles.errorInput : ""} ${
                  errors.birthDate ? styles.errorText : ""
                } ${errors.birthDate ? styles.redPlaceholder : ""}`}
                onFocus={() => clearErrors("birthDate")}
              />
              {errors.birthDate && <p className={styles.error}>{errors.birthDate.message}</p>}
            </label>
            <label className={styles.authFormLabel}>
              {t("registration.labels.phone")}
              <InputMask
                mask="+7 (999) 999-99-99"
                {...register("phoneNumber")}
                className={`${styles.authFormInput} ${errors.phoneNumber ? styles.errorInput : ""} ${
                  errors.phoneNumber ? styles.errorText : ""
                } ${errors.phoneNumber ? styles.redPlaceholder : ""}`}
                placeholder={t("registration.placeholders.phone")}
                onFocus={() => clearErrors("phoneNumber")}
              />
              {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber.message}</p>}
            </label>
            <label className={styles.authFormLabel}>
              {t("registration.labels.email")}
              <input
                type="email"
                {...register("email")}
                autoComplete="email"
                placeholder={t("registration.placeholders.email")}
                className={`${styles.authFormInput} ${errors.email ? styles.errorInput : ""} ${
                  errors.email ? styles.errorText : ""
                } ${errors.email ? styles.redPlaceholder : ""}`}
                onFocus={() => clearErrors("email")}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </label>
            <label className={styles.authFormLabel}>
              {t("registration.labels.password")}
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  autoComplete="new-password"
                  placeholder={t("registration.placeholders.password")}
                  className={`${styles.authFormInput} ${errors.password ? styles.errorInput : ""} ${
                    errors.password ? styles.errorText : ""
                  } ${errors.password ? styles.redPlaceholder : ""}`}
                  onFocus={() => clearErrors("password")}
                />
                <img
                  src={showPassword ? icons.hidePasswordIcon : icons.showPasswordIcon}
                  alt={showPassword ? t("registration.password.hide") : t("registration.password.show")}
                  className={styles.passwordToggleIcon}
                  onClick={togglePasswordVisibility}
                />
              </div>
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </label>
            <label className={styles.authFormLabel}>
              {t("registration.labels.userType")}
              <CustomSelect
                options={userTypeOptions}
                value={userTypeValue}
                name="userType"
                onChange={(value) => {
                  setValue("userType", value, { shouldValidate: true });
                  clearErrors("userType");
                }}
                errors={errors}
                setError={setError}
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            {submitError && <p className={styles.error}>{submitError}</p>}
            <Button
              variant="gradient"
              type="submit"
              padding="13px 208.44px"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("registration.buttons.submitting") : t("registration.buttons.submit")}
            </Button>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.authFormAgreement}>
              <label className={styles.authFormAgreementLabel}>
                <input type="radio" defaultChecked className={styles.roundRadio} />
                <span>
                  {t("registration.agreements.privacyText")} {" "}
                  <a href="#">{t("registration.agreements.privacyLink")}</a>
                </span>
              </label>
              <label className={styles.authFormAgreementLabel}>
                <input type="radio" defaultChecked className={styles.roundRadio} />
                <span>
                  {t("registration.agreements.consentText")} {" "}
                  <a href="#">{t("registration.agreements.consentLink")}</a>
                </span>
              </label>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
