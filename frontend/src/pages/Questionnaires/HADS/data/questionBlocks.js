import optionLabels from './optionLabels';

const questionBlocks = [
    {
        description: 'Выберите ответ, который в наибольшей степени соответствует Вашему самочувствию на прошлой неделе. /nНе раздумывайте долго над ответом, ваша первая реакция будет лучшей.',
        questions: [
            {
                title: 'Я напряжен, мне не по себе',
                options: optionLabels.timeSpentLabels,
            },
            {
                title: 'То, что приносило удовольствие, и сейчас вызывает у такое же чувство',
                options: optionLabels.definitelyTrueLabels,
            },
            {
                title: 'Я испытываю страх, кажется, будто что-то ужасное может вот-вот случиться',
                options: optionLabels.fearIntensityLabels,
            },
            {
                title: 'Я способен рассмеяться и видеть смешное',
                options: optionLabels.satisfactionLevelLabels,
            },
            {
                title: 'Беспокойные мысли крутятся в голове',
                options: optionLabels.frequencyLabels,
            },
            {
                title: 'Я испытываю бодрость',
                options: optionLabels.feelingsExperienceLabels,
            },
            {
                title: 'Я легко могу сесть и расслабиться',
                options: optionLabels.agreementLevelLabels,
            },
        ],
    },
    {
        description: 'Выберите ответ, который в наибольшей степени соответствует Вашему самочувствию на прошлой неделе. /nНе раздумывайте долго над ответом, ваша первая реакция будет лучшей.',
        questions: [
            {
                title: 'Мне кажется, что все делаю очень медленно:',
                options: optionLabels.occurrenceLabels,
            },
            {
                title: 'Я испытываю внутреннее напряжение',
                options: optionLabels.experienceFrequencyLabels,
            },
            {
                title: 'Я не слежу за своей внешностью',
                options: optionLabels.selfCareLabels,
            },
            {
                title: 'Я испытываю неусидчивость, словно мне постоянно нужно двигаться',
                options: optionLabels.generalAgreementLabels,
            },
            {
                title: 'Я считаю, что мои дела принесут удовлетворение',
                options: optionLabels.comparisonToUsualLabels,
            },
            {
                title: 'У меня бывает внезапное чувство паники',
                options: optionLabels.frequentExperiencesLabels,
            },
            {
                title: 'Я получаю удовольствие от хорошей книги, радиопередачи или ТВ',
                options: optionLabels.occurrenceFrequencyLabels,
            },
        ],
    },
];

export default questionBlocks;
