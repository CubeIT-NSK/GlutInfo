import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./index.module.css";
import FileInput from "../../../shared/components/FileInputs";
import Button from "../../../shared/components/Buttons";

const schema = yup.object().shape({
  fio: yup.string().required("ФИО обязательно"),
  certificates: yup.mixed().nullable(),
  profPhoto: yup.mixed().nullable(),
});


export default function EditPatientProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {

    const finalData = {
      ...data,
    };

    console.log("Submitted data:", finalData);
  };

  const onError = (errors) => {
    console.log("Form errors:", errors);
  };

  return (
      <>
      <div className={styles.Wrapper}>
          <section className={styles.registrationSection}>
            <div className={styles.registrationTitleWrapper}>
              <h2 className={styles.title}>Редактировать страницу</h2>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className={styles.registrationForm}
            >
              <label className={styles.authFormLabel}>
                <p className={styles.authFormTitle}>ФИО</p>
                <div className={styles.inpWrap}>
                  <input
                    type="text"
                    placeholder="Введите Ваше ФИО"
                    {...register("fio")}
                    className={`${styles.authFormInput} ${errors.fio ? styles.errorInput : ''} ${errors.fio ? styles.errorText : ''} ${errors.fio ? styles.redPlaceholder : ''}`}
                  />
                  {errors.fio && <p className={styles.error}>{errors.fio.message}</p>}
                </div>
              </label>
              <label className={styles.authFormLabel}>
                <p className={styles.authFormTitle}>Фотография профиля</p>
                <FileInput
                  title="Загрузите фотографию профиля"
                  maxFiles={1}
                  acceptedFormats={['image/jpeg', 'image/jpg', 'image/png']}
                  onFileChange={(newFiles) => {
                    setValue('profPhoto', newFiles);
                  }}
                />
              </label>
              <label className={styles.authFormLabel}>
                <p className={styles.authFormTitle}>Документы</p>
                <FileInput
                  title="Прикрепите фото\сканы документов"
                  multiple
                  maxFiles={30}
                  acceptedFormats={['image/jpeg','application/pdf']}
                  onFileChange={(newFiles) => {
                    setValue('certificates', newFiles);
                  }}
                />
              </label>
              <Button
                  variant="gradient"
                  type="submit"
                  padding="15px 170.5px"
              >
                  Сохранить изменения
              </Button>
            </form>
          </section>
      </div>
      </>
  );
}
