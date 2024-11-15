import React, { useState, useEffect, useRef } from "react";
import Button from "../../../shared/components/Buttons";
import styles from "./index.module.css";

const questions = [
    "Основная проблема (цель консультации, опишите жалобы)",
    "Есть ли вредные привычки?",
    "Есть ли у Вас аллергии (кожные, на пищу, препараты, полиноз и др.)?",
    "Что знаете про заболевания ваших родственников?",
    "Какие у Вас есть хронические заболевания, может наблюдаетесь у специалистов?",
    "Были ли у Вас операции, если да, то какие?",
    "Для женщин: как протекает менструальный цикл (нарушения, болезненность, климакс), количество беременностей и родов, прием противозачаточных?",
    "Какие препараты сейчас принимаете?",
    "Сдавали ли какие-то анализы, проходили ли исследования? Если да, то прикрепите сканы результатов исследований в формате пдф или фото в раздел «Моя документация» в личном кабинете.",
    "Пожалуйста, измерьте следующие параметры: рост, вес, окружность талии, АД, температуру тела",
];

export default function TessqPage() {
    const [currentSection, setCurrentSection] = useState(0);
    const circleRefs = useRef([]);
    const pathRef = useRef(null);
    const animationRef = useRef(null);
    const [pathLength, setPathLength] = useState(0);
    const [circlePos, setCirclePos] = useState(0);
    const [targetPos, setTargetPos] = useState(0);

    const handleNext = () => {
        if (currentSection < questions.length - 1) {
            setCurrentSection(currentSection + 1);
            setTargetPos(Math.min(circlePos + pathLength / questions.length, pathLength));
        }
    };

    const handleSubmit = () => {
        console.log("Results submitted");
    };

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    useEffect(() => {
        if (circleRefs.current && pathRef.current) {
            const animateCircles = () => {
                const speed = 50;
                if (circlePos < targetPos) {
                    setCirclePos((prev) => Math.min(prev + speed, targetPos));
                    animationRef.current = requestAnimationFrame(animateCircles);
                } else {
                    cancelAnimationFrame(animationRef.current);
                }
            };

            animationRef.current = requestAnimationFrame(animateCircles);
            return () => cancelAnimationFrame(animationRef.current);
        }
    }, [targetPos]);

    useEffect(() => {
        if (circleRefs.current && pathRef.current) {
            const point = pathRef.current.getPointAtLength(circlePos);
            circleRefs.current.forEach((circle, index) => {
                if (circle) {
                    circle.setAttribute("cx", point.x);
                    circle.setAttribute("cy", point.y);
                }
            });
        }
    }, [circlePos]);

    const radii = [63.4615, 75, 61.1538, 57.6923];
    const fills = ["#F8A94A", "#F8A94A", "white", "#F8F8F8"];

    return (
            <>
                <section className={styles.patternSection}>
                    <div className="container"> 
                        <div
                            className={styles.questionsContainer}
                            style={{ transform: `translateY(calc(-${currentSection * 100}vh - 180px))` }}
                        >
                            <div className={styles.questionImgWrap}>
                                {questions.map((question, index) => (
                                    <div key={index} className={styles.questionWrapper}>
                                        <div className={styles.questionBlockWrapper}>
                                            <div className={styles.questionBlockTopWrapper}>
                                                <div className={styles.questionWText}>
                                                    <h2 className={styles.questionTextNum}>
                                                        {String(index + 1).padStart(2, '0')}
                                                    </h2>
                                                    <h3 className={styles.questionText}>
                                                        {question}
                                                    </h3>
                                                </div>
                                                <textarea
                                                    placeholder={`Ответ`}
                                                    className={`${styles.inputField}`}
                                                />
                                            </div>
                                            <Button
                                                variant="gradient"
                                                padding={index === questions.length - 1 ? "22.5px 119.5px" : "22.5px 202.5px"}
                                                onClick={index === questions.length - 1 ? handleSubmit : handleNext}
                                            >
                                                {index === questions.length - 1 ? "Отправить результаты" : "Далее"}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.imgWrapper}>
                                <svg
                                    className={styles.animatedSVG}
                                    width="1024"
                                    height="12433"
                                    viewBox="0 0 1024 12433"
                                    fill="none"
                                >
                                    <g clipPath="url(#clip0_3882_14824)">
                                        <path
                                            ref={pathRef}
                                            id="movingPath"
                                            d="M512 500 C400 900, 100 1000, 150 2000 C300 3000, 900 3500, 512 12433"
                                            fill="none"
                                            stroke="url(#gradient1)"
                                            strokeWidth="60"
                                        />
                                        {radii.map((radius, index) => (
                                            <g key={index}>
                                            <circle
                                                ref={(el) => (circleRefs.current[index] = el)}
                                                r={radius}
                                                fill={fills[index]}
                                            />
                                            {/* <path
                                                d="M76.4616 95.8462C78.3077 94.7691 81.5384 92.9235 82.5387 91.5383C83.8462 89.7696 85.7694 83.5386 84.6154 84.9231C83.2309 86.5389 81.0769 87.1543 79.2309 87.7697C80.923 86.3845 83.154 84.3077 83.7694 83.0001C84.6923 81.0001 85.3847 74.5386 84.5387 76.0768C83.4616 77.9999 81.3076 79.077 79.6155 80.0005C81.0769 78.4616 83.5384 75.7694 84.0769 74.3081C84.7694 72.1538 84.7694 65.6154 84.0769 67.308C83.3076 68.9999 81.2309 70.1539 79.3077 71.1542C80.7694 69.6153 82.5387 67.4617 83.0001 66.2309C83.4616 64.6927 83.6155 60.9233 83.3848 59.5388L84.3077 52.7693C82.4616 61.8461 83.3848 59.7693 77.8462 64.2309C79.0001 62.6159 81.9231 58.4617 82.2308 56.4617C82.5387 54.6923 81.9231 50.2308 81.3848 48.9231L81.5384 39.7694L81.0001 48.9231C80.6155 50.3851 79.6923 51.5384 78.6923 52.6156C79.0769 51.1542 79.3848 49.5385 79.2309 48.3845C79.0769 47.1537 77.3077 43.0001 76.3848 41.7693L75.8462 30.0003L75.7694 35.1541L75.6155 30.0003L75.1538 41.7693C74.2308 43.0001 72.4616 47.1537 72.3077 48.3845C72.1541 49.5385 72.3848 51.1542 72.8463 52.6156C71.8462 51.5384 70.9231 50.3851 70.5384 48.9231L70.0002 39.7694L70.077 48.9231C69.6155 50.2308 69.0002 54.6923 69.3077 56.4617C69.6155 58.4617 72.5384 62.6159 73.6923 64.2309C68.0002 59.6925 69.077 61.7693 67.2309 52.7693L68.1538 59.5388C67.9231 60.9233 68.0002 64.6927 68.5384 66.2309C69.0002 67.4617 70.7692 69.6153 72.2309 71.1542C70.3077 70.1539 68.1538 68.9999 67.4616 67.308C66.7692 65.6154 66.7692 72.1538 67.4616 74.3081C68.0002 75.7694 70.3848 78.4616 71.9231 80.0005C70.2309 79.077 68.077 77.9999 67.0002 76.0768C66.077 74.5386 66.8463 81.0001 67.7692 83.0001C68.3848 84.3077 70.6155 86.3845 72.3077 87.7697C70.4617 87.1543 68.2309 86.5389 66.9231 84.9231C65.7692 83.5386 67.6924 89.7696 69.0002 91.5383C69.9231 92.846 72.8463 94.6154 74.7694 95.6925L74.6155 105.692C69.6155 96.7697 64.3077 92.9235 61.1539 81.0001C61.3846 91.6159 65.5385 102.154 74.6155 107.77L74.4616 116.385H76.6923V114.539C82.8462 110.308 87.6923 103.154 88.5387 95.7694C88.6925 94.1543 88.6925 92.3849 88.8462 90.6924C84.0001 105.462 78.923 106.769 76.6155 110.692L76.4616 95.8462Z"
                                                fill="#F8A94A"
                                            />
                                            <path d="M76.4616 95.8462C78.3077 94.7691 81.5384 92.9235 82.5387 91.5383C83.8462 89.7696 85.7694 83.5386 84.6155 84.9231C83.2309 86.5389 81.0769 87.1543 79.2309 87.7697C80.9231 86.3845 83.154 84.3077 83.7694 83.0001C84.6923 81.0001 85.3848 74.5386 84.5387 76.0768C83.4616 77.9999 81.3077 79.077 79.6155 80.0005C81.0769 78.4616 83.5384 75.7694 84.077 74.3081C84.7694 72.1538 84.7694 65.6154 84.077 67.308C83.3077 68.9999 81.2309 70.1539 79.3077 71.1542C80.7694 69.6153 82.5387 67.4617 83.0002 66.2309C83.4616 64.6927 83.6155 60.9233 83.3848 59.5388L84.3077 52.7693C82.4616 61.8461 83.3848 59.7693 77.8462 64.2309C79.0002 62.6159 81.9231 58.4617 82.2309 56.4617C82.5387 54.6923 81.9231 50.2308 81.3848 48.9231L81.5384 39.7694L81.0002 48.9231C80.6155 50.3851 79.6924 51.5384 78.6923 52.6156C79.0769 51.1542 79.3848 49.5385 79.2309 48.3845C79.0769 47.1537 77.3077 43.0001 76.3848 41.7693L75.8463 30.0003V116.385H76.6923V114.539C82.8462 110.308 87.6923 103.154 88.5387 95.7694C88.6926 94.1543 88.6926 92.3849 88.8462 90.6924C84.0001 105.462 78.9231 106.769 76.6156 110.692L76.4616 95.8462Z" fill="#C97713"/> */}

                                        </g>

                                        ))}
                                    </g>
                                    <defs>
                                        <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="12433" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="#F8A94A" />
                                            <stop offset="100%" stopColor="#F8A94A" />
                                        </linearGradient>
                                        <clipPath id="clip0_3882_14824">
                                            <rect width="1024" height="12433" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
