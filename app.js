// Функция для извлечения значений из полей ввода и вычисления калорий
function calculateTotalCalories() {
	const proteinValue = isNaN(Number(proteinInput.value)) || Number(proteinInput.value) < 0 ? 0 : Number(proteinInput.value);
	const carbsValue = isNaN(Number(carbsInput.value)) || Number(carbsInput.value) < 0 ? 0 : Number(carbsInput.value);
	const fatsValue = isNaN(Number(fatsInput.value)) || Number(fatsInput.value) < 0 ? 0 : Number(fatsInput.value);

	const totalCalories = calcCalories(proteinValue, carbsValue, fatsValue); // Ккал

	// Выводим на экран
	totalMyCcalDiv.textContent = `${totalCalories} ккал`;

	// Сохраняем данные в localStorage
	localStorage.setItem('protein', proteinValue);
	localStorage.setItem('carbs', carbsValue);
	localStorage.setItem('fats', fatsValue);
	localStorage.setItem('totalCalories', totalCalories);
}
// Функция для сохранения продукта на сервер
async function saveProduct() {
	const proteinValue = Number(proteinInput.value);
	const carbsValue = Number(carbsInput.value);
	const fatsValue = Number(fatsInput.value);
	const productName = nameProdukt.value || `Продукт ${new Date().toLocaleString()}`; // Если нет имени, создаём по умолчанию
	const totalCalories = calcCalories(proteinValue, carbsValue, fatsValue);

	const productData = {
		 name: productName,
		 protein: proteinValue,
		 carbs: carbsValue,
		 fats: fatsValue,
		 calories: totalCalories
	};

	// Сохраняем продукт в localStorage
	localStorage.setItem('savedProduct', JSON.stringify(productData));

	try {
		 const response = await fetch('https://6725230fc39fedae05b40910.mockapi.io/fat_Alien/calories', {
			  method: 'POST',
			  headers: {
					'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(productData),
		 });

		 if (!response.ok) {
			  throw new Error('Ошибка при сохранении продукта');
		 }

		 const savedProduct = await response.json();
		 console.log('Продукт сохранён:', savedProduct);

		 // Задержка на 2 секунды перед выводом надписи
		 setTimeout(() => {
			  document.getElementById("saved-product").textContent = "Продукт сохранён:";
		 }, 2000); // 2000 миллисекунд = 2 секунды

	} catch (error) {
		 console.error('Ошибка:', error);
	}
}
window.onload = function() {
	const protein = localStorage.getItem('protein');
	const carbs = localStorage.getItem('carbs');
	const fats = localStorage.getItem('fats');
	const totalCalories = localStorage.getItem('totalCalories');

	if (totalCalories) {
		 // Показать сохранённые данные на странице
		 document.getElementById('totalCcal').textContent = `${totalCalories} ккал`;
		 document.getElementById('proteinValue').textContent = `${protein} г`;
		 document.getElementById('carbsValue').textContent = `${carbs} г`;
		 document.getElementById('fatsValue').textContent = `${fats} г`;
	} else {
		 // Если данных нет, отобразить значения по умолчанию
		 document.getElementById('totalCcal').textContent = '0 ккал';
		 document.getElementById('proteinValue').textContent = '0 г';
		 document.getElementById('carbsValue').textContent = '0 г';
		 document.getElementById('fatsValue').textContent = '0 г';
	}
};
