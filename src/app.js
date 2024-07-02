import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isStepFirst, setIsStepFirst] = useState(true);
	const [isStepLast, setIsStepLast] = useState(false);

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
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
