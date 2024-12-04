import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomSelect from "../../../shared/components/CustomSelect";
import styles from "./index.module.css";
import icons from "../../../shared/resources/icon";
import FileInput from "../../../shared/components/FileInputs";
import Button from "../../../shared/components/Buttons";

const schema = yup.object().shape({
  fio: yup.string().required("ФИО обязательно"),
  consultations: yup.string().required("Специальность обязательна"),
  education: yup.string().required("Образование обязательно"),
  certificates: yup.mixed().nullable(),
  profPhoto: yup.mixed().nullable(),
  eventPhoto: yup.mixed().nullable(),
  aboutVideo: yup.mixed().nullable(),
  achievements: yup.string().nullable(),
  conferenceMedia: yup.mixed().nullable(),
  videoConsultation: yup.string()
    .url("Введите корректный URL")
    .test("duration", "Длительность видео должна быть не более 3-х минут", (value) => {
      if (!value) return true;
    }),
  serviceName: yup.string().nullable(),
  serviceDescription: yup.string().nullable(),
  serviceCost: yup.string().nullable(),
});

const consultationsOptions = [
  { value: "", label: "Выберите специальность", isPlaceholder: true },
  { value: "gastroenterologist", label: "Гастроэнтеролог" },
  { value: "nutritionist", label: "Диетолог" },
  { value: "therapist", label: "Терапевт" },
  { value: "vop", label: "ВОП" },
  { value: "endocrinologist", label: "Эндокринолог" },
  { value: "rheumatologist", label: "Ревматолог" },
  { value: "reproductologist", label: "Репродуктолог" },
  { value: "hematologist", label: "Гематолог" },
  { value: "dermatologist", label: "Дерматолог" },
  { value: "allergist", label: "Аллерголог" },
  { value: "pediatrician", label: "Педиатр" },
  { value: "another", label: "Другое" },
];

const daysOfWeek = [
  { day: "Понедельник", short: "Mo" },
  { day: "Вторник", short: "Tu" },
  { day: "Среда", short: "We" },
  { day: "Четверг", short: "Th" },
  { day: "Пятница", short: "Fr" },
  { day: "Суббота", short: "Sa" },
  { day: "Воскресенье", short: "Su" },
];


export default function EditConsProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [services, setServices] = useState([]);
  const [serviceError, setServiceError] = useState("");
  const [workingHours, setWorkingHours] = useState(
    daysOfWeek.reduce((acc, day) => ({
      ...acc,
      [day.short]: { available: false, start: "", end: "" },
    }), {})
  );

  const addService = (data) => {
    const { serviceName, serviceDescription, serviceCost } = data;

    let hasError = false;

    if (!serviceName) {
      setError("serviceName", {
        type: "manual",
        message: "Название услуги обязательно",
      });
      hasError = true;
    }
    if (!serviceDescription) {
      setError("serviceDescription", {
        type: "manual",
        message: "Описание услуги обязательно",
      });
      hasError = true;
    }
    if (!serviceCost) {
      setError("serviceCost", {
        type: "manual",
        message: "Стоимость услуги обязательна",
      });
      hasError = true;
    }

    if (hasError) return;

    const newService = {
      name: serviceName,
      description: serviceDescription,
      cost: serviceCost,
    };

    setServices([...services, newService]);

    resetField("serviceName");
    resetField("serviceDescription");
    resetField("serviceCost");

    setServiceError("");
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    const formattedWorkingHours = Object.keys(workingHours).map((dayKey) => ({
      day_week: dayKey,
      start_hour: workingHours[dayKey].start ? `${workingHours[dayKey].start}:00Z` : "",
      end_hour: workingHours[dayKey].end ? `${workingHours[dayKey].end}:00Z` : "",
      working: workingHours[dayKey].available,
    }));

    const isAnyTimeSelected = formattedWorkingHours.some(day =>
      day.working && day.start_hour && day.end_hour
    );

    const finalData = {
      ...data,
      workingHours: formattedWorkingHours,
    };

    console.log("Submitted data:", finalData);
  };

  const onError = (errors) => {
    console.log("Form errors:", errors);
  };

  const handleAvailabilityChange = (day) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day.short]: {
        ...prev[day.short],
        available: !prev[day.short].available,
      },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day.short]: {
        ...prev[day.short],
        [field]: value,
      },
    }));

    const updatedDay = {
      ...workingHours[day.short],
      [field]: value,
    };

    if (updatedDay.start && updatedDay.end) {
      setError("workingHours", {
        type: "manual",
        message: "",
      });
    }
  };

  return (
      <div className={styles.Wrapper}>
        <div className={styles.registrationSection}>
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
              <p className={styles.authFormTitle}>Направление консультаций</p>
              <CustomSelect
                options={consultationsOptions}
                value={watch("consultations")}
                name="consultations"
                onChange={(value) => setValue("consultations", value)}
                errors={errors}
                setError={setError}
              />
            </label>
            <label className={styles.authFormLabel}>
              <p className={styles.authFormTitle}>Образование</p>
              <div className={styles.inpWrap}>
                <textarea
                  placeholder="Укажите медицинское учреждение, в котором получали диплом; сертификаты дополнительных специальностей"
                  {...register("education")}
                  className={`${styles.authFormTextarea} ${errors.education ? styles.errorInput : ''} ${errors.education ? styles.errorText : ''} ${errors.education ? styles.redPlaceholder : ''}`}
                />
                {errors.education && (
                  <p className={styles.error}>{errors.education.message}</p>
                )}
              </div>
            </label>
            <label className={styles.authFormLabel}>
              <p className={styles.authFormTitle}>Документы, сертификаты</p>
              <FileInput
                title="Прикрепите фото\сканы дипломов и основных сертификатов"
                multiple
                maxFiles={30}
                acceptedFormats={['image/jpeg','application/pdf']}
                onFileChange={(newFiles) => {
                  setValue('certificates', newFiles);
                }}
              />
            </label>
            <label className={styles.authFormLabel}>
              <p className={styles.authFormTitle}>Личные достижения</p>
              <textarea
                placeholder="Введите курсы повышения квалификации, количество научных работ с указанием количества статей, тезисов; выступления, гранты, патенты, авторские программы и т.д."
                {...register("achievements")}
                className={`${styles.authFormTextarea}`}
              />
            </label>
            <label className={styles.authFormLabel}>
              <p className={styles.authFormTitle}>Фото с конференций, мероприятий</p>
              <div className={styles.inpWrap}>
                <FileInput
                  title="Прикрепите фото с конференций и мероприятий"
                  multiple
                  maxFiles={6}
                  acceptedFormats={['image/jpeg', 'image/jpg', 'image/png']}
                  onFileChange={(newFiles) => {
                    setValue('eventPhoto', newFiles);
                  }}
                />
              </div>
            </label>
            <label className={styles.authFormLabel}>
              <p className={styles.authFormTitle}>Видео-визитка</p>
              <div className={styles.inpWrap}>
                <FileInput
                  title="Прикрепите рассказ о себе, время записи не более 3-х минут"
                  multiple
                  maxFiles={6}
                  acceptedFormats={['video/mp4']}
                  onFileChange={(newFiles) => {
                    setValue('aboutVideo', newFiles);
                  }}
                />
                {errors.videoConsultation && <p className={styles.videoConsultation}>{errors.videoConsultation.message}</p>}
              </div>
            </label>
            <div className={styles.authFormLabel}>
              <div className={styles.workingTitleWrapper}>
                <h3 className={styles.workingTitle}>Рабочие часы</h3>
                <h4 className={styles.workingSubTitle}>Отметьте в какие дни вы работаете, а так же рабочее время</h4>
              </div>
              {daysOfWeek.map((day) => (
                <div key={day.short} className={styles.dayOfWeekWrap}>
                  <label className={styles.workingWrapper}>
                    <input
                      type="checkbox"
                      checked={workingHours[day.short].available}
                      onChange={() => handleAvailabilityChange(day)}
                    />
                    <span>{day.day}</span>
                  </label>
                  {workingHours[day.short].available && (
                    <div className={styles.workingHoursInputs}>
                      <input
                        type="time"
                        value={workingHours[day.short].start}
                        onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                        placeholder="Начало"
                      />
                      <input
                        type="time"
                        value={workingHours[day.short].end}
                        onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                        placeholder="Конец"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <label className={styles.authFormLabel}>
              <p className={styles.authFormTitle}>
                Какие услуги Вы будете оказывать (название, описание, стоимость)?
              </p>
              <div className={styles.inpWrap}>
                <input
                  type="text"
                  placeholder="Название услуги"
                  {...register("serviceName")}
                  className={`${styles.authFormInput} ${errors.serviceName ? styles.errorInput : ''} ${errors.serviceName ? styles.errorText : ''} ${errors.serviceName ? styles.redPlaceholder : ''}`}
                />
                {errors.serviceName && (
                  <p className={styles.error}>{errors.serviceName.message}</p>
                )}
              </div>
              <div className={styles.inpWrap}>
                <textarea
                  placeholder="Описание услуги"
                  {...register("serviceDescription")}
                  className={`${styles.authFormTextarea} ${errors.serviceDescription ? styles.errorInput : ''} ${errors.serviceDescription ? styles.errorText : ''} ${errors.serviceDescription ? styles.redPlaceholder : ''}`}
                />
                {errors.serviceDescription && (
                  <p className={styles.error}>{errors.serviceDescription.message}</p>
                )}
              </div>
              <div className={styles.inpWrap}>
                <input
                  type="text"
                  placeholder="Стоимость услуги"
                  {...register("serviceCost")}
                  className={`${styles.authFormInput} ${errors.serviceCost ? styles.errorInput : ''} ${errors.serviceCost ? styles.errorText : ''} ${errors.serviceCost ? styles.redPlaceholder : ''}`}
                />
                {errors.serviceCost && (
                  <p className={styles.error}>{errors.serviceCost.message}</p>
                )}
              </div>
              <Button
                  variant="white"
                  padding="16px 199px"
                  onClick={() => addService(watch())}
                  type="button"
              >
                  Добавить услугу
              </Button>
            </label>
            <ul className={styles.servicesUl}>
              <div className={styles.servicesUlWrapper}>
                {services.length > 0 ? (
                  services.map((service, index) => (
                    <li key={index} className={styles.servicesUlLi}>
                      <div className={styles.servicesUlLiTop}>
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className={styles.removeServiceButton}
                        >
                          <img src={icons.closeIcon} alt="closeIcon" />
                        </button>
                      </div>
                      <div className={styles.servicesUlLiBot}>
                        <span>{index + 1}.</span>
                        <div className={styles.servicesUlLiStrWrapper}>
                          <div className={styles.servicesUlLiStr}>
                            <span>{service.name}</span> -{" "}
                            <span>{service.cost} ₽</span>,
                          </div>
                          <p>{service.description}</p>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className={styles.servicesNone}>Здесь появятся ваши услуги</p>
                )}
              </div>
            </ul>
            <Button
                variant="gradient"
                padding="15px 170px"
                type="button"
            >
                Сохранить изменения
            </Button>
          </form>
        </div>
      </div>
  );
}
