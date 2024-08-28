import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

	return (
		<div className={styles.container}>
		<div className="serchBar">
			<input id={styles.searchBox} type="text" placeholder='Where To?' />
		</div>
		<div className={styles.vehicles}>
			<div className={styles.vehicle}>
				<img src="https://i.ibb.co/f9Jtdh2/rickshaw.jpg" alt="vecteezy-rickshaw-puller-in-the-city-illustration-concept-vector" border="0" />
				<h3>Price: </h3>
				<h3>Time: </h3>
			</div>
			<div className={styles.vehicle}>
							<img src="https://i.ibb.co/VHTsW0n/auto.png" alt="vecteezy-rickshaw-puller-in-the-city-illustration-concept-vector" border="0" />
				<h3>Price: </h3>
				<h3>Time: </h3>
			</div>
			<div className={styles.vehicle}>
							<img src="https://i.ibb.co/BywCkwc/leguna.jpg" alt="vecteezy-rickshaw-puller-in-the-city-illustration-concept-vector" border="0" />
				<h3>Price: </h3>
				<h3>Time: </h3>
				<div></div>
			</div>
		</div>
		</div>
	)
}
