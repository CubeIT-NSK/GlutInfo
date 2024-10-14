import optionLabels from './optionLabels';

const questionBlocks = [
    {
        description: '',
        shouldNumber: true,
        shouldLetter: false,
        questions: [
            {
                title: 'Испытывали ли Вы усталость за последнюю неделю?',
                options: optionLabels.yesNoLabels,
            },
            {
                title: 'Пожалуйста, оцените Вашу слабость (усталость, утомление) которое лучше всего описывает Вашу слабость на данный момент',
                options: optionLabels.weaknessLevelLabels,
            },
            {
                title: 'Пожалуйста, оцените уровень Вашей обычной слабости (усталости, утомления), которую Вы испытывали за последние 24 часа',
                options: optionLabels.weaknessLevelLabels,
            },
            {
                title: 'Пожалуйста, оцените уровень самой высокой слабости (усталости, утомления), которую Вы испытывали за последние 24 часа',
                options: optionLabels.weaknessLevelLabels,
            },
        ],
    },
    {
        description: 'Пожалуйста, выберите цифру, соответствующую насколько за последние 24 часа усталость влияла на:',
        shouldNumber: false,
        shouldLetter: true,
        questions: [
            {
                title: 'Общую активность',
                options: optionLabels.influenceLevelLabels,
            },
            {
                title: 'Настроение',
                options: optionLabels.influenceLevelLabels,
            },
            {
                title: 'Способность ходить',
                options: optionLabels.influenceLevelLabels,
            },
            {
                title: 'Способность выполнять работу (включая, как работу вне дома, так и выполнение домашних повседневных обязанностей',
                options: optionLabels.influenceLevelLabels,
            },
            {
                title: 'Отношение с людьми',
                options: optionLabels.influenceLevelLabels,
            },
            {
                title: 'Способность радоваться жизни',
                options: optionLabels.influenceLevelLabels,
            },
        ],
    },
];

export default questionBlocks;
