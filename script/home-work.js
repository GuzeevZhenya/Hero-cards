// const smartphone = {
//     brand: 'samsung',
//     screen: 5.5,
//     rom: 128,
//     ram: 4,
//     gsp: true,
//     sensor: ['Accelerometer', 'E-compass', 'Fingerprint Sensor'],
//     camera: {
//         back: [32, 6, 5],
//         front: 16
//     }
// }
// const jsonSmart = JSON.stringify(smartphone);
// console.log(JSON.parse(jsonSmart));

document.addEventListener('DOMContentLoaded', () => {
	const select = document.getElementById('cars');
	const output = document.getElementById('output');
	const db = './db/dbHeroes.json';


	const getHeroes = callback => {
		const request = new XMLHttpRequest();

		request.open('GET', db);

		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) return;

			if (request.status === 200) {
				callback(JSON.parse(request.responseText));
			} else {
				new Error(request.statusText);
			}
		});

		request.send();
	};
	getHeroes();
	//    const request = new XMLHttpRequest();
	//    request.open('GET',)
	//    request.setRequestHeader('content-type','application/json')
})