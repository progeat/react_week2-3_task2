import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const isStepFirst = activeIndex === 0;
	const isStepLast = activeIndex === steps.length - 1;

	const onClickStepBack = () => setActiveIndex(activeIndex - 1);

	const onClickStepNext = () => setActiveIndex(activeIndex + 1);

	const onClickStepsReset = () => setActiveIndex(0);

	const onClickSwitchStep = ({ target }) => {
		const stepSelected = Number(target.dataset.index);
		setActiveIndex(stepSelected);
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
