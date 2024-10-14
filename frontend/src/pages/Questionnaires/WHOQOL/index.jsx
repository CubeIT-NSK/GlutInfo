import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import UniversalMessage from '../../../shared/components/Messages/UniversalMessage';
import styles from "./index.module.css";
import answerIcons from './data/answerIcons';
import highlightDescription from './data/highlightDescription';
import questionBlocks from './data/questionBlocks';
import optionLabels from './data/optionLabels';

const renderDescription = (description) => {
    return description.split('/n').map((text, index) => {
        let highlightedDescription = text;

        highlightedDescription = highlightedDescription.replace(/\/b/g, '<br>');

        highlightDescription.forEach((highlight) => {
            const regex = new RegExp(`(${highlight})`, 'gi');
            highlightedDescription = highlightedDescription.replace(regex, `<span class="${styles.highlightDescription}">$1</span>`);
        });

        return (
            <p key={index} className={styles.description} dangerouslySetInnerHTML={{ __html: highlightedDescription }} />
        );
    });
};

export default function WhoqolPage() {
    const [currentBlock, setCurrentBlock] = useState(0);
    const [answers, setAnswers] = useState(
        questionBlocks.map(block => Array(block.questions.length).fill(null))
    );
    const [submitted, setSubmitted] = useState(false);
    const { handleSubmit, register } = useForm();

    const [fade, setFade] = useState(false);
    const [fadeDescription, setFadeDescription] = useState(false);


    const navigate = useNavigate();

    const onSubmit = () => {
        navigate('/profile-patient');
    };

    const handleExit = (event) => {
        event.preventDefault();
        navigate('/profile-patient');
    };

    const handleAnswerChange = (blockIndex, questionIndex, value) => {
        const newAnswers = [...answers];
        newAnswers[blockIndex][questionIndex] = value;
        setAnswers(newAnswers);
    };

    const nextBlock = (event) => {
        event.preventDefault();
        setFade(true);
        setFadeDescription(true);

        setTimeout(() => {
            if (currentBlock < questionBlocks.length - 1) {
                setCurrentBlock(currentBlock + 1);
            }
            setFade(false);
            setFadeDescription(false);
        }, 300);
    };

    const submitResults = (data) => {
        const allAnswers = answers.flat().filter(answer => answer !== null);
        const totalScore = allAnswers.reduce((acc, answer) => acc + (typeof answer === 'number' ? answer : 0), 0);
        const averageScore = totalScore / allAnswers.length;
        const roundedAverageScore = Math.round(averageScore);

        console.log('Средний результат:', roundedAverageScore);

        if (data.comment.trim() !== "") {
            console.log('Комментарий:', data.comment);
        } else {
            console.log('Комментарий не был предоставлен.');
        }

        setSubmitted(true);
    };

    const isBlockComplete = answers[currentBlock].every(answer => answer !== null);
    const currentQuestionBlock = questionBlocks[currentBlock];

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.whoqolSection}>
                    <form className={styles.questionsForm} onSubmit={handleSubmit(submitResults)}>
                        {submitted ? (
                            <UniversalMessage
                                title="Гастроэнтерологический опросник качества жизни (WHOQOL-BREF)"
                                subtitle="Спасибо за прохождение анкеты! Ваш результат успешно отправлен."
                                buttonLabel="Назад в личный кабинет"
                                onButtonClick={() => {
                                    onSubmit();
                                }}
                            />
                        ) : (
                            currentQuestionBlock && (
                                <>
                                    <div className={styles.whoqoTitlesWrapper}>
                                        <h1 className={styles.whoqolTitle}>Гастроэнтерологический опросник качества жизни (WHOQOL-BREF)</h1>
                                        {currentQuestionBlock.description && (
                                            <div className={`${styles.descriptionBlock} ${fadeDescription ? styles.fadeOut : styles.fadeIn}`}>
                                                {renderDescription(currentQuestionBlock.description)}
                                            </div>
                                        )}
                                    </div>
                                    <div className={`${styles.questionsWithBtnWrapper} ${fade ? styles.fadeOut : styles.fadeIn}`}>
                                        <div className={`${styles.questionsWrapper} ${fade ? styles.scaleDown : styles.scaleUp}`}>
                                            {currentQuestionBlock.questions?.map((question, q_idx) => (
                                                <div key={q_idx} className={styles.questionBlock}>
                                                    <div className={styles.titleWrapper}>
                                                        {!question.isTextarea && (
                                                            <p>
                                                                {questionBlocks
                                                                    .slice(0, currentBlock)
                                                                    .reduce((total, block) => total + block.questions.length, 0) + (q_idx + 1)}.
                                                            </p>
                                                        )}
                                                        <h2 className={styles.whoqolSubTitle}>
                                                            {question.title}
                                                        </h2>
                                                    </div>
                                                    {question.isTextarea ? (
                                                        <textarea
                                                            className={styles.questionsTextarea}
                                                            {...register('comment')}
                                                            onChange={(e) => handleAnswerChange(currentBlock, q_idx, e.target.value)}
                                                        />
                                                    ) : (
                                                        <div className={styles.iconsAnswersWrapper}>
                                                            {answerIcons.map((icon, icon_idx) => (
                                                                <div
                                                                    key={icon_idx}
                                                                    className={`${styles.iconWithAnswer} ${answers[currentBlock][q_idx] === icon_idx + 1 ? styles.selected : ''}`}
                                                                    onClick={() => handleAnswerChange(currentBlock, q_idx, icon_idx + 1)}
                                                                >
                                                                    <img src={icon} alt="icon" />
                                                                    <span
                                                                        className={
                                                                            question.options[icon_idx] === optionLabels.satisfactionLabels[icon_idx]
                                                                                ? styles.iconWithAnswerLabelSatisfaction
                                                                                : styles.iconWithAnswerLabel
                                                                        }
                                                                    >
                                                                        {question.options[icon_idx]}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className={styles.buttonWrapper}>
                                            {currentBlock < questionBlocks.length - 1 ? (
                                                <button type="button" className={styles.questionsBtn} onClick={nextBlock} disabled={!isBlockComplete}>
                                                    Далее {currentBlock + 1}/{questionBlocks.length}
                                                </button>
                                            ) : (
                                                <button type="submit" className={styles.submitButton} disabled={!isBlockComplete}>
                                                    Отправить результат
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                    </form>
                    <button className={styles.exitButton} onClick={handleExit}>Выход</button>
                </section>
            </main>
            <Footer />
        </div>
    );
}
