import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CooperationForm from "../../shared/components/Forms/CooperationForm";
import Button from "../../shared/components/Buttons";
import NewsSlider from "../../shared/components/Sliders/NewsSlider";
import PatientSlider from "../../shared/components/Sliders/PatientSlider";
import PhotoSlider from "../../shared/components/Sliders/PhotoSlider";
import SubscribeNewsForm from "../../shared/components/Forms/SubscribeNewsForm";
import ContactManagerModal from "../../shared/components/Modals/ContactManagerModal";
import images from "../../shared/resources/images";
import { useTranslation } from "../../hooks/useTranslation";

import icons from "../../shared/resources/icon";
import styles from "./index.module.css";

export default function HomePage() {
    const navigate = useNavigate();
	const [isContactManagerModalOpen, setContactManagerModalOpen] = useState(false);
    const { t } = useTranslation();

    const sliderData = {
        PatientData: [
			{
                avatar: images.patientAvatarImage,
                alt: 'Slide 1',
                patientName: 'Марина Г.',
                patientDiagnosis: 'Целиакия',
                description: '«Моя история целиакии началась с моей дочки. В возрасте 2г 8мес ей подтвердили этот диагноз, тяжелая типичная форма. Но ей повезло с врачами гораздо больше, чем мне, поэтому сейчас она в стойкой ремиссии и выглядит здоровее здоровых (конечно же на строгой чистой диете).\n\nЕе врач сказала нам с мужем и ближайшим родственникам обследоваться на целиакию. Но из-за тяжелого процесса принятия диагноза дочки мы сделали это очень поздно, уже будучи с ней на БГ-диете. Конечно же антитела пришли отрицательные. И вообще я была уверена, что целиакия не у меня,а у мужа)).\n\nНо спустя 4 месяца БГ-диеты я стала замечать, что у меня неожиданно прошла сильнейшая мастопатия, мигрени, афтозные стоматиты. И все это без какого-либо лечения! И тут я лечу по работе в Москву и отрываюсь по глютеновым булкам и прочим вкусностям. И через 3 дня ко мне вернулись все вышеперечисленные проблемы, только с тройной силой! И тут я начала догадываться, но верить в это пока не хотела.\n\nВернувшись домой спустя месяц на БГ-диете (в поддержку дочки), снова становится легче и все симптомы уходят.\n\nНо! Впервые у меня случается адский приступ кишечной колики! Тогда я еще не знала, что это. Но скажу так - рожала я без анастезии, сама и это было гораздо легче, чем эта адовая боль… Гастроэнтеролог назначает тонну обследований, намекает что пора бы на целиакию сделать биопсию, но я в полном отрицании этого не делаю».',
            }, {
                avatar: images.patientAvatarImage,
                alt: 'Slide 2',
                patientName: 'Марина Г.',
                patientDiagnosis: 'Целиакия',
                description: '«Расскажу подробно про все проблемы, связанные с целиакией, с которыми столкнулась я😉.\n\n1. Информация - а точнее её отсутствие 🤦‍♀️. В интернете в основном только все О медицинском описании, диагностике и тд, и ни слова о том, как РЕАЛЬНО с этим жить. Везде только общие фразы безо всяких деталей и тонкостей, которых примерно миллион🙈.\n\nРешение: спасибо Ассоциации "Жизнь без глютена", где хоть как то немного структурирована информация. Но она там не вся, нет полного и целого понимания обо всем образе жизни, который должен вести человек с целиакией.\n\nP. S.. Мечтаю когда создать единую площадку, где собрать МАКСИМУМ информации.\n\n2. Врачи - а точнее их неосведомленность об этом диагнозе🙈.  Слава богу не всех, но однозначно большинство. Мне, к сожалению, пришлось столкнуться с нечеловечески жестоким отношением со стороны врачей, которые считают этот диагноз выдумкой или малозначимым... Морально было сложно. И их нежелание узнавать больше и образовываться. Это я про гос.медицину.\n\nРешение: я туда не обращаюсь😁. Впервые столкнулась с поликлиникой, чтобы взять справку гос.образца о целиакии дочки и сбежала оттуда с обещанием больше никогда не лезть в это болото😁🙈. В частных клиниках нахожу замечательных врачей, к которым можно полностью довериться».',
            }, {
                avatar: images.patientAvatarImage,
                alt: 'Slide 3',
                patientName: 'Елена П.',
                patientDiagnosis: 'Целиакия',
                description: '«Словно с нуля начинаешь строить свой быть. Изучать состав лекарств, формировать свою аптечку. Потом что при очередной болезни ты в панике и замешательстве: можно это лекарство или нельзя? Многие врачи говорят: «уточните у лечащего врача». Лечащий врач отвечает: «смотрите в составе, чтобы не было глютена».\n\nМне и многим целиатикам приходится писать в фарм компании на производство и уточнять состав.\n\nС одной стороны, для меня это плюс - за полгода собрала большую аптечку и разобралась сама: что можно, что нельзя и тд. Но очень хочется получать сразу эту информацию из тех источников и специалистов, к которым обращаюсь».',
            }, {
                avatar: images.patientAvatarImage,
                alt: 'Slide 4',
                patientName: 'Марина Г.',
                patientDiagnosis: 'Целиакия',
                description: '«Тем временем приступы повторяются и уже прилично учащаются - с пары раз в месяц переходит в 2-3 приступа в неделю. Я фактически уже с ними жить нормально не могла. Спасалась только но-шпой, но пока она подействует, успевала вся жизнь пролететь перед глазами.\n\nИ спустя полгода мы полетели в гости к родителям и в гостях у них снова случился этот приступ. Они жутко были напуганы и больше я не могла сопротивляться биопсии.\n\nПришлось сдать и при этом рассказать эндоскописту все подробности ее взятия - место, количество биоптата, под каким углом и т.д., потому что он честно признался, что впервые делает такую биопсию.\n\nБиопсия и показала атрофию ворсин и диагноз целиакия мне был подтвержден.\n\nПри этом гастроэнтеролог сказала, что мне необязательно соблюдать строго все правила, по которым живет дочка (в гости со своей посудой, в кафе ничего нельзя и т.д.). И приступы продолжались. Пока в определенный момент меня не осенило, что каждый приступ случался исключительно после того, как я ела ВНЕ ДОМА - кафе, доставка, в гостях и т.д.\n\nПосле этого осознания гастроэнтеролог, конечно, сказала перейти на строжайшую диету и домашнее питание. И, о чудо, приступы прекратились!! Повторились лишь дважды, когда я кушала не из своей посуды…»',
            }, {
                avatar: images.patientAvatarImage,
                alt: 'Slide 5',
                patientName: 'Марина Г.',
                patientDiagnosis: 'Целиакия',
                description: '«Психологическая поддержка - она однозначно необходима, но не в момент постановки диагноза, а тогда, когда приходит осознание, что тебе предстоит во многом поменять свою жизнь. Это понимание приходит, когда начинаешь изучать информацию. Причем психологическая поддержка нужна именно от того, специалиста, который специализируется на таких диагнозах. Все остальные слабо или на короткое время помогают. Или больше только злят непониманием ситуации.\n\n4. Поддержка родных - нужна работа с родственниками больного. Лично мы с мужем столкнулись с недопониманием родителей. Сначала они испугались, после послушая "своих друзей" говорили, что это все "модные диагнозы", " Наслушались своего Комаровского"😂,  "потом израстет и все пройдет" (это про дочку). Повлияло только то, что они увидели, что с их внучкой со мной стало происходить при попадании даже случайных крошек (это благо у нас в начале диагноза былабыла сразу тяжелая реакция даже на следы). Но теперь другая проблема - увидев на сколько это серьезно, они без устали ищут лекарей и целителей😂.  Спасает только то, что мы живем друг от друга за 3000 км, потому продолжаем друг друга горячо любить😂.\n\nНо, к сожалению, знаю много случаев, когда непонимание этого диагноза было со стороны мужей. И это гораздо страшнее. Так как знаю даже случай развода и распада семьи».',
            }, {
                avatar: images.patientAvatarImage,
                alt: 'Slide 6',
                patientName: 'Марина Г.',
                patientDiagnosis: 'Целиакия',
                description: '«К слову, были ли раньше намеки на целиакию? Да мой организм всю жизнь об этом кричал! Но в моем детстве кроме гастрита болезней не знали, поэтому каждый год своего детства я лежала в больницах, где мне лечили ненавистный гастрит глотанием зондов и прочей нечисти. С детства я очень худая, бесконечные запоры, молочные зубы выкрошились, пришлось пройти через гипотиреоз, ревматизм, 5-летнее бесплодие, отказ печени и прочей жести, которая меня сопровождала всю жизнь. И весь этот букет у меня был уже к 30 годам. А причиной всему вероятнее всего та самая целиакия, о которой мало кто знает за Уралом.. К сожалению. ... \n\nНо спустя 2 года на чистой диете у меня конечно ушло множество проблем со здоровьем, но на смену им пришли другие не совсем понятные проблемы - трижды за год отек Квинке (хотя у меня не было аллергии никогда), сильная аллергия на прокладки, вплоть до ожогов кожи и прочие странности.\n\nВсегда, когда ко мне попадает нечистый от глютена продукт, организм сразу дает об этом знать - появляется афтозный стоматит, высыпания сильные на лице. А в наибольших дозировках - непонятные приступы неизвестных мне болезней)). Поэтому стараюсь очень соблюдать чистую диету и в целом чувствую себя здоровым человеком на 90%!».',
            },

        ],
        NewsData: [{
            bgImage: images.newsNPKImage,
            alt: 'newsNPKImage',
            title: 'Выступление руководителя проекта к.м.н. Семеновой Е.А на VII Всероссийской Научно-Практической Конференции ...',
            date: '8-9 сентября 2023',
        }, {
            bgImage: images.newsNPKImage,
            alt: 'newsNPKImage',
            title: 'Выступление руководителя проекта к.м.н. Семеновой Е.А на VII Всероссийской Научно-Практической Конференции ...',
            date: '8-9 сентября 2023',
        }, {
            bgImage: images.newsNPKImage,
            alt: 'newsNPKImage',
            title: 'Выступление руководителя проекта к.м.н. Семеновой Е.А на VII Всероссийской Научно-Практической Конференции ...',
            date: '8-9 сентября 2023',
        }, {
            bgImage: images.newsNPKImage,
            alt: 'newsNPKImage',
            title: 'Выступление руководителя проекта к.м.н. Семеновой Е.А на VII Всероссийской Научно-Практической Конференции ...',
            date: '8-9 сентября 2023',
        }, {
            bgImage: images.newsNPKImage,
            alt: 'newsNPKImage',
            title: 'Выступление руководителя проекта к.м.н. Семеновой Е.А на VII Всероссийской Научно-Практической Конференции ...',
            date: '8-9 сентября 2023',
        }, ],
        PhotoData: [{
            photoGalleryImages: [{
                bgImage: images.photoGallery1Image,
                alt: 'photoGallery1Image',
            }, {
                bgImage: images.photoGallery2Image,
                alt: 'photoGallery2Image',
            }, {
                bgImage: images.photoGallery3Image,
                alt: 'photoGallery3Image',
            }, {
                bgImage: images.photoGallery4Image,
                alt: 'photoGallery4Image',
            }, {
                bgImage: images.photoGallery5Image,
                alt: 'photoGallery5Image',
            }, {
                bgImage: images.photoGallery6Image,
                alt: 'photoGallery6Image',
            }, ],
        }, {
            photoGalleryImages: [{
                bgImage: images.photoGallery1Image,
                alt: 'photoGallery1Image',
            }, {
                bgImage: images.photoGallery2Image,
                alt: 'photoGallery2Image',
            }, {
                bgImage: images.photoGallery3Image,
                alt: 'photoGallery3Image',
            }, {
                bgImage: images.photoGallery4Image,
                alt: 'photoGallery4Image',
            }, {
                bgImage: images.photoGallery5Image,
                alt: 'photoGallery5Image',
            }, {
                bgImage: images.photoGallery6Image,
                alt: 'photoGallery6Image',
            }, ],
        }, ],
    };

	const toggleContactManagerModal = useCallback(() => {
		setContactManagerModalOpen((prevState) => !prevState);
	}, []);

	const handleNavigate = useCallback((page) => {
        switch (page) {
            case "make-appointment":
                navigate("/profile-patient/make-appointment");
                break;
            case "about-us":
                navigate("/about-us");
                break;
            case "about-gluten-event":
                navigate("/calendar-events/held-events/about-gluten");
                break;
            case "online-school-patient":
                navigate("/calendar-events/online-school-patient");
                break;
            case "gluten-focus":
                navigate("/calendar-events/held-events/gluten-focus");
                break;
            case "":
                navigate("/");
                break;
            default:
                break;
        }
    }, [navigate]);

    return (
        <>
            	<section className={styles.teleService}>
					<div className="container">
						<div className={styles.teleWrapper}>
							<div className={styles.teleMiddle}>
								<div className={styles.teleMiddleWrap}>
									<div className={styles.teleMiddleTopWrapper}>
										<div className={styles.teleTop}>
											<p>{t('homePage.teleService.topText')}</p>
										</div>
										<p className={styles.teleTopText}>{t('homePage.teleService.title')}</p>
									</div>
									<h3>{t('homePage.teleService.subtitle')}</h3>
									<Button
										variant="gradient"
										onClick={() => handleNavigate('make-appointment')}
										padding="22.5px 44.5px"
									>
										{t('homePage.teleService.button')}
									</Button>
								</div>
								<img src={images.teleServiceImage} alt="teleServiceImage" />
							</div>
						</div>
					</div>
            	</section>

            	<section className={styles.aboutUs} style={{ backgroundImage: `url(${images.aboutUsBackground1Image})` }}>
					<div className="container">
						<div className={styles.aboutUsWrapper}>
							<div className={styles.aboutUsLeft}>
								<div className={styles.aboutUsTextWrapper}>
									<p className={styles.aboutUsLeftText}>{t('homePage.aboutUs.title')}</p>
									<h3>{t('homePage.aboutUs.text')}</h3>
								</div>
								<Button
									variant="gradient"
									padding="22.5px 176.5px"
									onClick={() => handleNavigate('about-us')}
								>
									{t('homePage.aboutUs.button')}
								</Button>
							</div>
							<div className={styles.aboutUsRight}>
								<img src={images.aboutUsLogoImage} alt="aboutUsImage" />
							</div>
						</div>
					</div>
            	</section>

            	<section className={styles.relevanceProblem}>
					<div className="container">
						<div className={styles.relevanceWrapper}>
							<div className={styles.relevanceTop}>
								<div className={styles.relevanceTopWrapper}>
									<div className={styles.relevanceHeader}>{t('homePage.relevanceProblem.title')}</div>
									<div className={styles.relevanceGlutenText}>
										<span>{t('homePage.relevanceProblem.glutenWord')}</span> — {t('homePage.relevanceProblem.glutenText')}
									</div>
								</div>
								<div className={styles.relevanceTopBtmWrapper}>
									<div className={styles.rTBWLeftText}>
										<p>{t('homePage.relevanceProblem.leftText')}</p>
									</div>
									<div className={styles.rTBWRightText}>
										<p>{t('homePage.relevanceProblem.rightText')}</p>
									</div>
								</div>
							</div>
							<div className={styles.relevanceMiddle}>
								<div className={styles.relevanceMiddleCard}> <img src={images.glutBreadImage} alt="glutBreadImage" /> </div>
							</div>
							<div className={styles.relevanceBottom}>
								<div className={styles.relevanceCardsWrapper}>
									<div className={styles.relevanceCard} id={styles.tselikation} style={{ backgroundImage: `url(${images.glutTselikationImage})` }}>
										<div className={styles.relevanceCardToptext}>{t('homePage.relevanceProblem.cards.celiac.number')}</div>
										<div className={styles.relevanceCardMiddletext}>{t('homePage.relevanceProblem.cards.celiac.text')}</div>
									</div>
									<div className={styles.relevanceCard} id={styles.percent} style={{ backgroundImage: `url(${images.glutPercentImage})` }}>
										<div className={styles.relevanceCardToptext}>{t('homePage.relevanceProblem.cards.percent.number')}</div>
										<div className={styles.relevanceCardMiddletext}>{t('homePage.relevanceProblem.cards.percent.text')}</div>
									</div>
									<div className={styles.relevanceCard} id={styles.patient} style={{ backgroundImage: `url(${images.glutPatientImage})` }}>
										<div className={styles.relevanceCardToptext}>{t('homePage.relevanceProblem.cards.patient.number')}</div>
										<div className={styles.relevanceCardMiddletext}>{t('homePage.relevanceProblem.cards.patient.text')}</div>
									</div>
									<div className={styles.relevanceCard} id={styles.disease} style={{ backgroundImage: `url(${images.glutDiseaseImage})` }}>
										<div className={styles.relevanceCardToptext}>{t('homePage.relevanceProblem.cards.disease.number')}</div>
										<div className={styles.relevanceCardMiddletext}>{t('homePage.relevanceProblem.cards.disease.text')}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
            	</section>

            	<section className={styles.patientHistory} style={{ backgroundImage: `url(${images.bgPatientHistoryImage})` }}>
					<div className="container">
						<h2>{t('homePage.patientHistory.title')}</h2>
						<PatientSlider slides={sliderData.PatientData} />
						<div className={styles.patientHistoryActions}>
							<Button
								variant="gradient"
								padding="22.5px 44.5px"
								onClick={() => handleNavigate('make-appointment')}
							>
								{t('homePage.patientHistory.button1')}
							</Button>
						</div>
					</div>
            	</section>

            	<section className={styles.cooperationForms} id="cooperation">
					<div className="container">
						<div className={styles.coopFrameWrapper}>
							<div className={styles.cooperationFormsWrapper}>
								<div className={styles.cooperationFormsLeftCol}>
									<div className={styles.cooperationFormsLeftColTop}>
										<div className={styles.cooperationHeader}>{t('homePage.cooperation.title')}</div> <img src={images.laptopImage} alt="laptopImage" /> </div>
									<div className={styles.cooperationFormsLeftColMiddle}> 
										<img src={images.quoteImage} alt="quoteImage" />
										<p>«{t('homePage.cooperation.quote')}»</p>
									</div>
									<div className={styles.cooperationFormsLeftColBottom}>
										<div className={styles.cFLCBWrapper}>
											<div className={styles.cFLCBLeft}> <img src={images.cooperationAvatarImage} alt="cooperationAvatarImage" /> </div>
											<div className={styles.cFLCBRight}>
												<p className={styles.cFLCBRightTop}>{t('homePage.cooperation.author')}</p>
												<p className={styles.cFLCBRightBottom}>{t('homePage.cooperation.position')}</p>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.cooperationFormsRightCol}>
									<CooperationForm />
								</div>
							</div>
							<div className={styles.coopBackLinesWrapper}> <img src={images.backLinesImage} className={styles.backLinesImage} alt="backLinesImage" />
								<div className={styles.coopBackLinesTextWrapper}>
									<p>{t('homePage.cooperation.text1')}</p>
									<p>{t('homePage.cooperation.text2')}</p>
									<p id={styles.coopBackLinesTextWrapperP}>{t('homePage.cooperation.text3')}</p>
								</div>
							</div>
						</div>
					</div>
            	</section>

            	<section className={styles.newsSec}>
					<div className="container">
						<h2>{t('homePage.news.title')}</h2>
						<NewsSlider slides={sliderData.NewsData} />
					</div>
            	</section>
            	<section className={styles.subcribeNews}>
					<div className="container">
						<div className={styles.subcribeNewsWrapper}>
							<div className={styles.subcribeNewsLeft}>
								<div className={styles.subcribeNewsLeftTopWrapper}>
									<p>{t('homePage.subscribeNews.title')}</p> <img src={images.subcribeNewsMailImage} className={styles.subcribeNewsMailImage} alt="subcribeNewsMailImage" /> </div>
								<div className={styles.subcribeNewsLeftBottomWrapper}>
									<p>{t('homePage.subscribeNews.subtitle')}</p>
								</div>
							</div>
							<div className={styles.subcribeNewsRight}>
								<SubscribeNewsForm />
							</div>
						</div>
					</div>
            	</section>

            	<section className={styles.calendarEvents} style={{ backgroundImage: `url(${images.celendarEventsBackgroundImage})` }}>
					<div className="container">
						<div className={styles.calendarEventsWrapper}>
							<div className={styles.calendarEventsHeader}>{t('homePage.calendarEvents.title')}</div>
							<div className={styles.calendarEventsCardWrapper}>
								<div className={styles.calendarEventsCard}>
									<div className={styles.calendarEventsCardPaddTop}> <img className={styles.calendarEventImage} src={images.celendarEventsFirstImage} alt="celendarEventsFirstImage" />
										<p className={styles.calendarEventsCardTopText}>{t('homePage.calendarEvents.events.event1.date')}</p>
										<p className={styles.calendarEventsCardBottomtext}>{t('homePage.calendarEvents.events.event1.title')}</p>
									</div>
									<div className={styles.calendarEventsCardPaddBot}>
										<Button
											variant="gradient"
											padding="17.5px 106.5px"
											onClick={() => handleNavigate('about-gluten-event')}
										>
											{t('homePage.calendarEvents.events.event1.button')}
										</Button>
									</div>
								</div>
								<div className={styles.calendarEventsCard}>
									<div className={styles.calendarEventsCardPaddTop}> <img className={styles.calendarEventImage} src={images.celendarEventsSecondImage} alt="celendarEventsSecondImage" />
										<p className={styles.calendarEventsCardTopText}>{t('homePage.calendarEvents.events.event2.date')}</p>
										<p className={styles.calendarEventsCardBottomtext}>{t('homePage.calendarEvents.events.event2.title')}</p>
									</div>
									<div className={styles.calendarEventsCardPaddBot}>
										<Button
											variant="gradient"
											padding="17.5px 106.5px"
											onClick={() => handleNavigate('online-school-patient')}
										>
											{t('homePage.calendarEvents.events.event2.button')}
										</Button>
									</div>
								</div>
								<div className={styles.calendarEventsCard}>
									<div className={styles.calendarEventsCardPaddTop}> <img className={styles.calendarEventImage} src={images.celendarEventsThirdImage} alt="celendarEventsThirdImage" />
										<p className={styles.calendarEventsCardTopText}>{t('homePage.calendarEvents.events.event3.date')}</p>
										<p className={styles.calendarEventsCardBottomtext}>{t('homePage.calendarEvents.events.event3.title')}</p>
									</div>
									<div className={styles.calendarEventsCardPaddBot}>
										<Button
											variant="gradient"
											padding="17.5px 106.5px"
											onClick={() => handleNavigate('gluten-focus')}
											>
											{t('homePage.calendarEvents.events.event3.button')}
										</Button>
									</div>
								</div>
							</div>
							<Button
								variant="white"
								padding="22.5px 50px"
								className={styles.calendarShowAllButton}
							>
								{t('homePage.calendarEvents.showAllButton')}
							</Button>
						</div>
					</div>
            	</section>

            	<section className={styles.contacts} id="contacts">
					<div className="container">
						<div className={styles.contactsWrapper}>
							<div className={styles.contactsLeft}>
								<div className={styles.contactsHeadWrapper}>
									<div className={styles.contactsHeader}>{t('homePage.contacts.title')}</div> <img src={images.contactsIllustrationImage} alt="contactsIllustrationImage" /> </div>
								<div className={styles.contactsCon}>
									<p>{t('homePage.contacts.description')}</p>
									<div className={styles.contactsConRef}>
										<div className={styles.contactsConRefText}> <span>{t('homePage.contacts.address')} </span> <a>{t('homePage.contacts.addressValue')}</a> </div>
										<div className={styles.contactsConRefText}> <span>{t('homePage.contacts.phone')} </span> <a href="tel:+79697305778">{t('homePage.contacts.phoneValue')}</a> </div>
										<div className={styles.contactsConRefText}> <span>{t('homePage.contacts.email')} </span> <a href="mailto:gluten-center@mail.ru">{t('homePage.contacts.emailValue')}</a> </div>
									</div>
								</div>
								<div className={styles.contactIcons}>
									<a href="https://t.me/gluteninfo" className={styles.contactsIconText}> <img src={icons.telegramIcon} alt="telegramIcon" /> </a>
									<a href="https://whatsapp.com/link" className={styles.contactsIconText}> <img src={icons.whatsappIcon} alt="whatsappIcon" /> </a>
								</div>
							</div>
							<div className={styles.contactsRight}>
								<a сlassname={styles.contactsHeaderMapRef} href="https://yandex.ru/maps/2/saint-petersburg/house/piskaryovskiy_prospekt_47/Z0kYcgRhSkcOQFtjfXV5cnhhZw==/?ll=30.431329%2C59.983423&z=17.1"> <img src={images.contactsCartImage} alt="contactsCartImage" /> </a>
							</div>
						</div>
					</div>
            	</section>

            	<section className={styles.reviewsSection} id="feedback">
					<div className="container">
						<div className={styles.reviewsWrapper}>
							<div className={styles.reviewsHeader}>{t('homePage.reviews.title')}</div>
							<div className={styles.reviewsCarts}>
								<div className={styles.reviewsCart}>
									<div className={styles.reviewsCartTop}> <img src={icons.reviewsMarksIcon} alt="reviewsMarksIcon" /> </div>
									<div className={styles.reviewsCartBottom}>
										<div className={styles.reviewsStars}>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
										</div>
										<div className={styles.reviewsCartUsers}>
											<p className={styles.reviewsCartUser}> {t('homePage.reviews.reviews.0.user')} </p>
											<p className={styles.reviewsCartUserDate}> {t('homePage.reviews.reviews.0.date')} </p>
										</div>
										<div className={styles.reviewsCartComments}>
											<p className={styles.reviewsCartCommentsText}> {t('homePage.reviews.reviews.0.text')} </p>
										</div>
									</div>
								</div>
								<div className={styles.reviewsCart}>
									<div className={styles.reviewsCartTop}> <img src={icons.reviewsMarksIcon} alt="reviewsMarksIcon" /> </div>
									<div className={styles.reviewsCartBottom}>
										<div className={styles.reviewsStars}>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
										</div>
										<div className={styles.reviewsCartUsers}>
											<p className={styles.reviewsCartUser}> {t('homePage.reviews.reviews.1.user')} </p>
											<p className={styles.reviewsCartUserDate}> {t('homePage.reviews.reviews.1.date')} </p>
										</div>
										<div className={styles.reviewsCartComments}>
											<p className={styles.reviewsCartCommentsText}> {t('homePage.reviews.reviews.1.text')} </p>
										</div>
									</div>
								</div>
								<div className={styles.reviewsCart}>
									<div className={styles.reviewsCartTop}> <img src={icons.reviewsMarksIcon} alt="reviewsMarksIcon" /> </div>
									<div className={styles.reviewsCartBottom}>
										<div className={styles.reviewsStars}>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
										</div>
										<div className={styles.reviewsCartUsers}>
											<p className={styles.reviewsCartUser}> {t('homePage.reviews.reviews.2.user')} </p>
											<p className={styles.reviewsCartUserDate}> {t('homePage.reviews.reviews.2.date')} </p>
										</div>
										<div className={styles.reviewsCartComments}>
											<p className={styles.reviewsCartCommentsText}> {t('homePage.reviews.reviews.2.text')} </p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
            	</section>

            	<section className={styles.photoGallery}>
					<div className="container">
						<h2>{t('homePage.photoGallery.title')}</h2>
						<PhotoSlider slides={sliderData.PhotoData} />
					</div>
        		</section>

				<ContactManagerModal isOpen={isContactManagerModalOpen} onClose={toggleContactManagerModal} />
        </>
    );
}
