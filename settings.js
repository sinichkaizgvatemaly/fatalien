// Функция для вычисления калорий
function calcCalories(protein, carbs, fats) {
	return (protein * 4) + (carbs * 4) + (fats * 9); // Белки и углеводы по 4 калории на грамм, жиры по 9
}

// Функция для подсчета общей нормы калорий
function calculateTotalCalories() {
	// Получаем значения из полей ввода
	const proteinValue = isNaN(Number(document.getElementById('proteinInput').value)) || Number(document.getElementById('proteinInput').value) < 0 ? 0 : Number(document.getElementById('proteinInput').value);
	const carbsValue = isNaN(Number(document.getElementById('carbsInput').value)) || Number(document.getElementById('carbsInput').value) < 0 ? 0 : Number(document.getElementById('carbsInput').value);
	const fatsValue = isNaN(Number(document.getElementById('fatsInput').value)) || Number(document.getElementById('fatsInput').value) < 0 ? 0 : Number(document.getElementById('fatsInput').value);

	// Рассчитываем калории
	const totalCalories = calcCalories(proteinValue, carbsValue, fatsValue);

	// Выводим результат в блок с id="kcalOutput"
	document.getElementById('kcalOutput').textContent = `${totalCalories} ккал`;
	localStorage.setItem('totalCalories', totalCalories);
}
function saveToLocalStorage() {
	const proteinValue = document.getElementById('proteinInput').value;
	const carbsValue = document.getElementById('carbsInput').value;
	const fatsValue = document.getElementById('fatsInput').value;
	const totalCalories = document.getElementById('kcalOutput').textContent = `${totalCalories} ккал`;
	

	// Сохраняем все данные в localStorage
	localStorage.setItem('protein', proteinValue);
	localStorage.setItem('carbs', carbsValue);
	localStorage.setItem('fats', fatsValue);
	localStorage.setItem('totalCalories', totalCalories);

	alert('Данные сохранены!');
}