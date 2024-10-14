import optionLabels from './optionLabels';

const questionBlocks = [
    {
        description: 'Следующие вопросы касаются Вашей точки зрения на качество жизни, на состояние здоровья и другие сферы Вашей жизни. /nПожалуйста, выберите ответ, который покажется наиболее подходящим. Если вы не уверены, как ответить на вопрос, первый ответ, который придет Вам в голову, часто бывает наилучшим./nПожалуйста, помните о своих стандартах, надеждах, развлечениях и интересах. Мы спрашиваем о том, какой Вы считаете свою жизнь в течение последних четырех недель.',
        questions: [
            {
                title: 'Как Вы оцениваете качество Вашей жизни?',
                options: optionLabels.qualityLabels,
            },
            {
                title: 'Насколько Вы удовлетворены состоянием своего здоровья?',
                options: optionLabels.qualityLabels,
            },
        ],
    },
    {
        description: 'В ответах на следующие вопросы укажите, в какой степени Вы испытывали определенные состояния в течение последних четырех недель.',
        questions: [
            {
                title: 'По Вашему мнению, в какой степени физические боли мешают Вам выполнять свои обязанности?',
                options: optionLabels.degreeLabels,
            },
            {
                title: 'В какой степени Вы нуждаетесь в какой-либо медицинской помощи для нормального функционирования в своей повседневной жизни?',
                options: optionLabels.degreeLabels,
            },
            {
                title: 'Насколько Вы довольны своею жизнью?',
                options: optionLabels.degreeReverseLabels,
            },
            {
                title: 'Насколько, по Вашему мнению, Ваша жизнь наполнена смыслом?',
                options: optionLabels.degreeReverseLabels,
            },
            {
                title: 'Насколько хорошо Вы можете концентрировать внимание?',
                options: optionLabels.degreeReverseLabels,
            },
            {
                title: 'Насколько безопасно Вы чувствуете себя в повседневной жизни?',
                options: optionLabels.degreeReverseLabels,
            },
            {
                title: 'Насколько здоровой является физическая среда вокруг Вас?',
                options: optionLabels.degreeReverseLabels,
            },
        ],
    },
    {
        description: 'В следующих вопросах речь идет о том, насколько полно Вы ощущали или были в состоянии выполнять определенные функции в течение последнихчетырех недель.',
        questions: [
            {
                title: 'Достаточно ли у Вас энергии для повседневной жизни?',
                options: optionLabels.degreeReverseLabels,
            },
            {
                title: 'Способны ли Вы смириться со своим внешним видом?',
                options: optionLabels.degreeReverseLabels,
            },
            {
                title: 'Достаточно ли у Вас денег для удовлетворения Ваших потребностей?',
                options: optionLabels.degreeReverseLabels,
            },
            {
                title: 'Насколько доступна для Вас информация, необходимая в Вашей повседневной жизни?',
                options: optionLabels.degreeReverseLabels,
            },
            {
                title: 'В какой мере у Вас есть возможности для отдыха и развлечений?',
                options: optionLabels.degreeReverseLabels,
            },
        ],
    },
    {
        description: 'В следующих вопросах речь идет о том, насколько полно Вы ощущали или были в состоянии выполнять определенные функции в течение последних четырех недель.',
        questions: [
            {
                title: 'Насколько легко Вы можете добраться до нужных Вам мест?',
                options: optionLabels.difficultyLabels,
            },
            {
                title: 'Насколько Вы удовлетворены своим сном?',
                options: optionLabels.satisfactionLabels,
            },
            {
                title: 'Насколько Вы удовлетворены способностью выполнять свои повседневные обязанности?',
                options: optionLabels.satisfactionLabels,
            },
            {
                title: 'Насколько Вы удовлетворены своею трудоспособностью?',
                options: optionLabels.satisfactionLabels,
            },
            {
                title: 'Насколько Вы довольны собой?',
                options: optionLabels.satisfactionLabels,
            },
            {
                title: 'Насколько Вы удовлетворены личными взаимоотношениями?',
                options: optionLabels.satisfactionLabels,
            },
            {
                title: 'Насколько Вы удовлетворены своею сексуальной жизнью?',
                options: optionLabels.satisfactionLabels,
            },
            {
                title: 'Насколько Вы удовлетворены поддержкой, которую Вы получаете от своих друзей?',
                options: optionLabels.satisfactionLabels,
            },
            {
                title: 'Насколько Вы удовлетворены условиями в месте Вашего проживания?',
                options: optionLabels.satisfactionLabels,
            },
            {
                title: 'Насколько Вы удовлетворены доступностью медицинского обслуживания для Вас?',
                options: optionLabels.satisfactionLabels,
            },
            {
                title: 'Насколько Вы удовлетворены транспортом, которым Вы пользуетесь?',
                options: optionLabels.satisfactionLabels,
            },
        ],
    },
    {
        description: 'Следующие вопросы касаются того, насколько часто Вы ощущали или переживали определенные состояния в течение последних четырех недель.',
        questions: [
            {
                title: 'Как часто у Вас были отрицательные переживания, например плохое настроение, отчаяние, тревога, депрессия?',
                options: optionLabels.timeLabels,
            },
            {
                title: 'У Вас есть какие-нибудь замечания в отношении обследования (оценки)?',
                isTextarea: true,
            },
        ],
    },
];

export default questionBlocks;
