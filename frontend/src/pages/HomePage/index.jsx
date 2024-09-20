import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";
import PatientSlider from "../../shared/components/PatientSlider";
import PhotoSlider  from "../../shared/components/PhotoSlider";
import NewsSlider from "../../shared/components/NewsSlider";
import CooperationForm from "../../shared/components/CooperationForm";
import SubscribeNewsForm from "../../shared/components/SubscribeNewsForm";

import images from "../../shared/resources/images";

import styles from "./index.module.css";
import icons from "../../shared/resources/icon";

export default function HomePage() {

    const sliderData = {
        PatientData: [{
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

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>
            	<section className={styles.teleService}>
		<div className="container">
			<div className={styles.teleWrapper}>
				<div className={styles.teleMiddle}>
					<div className={styles.teleMiddleWrap}>
						<div className={styles.teleMiddleTopWrapper}>
							<div className={styles.teleTop}>
								<p>ДЕЛАЕМ ЖИЗНЬ БЕЗ ГЛЮТЕНА ЛУЧШЕ</p>
							</div>
							<header>Телемедицинский сервис <span>«ГастроГлютен</span>.инфо»</header>
						</div>
						<h3>Первая в России медицинская информационно-консультативная платформа для пациентов и консультантов</h3>
						<button>Записаться на онлайн-консультацию</button>
					</div> <img src={images.teleServiceImage} alt="teleService" /> </div>
			</div>
		</div>
            	</section>
            	<section className={styles.aboutUs}>
		<div className="container">
			<div className={styles.aboutUsWrapper}>
				<div className={styles.aboutUsLeft}>
					<div className={styles.aboutUsTextWrapper}>
						<header>О нас</header>
						<h3>Наша миссия — сделать данный ресурс полезным для пациентов и врачей и стандартизировать подходы к ведению больных с глютен-ассоциированными заболеваниями по всей стране.
                                            <br />
                                            <br />
                                            Приоритетами являются правильная диагностикаи ведение пациентов с глютен-ассоциированными заболеваниями (целиакией, нецелиакийной чувствительностью к глютену, аллергией на пшеницу), помощь в соблюдении безглютеновой диеты, повышение качества жизни данной категории пациентов.
                                        </h3> </div>
					<button>Подробнее</button>
				</div>
				<div className={styles.aboutUsRight}> <img src={images.aboutUsImage} alt="aboutUs" />
					<p><span>ГАСТРОГЛЮТЕН.</span>ИНФО</p>
				</div>
			</div>
		</div>
            	</section>
            	<section className={styles.relevanceProblem}>
		<div className="container">
			<div className={styles.relevanceWrapper}>
				<div className={styles.relevanceTop}>
					<div className={styles.relevanceTopWrapper}>
						<div className={styles.relevanceHeader}>Актуальность проблемы</div>
						<div className={styles.relevanceProblemHeaderBlock}>
							<div className={styles.relevanceProblemHeaderBlockEl}> <img src={images.glutFrameImage} alt="glutFrameImage" />
								<p> <span>Глютен </span> — это не просто белок злаковых культур,
									<br /> но и причина разнообразных симптомов и состояний. </p>
							</div>
						</div>
					</div>
					<div className={styles.relevanceTopBtmWrapper}>
						<div className={styles.rTBWLeftText}>
							<p>К таким заболеваниям относится не только целиакия, но и реакции аллергического характера, а также особые нецелиакийные формы непереносимости глютена.
								<br />
								<br /> До сих пор единственным способом лечения считается безглютеновая диета, при соблюдении которой все симптомы могут исчезать, а лабораторно-инструментальные показатели нормализоваться.</p>
						</div>
						<div className={styles.rTBWRightText}>
							<p>Назначение безглютеновой диеты ведет к недостаточному поступлению в организм клетчатки и витаминно-минеральных веществ, а также имеет определенные социально-экономические трудности.
								<br />
								<br /> Именно поэтому ее назначение должно быть обоснованным, а пациенты в дальнейшем должны регулярно проходить диспансеризацию у профильного специалиста! Показания к назначению безглютенового рациона определяет только врач!</p>
						</div>
					</div>
				</div>
				<div className={styles.relevanceMiddle}>
					<div className={styles.relevanceMiddleCard}> <img src={images.glutBreadImage} alt="glutBreadImage" /> </div>
				</div>
				<div className={styles.relevanceBottom}>
					<div className={styles.relevanceCardsWrapper}>
						<div className={styles.relevanceCard} id={styles.tselikation}>
							<div className={styles.relevanceCardToptext}>1 из 100</div>
							<div className={styles.relevanceCardMiddletext}>людей имеют целиакию</div>
						</div>
						<div className={styles.relevanceCard} id={styles.percent}>
							<div className={styles.relevanceCardToptext}>80%</div>
							<div className={styles.relevanceCardMiddletext}>пациентов живут с неустановленным диагнозом</div>
						</div>
						<div className={styles.relevanceCard} id={styles.patient}>
							<div className={styles.relevanceCardToptext}>&gt;200</div>
							<div className={styles.relevanceCardMiddletext}>симптомов наблюдается у пациентов с целиакией</div>
						</div>
						<div className={styles.relevanceCard} id={styles.disease}>
							<div className={styles.relevanceCardToptext}>Целиакия</div>
							<div className={styles.relevanceCardMiddletext}>— это не детское заболевание</div>
						</div>
					</div>
				</div>
			</div>
		</div>
            	</section>
            	<section className={styles.patientHistory}>
		<div className="container">
			<h2>Истории пациентов</h2>
			<PatientSlider slides={sliderData.PatientData} />
			<div className={styles.patientHistoryActions}>
				<button className={styles.patientHistoryActionsButtonLeft}><span>Записаться на онлайн-консультацию</span></button>
				<button className={styles.patientHistoryActionsButtonRight}><span>Оставить отзыв</span></button>
			</div>
		</div>
            	</section>
            	<section className={styles.cooperationForms}>
		<div className="container">
			<div className={styles.coopFrameWrapper}>
				<div className={styles.cooperationFormsWrapper}>
					<div className={styles.cooperationFormsLeftCol}>
						<div className={styles.cooperationFormsLeftColTop}>
							<div className={styles.cooperationHeader}>Сотрудничество</div> <img src={images.laptopImage} alt="laptopImage" /> </div>
						<div className={styles.cooperationFormsLeftColMiddle}> <img src={images.quoteImage} alt="quoteImage" />
							<p>«Высокое качество предоставляемых услуг рождается при взаимодействии компетентных специалистов разных сфер»</p>
						</div>
						<div className={styles.cooperationFormsLeftColBottom}>
							<div className={styles.cFLCBWrapper}>
								<div className={styles.cFLCBLeft}> <img src={images.cooperationAvatarImage} alt="cooperationAvatarImage" /> </div>
								<div className={styles.cFLCBRight}>
									<p className={styles.cFLCBRightTop}>Ефремова Анастасия Юрьевна</p>
									<p className={styles.cFLCBRightBottom}>выпускник ФГБОУ ВО СЗГМУ им. И.И. Мечникова, врач-стажер</p>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.cooperationFormsRightCol}>
						<CooperationForm /> </div>
				</div>
				<div className={styles.coopBackLinesWrapper}> <img src={images.backLinesImage} className={styles.backLinesImage} alt="backLinesImage" />
					<div className={styles.coopBackLinesTextWrapper}>
						<p>ПРОБЛЕМУ не выбросишь за окошко, а можно только вежливо, со ступенькина ступеньку, свести с лестницы. И делать это лучше <span>объединив усилия консультантов, лабораторных служб.</span></p>
						<p><span>Мы предлагаем платформу для реализации</span> своих услуг консультантам, медицинским специалистам разных специальностей. Приглашаем для сотрудничества клиники, организации помощи пациентам.</p>
						<p id={styles.coopBackLinesTextWrapperP}>Также мы <span>открыты к взаимодействию</span> с блогерами в социальных сетях. Для получения более подробной информации, просим вас заполнить форму заявки.</p>
					</div>
				</div>
			</div>
		</div>
            	</section>
            	<section className={styles.newsSec}>
		<div className="container">
			<h2>Новости</h2>
			<NewsSlider slides={sliderData.NewsData} /> </div>
            	</section>
            	<section className={styles.subcribeNews}>
		<div className="container">
			<div className={styles.subcribeNewsWrapper}>
				<div className={styles.subcribeNewsLeft}>
					<div className={styles.subcribeNewsLeftTopWrapper}>
						<p>Подписывайтесь
							<br /> на новости сервиса <span>«ГастроГлютен.</span>инфо»</p> <img src={images.subcribeNewsMailImage} className={styles.subcribeNewsMailImage} alt="subcribeNewsMailImage" /> </div>
					<div className={styles.subcribeNewsLeftBottomWrapper}>
						<p>Так ещё проще узнавать новую информацию об обновлениях, материалах, мероприятиях и многом другом.</p>
					</div>
				</div>
				<div className={styles.subcribeNewsRight}>
					<SubscribeNewsForm /> </div>
			</div>
		</div>
            	</section>
            	<section className={styles.calendarEvents}>
		<div className="container">
			<div className={styles.calendarEventsWrapper}>
				<div className={styles.calendarEventsHeader}>Календарь событий</div>
				<div className={styles.calendarEventsCardWrapper}>
					<div className={styles.calendarEventsCard}>
						<div className={styles.calendarEventsCardPaddTop}> <img className={styles.calendarEventImage} src={images.firstEventImage} alt="firstEventImage" />
							<p className={styles.calendarEventsCardTopText}>1 сентября</p>
							<p className={styles.calendarEventsCardBottomtext}>Выход подкаста «Вся правда о глютене»</p>
						</div>
						<div className={styles.calendarEventsCardPaddBot}>
							<button>Подробнее</button>
						</div>
					</div>
					<div className={styles.calendarEventsCard}>
						<div className={styles.calendarEventsCardPaddTop}> <img className={styles.calendarEventImage} src={images.secondEventImage} alt="secondEventImage" />
							<p className={styles.calendarEventsCardTopText}>10 сентября</p>
							<p className={styles.calendarEventsCardBottomtext}>Онлайн-школа пациента</p>
						</div>
						<div className={styles.calendarEventsCardPaddBot}>
							<button>Подробнее</button>
						</div>
					</div>
					<div className={styles.calendarEventsCard}>
						<div className={styles.calendarEventsCardPaddTop}> <img className={styles.calendarEventImage} src={images.thirdEventImage} alt="thirdEventImage" />
							<p className={styles.calendarEventsCardTopText}>1 октября</p>
							<p className={styles.calendarEventsCardBottomtext}>Посещение 179 лицея с лекцией</p>
						</div>
						<div className={styles.calendarEventsCardPaddBot}>
							<button>Подробнее</button>
						</div>
					</div>
				</div>
				<button className={styles.calendarBtn}>Показать весь список мероприятий</button>
			</div>
		</div>
            	</section>
            	<section className={styles.contacts}>
		<div className="container">
			<div className={styles.contactsWrapper}>
				<div className={styles.contactsLeft}>
					<div className={styles.contactsHeadWrapper}>
						<div className={styles.contactsHeader}>Контакты</div> <img src={images.contactsIllustrationImage} alt="contactsIllustrationImage" /> </div>
					<div className={styles.contactsCon}>
						<p>Северо-Западный Центр Глютен-ассоциированных заболеваний (СЗЦ ГАЗ) на базе ФГБОУ ВО СЗГМУ им. И.И. Мечникова</p>
						<div className={styles.contactsConRef}>
							<div className={styles.contactsConRefText}> <span>Адрес: </span> <a>СПб, пр. Пискаревский 47, кор. 24, 2 этаж</a> </div>
							<div className={styles.contactsConRefText}> <span>Телефон: </span> <a href="tel:+79697305778">+7-969-730-57-78</a> </div>
							<div className={styles.contactsConRefText}> <span>E-mail: </span> <a href="mailto:gluten-center@mail.ru">gluten-center@mail.ru</a> </div>
						</div>
					</div>
					<div className={styles.contactIcons}>
						<a href="https://t.me/" className={styles.contactsIconText}> <img src={icons.telegramIcon} alt="telegramIcon" /> </a>
						<a href="https://whatsapp.com/link" className={styles.contactsIconText}> <img src={icons.whatsappIcon} alt="whatsappIcon" /> </a>
					</div>
				</div>
				<div className={styles.contactsRight}>
					<a сlassname={styles.contactsHeaderMapRef} href="https://yandex.ru/maps/2/saint-petersburg/house/piskaryovskiy_prospekt_47/Z0kYcgRhSkcOQFtjfXV5cnhhZw==/?ll=30.431329%2C59.983423&z=17.1"> <img src={images.contactsCartImage} alt="contactsCartImage" /> </a>
				</div>
			</div>
		</div>
            	</section>
            	<section className={styles.reviews}>
		<div className="container">
			<div className={styles.reviewsWrapper}>
				<div className={styles.reviewsHeader}>Отзывы о работе консультантах центра</div>
				<div className={styles.reviewsCarts}>
					<div className={styles.reviewsCart}>
						<div className={styles.reviewsCartTop}> <img src={images.reviewsMarks} alt="reviewsMarks" /> </div>
						<div className={styles.reviewsCartBottom}>
							<div className={styles.reviewsStars}>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
							</div>
							<div className={styles.reviewsCartUsers}>
								<p className={styles.reviewsCartUser}> Мария И. </p>
								<p className={styles.reviewsCartUserDate}> 31.10.2023, консультация у Семеновой Е.А. </p>
							</div>
							<div className={styles.reviewsCartComments}>
								<p> «Благодарны консультанту за доброжелательный и квалифицированный приём» </p>
							</div>
						</div>
					</div>
					<div className={styles.reviewsCart}>
						<div className={styles.reviewsCartTop}> <img src={images.reviewsMarks} alt="reviewsMarks" /> </div>
						<div className={styles.reviewsCartBottom}>
							<div className={styles.reviewsStars}>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
							</div>
							<div className={styles.reviewsCartUsers}>
								<p className={styles.reviewsCartUser}> Мария И. </p>
								<p className={styles.reviewsCartUserDate}> 17.05.2023, консультация у Семеновой Е.А. </p>
							</div>
							<div className={styles.reviewsCartComments}>
								<p> «Очень внимательный консультант. Подробная консультация. Очень много узнала о своём диагнозе. Спасибо,что организовали такой центр» </p>
							</div>
						</div>
					</div>
					<div className={styles.reviewsCart}>
						<div className={styles.reviewsCartTop}> <img src={images.reviewsMarks} alt="reviewsMarks" /> </div>
						<div className={styles.reviewsCartBottom}>
							<div className={styles.reviewsStars}>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
								<div className={styles.reviewsStarsWrapper}> <img src={images.reviewsStars} alt="reviewsStars" /> </div>
							</div>
							<div className={styles.reviewsCartUsers}>
								<p className={styles.reviewsCartUser}> Антон Г. </p>
								<p className={styles.reviewsCartUserDate}> 13.12.2023, консультация у Семеновой Е.А. </p>
							</div>
							<div className={styles.reviewsCartComments}>
								<p> «Все отлично. Очень профессионально» </p>
							</div>
						</div>
					</div>
				</div>
				<button className={styles.reviewsBtn}>Показать все отзывы о консультантах</button>
			</div>
		</div>
            	</section>
            	<section className={styles.photoGallery}>
		<div className="container">
			<h2>Фотогалерея</h2>
			<PhotoSlider slides={sliderData.PhotoData} /> </div>
            	</section>
            </main>
            <Footer />
        </div>
    );
}
