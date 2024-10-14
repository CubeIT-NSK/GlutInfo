import optionLabels from './optionLabels';

const questionBlocks = [
    {
        description: 'Блок 1 /nДиагностировали ли Вам данные состояния? Пожалуйста, отметьте соответствующий вариант',
        questions: [
            {
                title: 'Боли в животе, избыточное газообразование (вздутие живота, метеоризм)?',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Диарея (понос, жидкий стул), запор, рвота или тошнота?',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Астма или другие формы аллергии?',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Низкий рост, задержка роста, задержка физического или полового развития, потеря веса?',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Усталость, слабость, быстрая утомляемость?',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Необъяснимые перепады настроения, депрессия, тревога или эмоциональное возбуждение?',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Необъяснимые головные боли, боли в суставах или ломота в теле?',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Дефекты зубной эмали (вертикальные или горизонтальные белые канавки на постоянных зубах, повторные заболевания афтозным стоматитом?',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Кожные высыпания, такие как экзема, псориаз или герпетиформный дерматит (зуд, волдыри кожи)?',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Любой аутоиммунный синдром, например дефицит IgA или аутоиммунный тиреоидит?',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Диабет I типа?',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Синдром Дауна, синдром Тернера или синдром Уильяма (Вильямса)?',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Аутизм, гиперактивность, неспособность к обучению (серьезные трудности в обучении), синдром дефицита внимания?',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Есть ли родственники первой степени родства (родители и дети, родные братья или сестры) с подтвержденным диагнозом «Целиакия»?',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Большая продолжительность пропусков из-за болезней (более 15 дней)?',
                options: optionLabels.yesNoLabels,
            },
        ],
    },
    {
        description: 'Блок 2',
        questions: [
            {
                title: 'Ревматоидный артрит или системная красная волчанка',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Миокардит',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Синдром Шегрена',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Анемия',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Бесплодие',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Остеопороз',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Снижение аппетита',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Неспокойный сон, бессонница',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Расслоение ногтей',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Кровоточивость десен',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Сухость кожи, шелушение',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Пигментация на коже',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Сухость глаз, слезотечение, раздражение или покраснение глаз',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Дефицит витаминов и минералов',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Для женщин: нерегулярность менструального цикла, невынашивание беременности, ранняя менопауза',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Деформации костей, спонтанные переломы',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Судороги',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Ухудшение состояния после приема продуктов, содержащих глютен (пшеница, ячмень, рожь, манная крупа, овес, хлеб и хлебобулочные изделия, кондитерские изделия, полуфабрикаты)',
                options: optionLabels.frequencyLabels,
            },
        ],
    },
];

export default questionBlocks;
