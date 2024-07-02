import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const [isStepFirst, setIsStepFirst] = useState(false);
	const [isStepLast, setIsStepLast] = useState(false);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const onClickStepBack = () => {
		setActiveIndex((updateActiveIndex) => --updateActiveIndex);
		setIsStepFirst(!(activeIndex - 1));
		setIsStepLast(false);
	};
	const onClickStepNext = () => {
		setActiveIndex((updateActiveIndex) => ++updateActiveIndex);
		setIsStepFirst(false);
		setIsStepLast(activeIndex + 1 === data.length - 1);
	};
	const onClickStepsReset = () => {
		setActiveIndex(0);
		setIsStepFirst(true);
		setIsStepLast(false);
	};
	const onClickSwitchStep = ({ target }) => {
		const currentIndex = Number(target.dataset.index);
		setActiveIndex(currentIndex);
		setIsStepFirst(!currentIndex);
		setIsStepLast(currentIndex === data.length - 1);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((item, index) => (
							<li
								className={
									styles['steps-item'] +
									' ' +
									(index <= activeIndex && styles.done) +
									' ' +
									(index === activeIndex && styles.active)
								}
								key={item.id}
							>
								<button
									className={styles['steps-item-button']}
									data-index={index}
									onClick={onClickSwitchStep}
								>
									{index + 1}
								</button>
								{item.title}
							</li>
						))}
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{/* <li className={styles['steps-item'] + ' ' + styles.done}> */}
						{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
						{/* <button className={styles['steps-item-button']}>1</button> */}
						{/* При клике на кнопку установка выбранного шага в качестве активного */}
						{/* Шаг 1
						</li>
						<li className={styles['steps-item'] + ' ' + styles.done}>
							<button className={styles['steps-item-button']}>2</button>
							Шаг 2
						</li>
						<li
							className={
								styles['steps-item'] +
								' ' +
								styles.done +
								' ' +
								styles.active
							}
						>
							<button className={styles['steps-item-button']}>3</button>
							Шаг 3
						</li>
						<li className={styles['steps-item']}>
							<button className={styles['steps-item-button']}>4</button>
							Шаг 4
						</li> */}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onClickStepBack}
							disabled={isStepFirst}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={!isStepLast ? onClickStepNext : onClickStepsReset}
						>
							{!isStepLast ? 'Далее' : 'Начать сначала'}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
