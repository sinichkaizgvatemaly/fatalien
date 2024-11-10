function updateDate() {
	const date = new Date();
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour12: false,
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};
	const dateBlock = document.getElementById('date-block');
	if (dateBlock) {
		dateBlock.textContent = date.toLocaleString('ru-RU', options);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	// Обновление даты при загрузке страницы и каждую секунду
	updateDate();
	setInterval(updateDate, 1000);

	// Прогресс бар для белков, жиров и углеводов
	const progressData = {
		proteins: 0,
		fats: 0,
		carbs: 0
	};
	const interval = setInterval(() => {
		// Увеличиваем прогресс
		Object.keys(progressData).forEach(key => {
			if (progressData[key] < 100) {
				progressData[key] += 10;
				updateProgressBar(key, progressData[key]);
			}
		});

		// Останавливаем таймер, когда все значения достигают 100%
		if (progressData.proteins >= 100 && progressData.fats >= 100 && progressData.carbs >= 100) {
			clearInterval(interval);
			console.log("Данные загружены!");
		}
	}, 1000); // Каждую секунду увеличиваем значения

	// Функция для обновления прогресс бара
	function updateProgressBar(type, value) {
		const progressBar = document.getElementById(`progress-bar-${type}`);
		const output = document.getElementById(`output-${type}`);
		progressBar.style.width = value + '%';
		output.textContent = value + '%';
	}
});


document.addEventListener('DOMContentLoaded', function () {
	const searchInput = document.getElementById('searchInput');
	const searchResultsContainer = document.getElementById('searchResults');
	let debounceTimeout; // Переменная для хранения таймера debounce

	// Обработчик события для поля ввода
	searchInput.addEventListener('input', function () {
		 const searchQuery = searchInput.value.trim();
		 
		 // Если есть введенный текст, выполняем поиск
		 if (searchQuery) {
			  clearTimeout(debounceTimeout); // Очищаем предыдущий таймер
			  debounceTimeout = setTimeout(() => {
					searchFromServer(searchQuery); // Выполнение запроса с задержкой
			  }, 500); // Задержка в 500мс
		 } else {
			  // Если поле пустое, очищаем результаты поиска
			  searchResultsContainer.innerHTML = '';
		 }
	});

	// Функция для поиска на сервере
	function searchFromServer(query) {
		 // URL API для запроса с параметром search, ищем по полю name
		 const apiUrl = `https://6725230fc39fedae05b40910.mockapi.io/fat_Alien/calories?name=${query}`;

		 // Выполнение запроса
		 fetch(apiUrl)
			  .then(response => {
					if (!response.ok) {
						 throw new Error('Ошибка при загрузке данных');
					}
					return response.json(); // Преобразуем ответ в JSON
			  })
			  .then(data => {
					// Если есть результаты, отображаем их
					if (data.length > 0) {
						 const results = data.map(item => {
							  return `<div class="result-item">
											  <h3>${item.name}</h3>
											  <p>Калории: ${item.calories}</p>
										 </div>`;
						 }).join('');
						 searchResultsContainer.innerHTML = results;
					} else {
						 // Если нет результатов, выводим сообщение
						 searchResultsContainer.innerHTML = 'Ничего не найдено.';
					}
			  })
			  .catch(error => {
					// Обработка ошибок, если запрос не удался
					searchResultsContainer.innerHTML = 'Ошибка при запросе данных.';
					console.error('Ошибка:', error);
			  });
	}
});

document.getElementById('searchBtn').addEventListener('click', function() {
	const searchQuery = document.getElementById('searchInput').value.toLowerCase();
	searchProducts(searchQuery);
});

function searchProducts(query) {
	const apiUrl = 'https://6725230fc39fedae05b40910.mockapi.io/fat_Alien/calories'; // URL API для поиска
	fetch(apiUrl)
		 .then(response => response.json())
		 .then(data => {
			  const filteredResults = data.filter(product => product.name.toLowerCase().includes(query));
			  displaySearchResults(filteredResults);
		 })
		 .catch(error => console.error('Ошибка при поиске продуктов:', error));
}

function displaySearchResults(products) {
	const searchResultsContainer = document.getElementById('searchResults');
	searchResultsContainer.innerHTML = ''; // Очищаем предыдущие результаты

	if (products.length === 0) {
		 searchResultsContainer.innerHTML = '<p>Продукты не найдены.</p>';
		 return;
	}

	products.forEach(product => {
		 const productDiv = document.createElement('div');
		 productDiv.classList.add('product-result');
		 productDiv.innerHTML = `
			  <p><strong>${product.name}</strong></p>
			  <p>Белки: ${product.protein} г, Жиры: ${product.fats} г, Углеводы: ${product.carbs} г, Калории: ${product.ccal} ккал</p>
			  <button class="save-button" onclick="saveToLocalStorage('${product.id}')">Сохранить</button>
			  <button class="add-button" onclick="addToSearchResults('${product.id}')">Добавить в результаты</button>
		 `;
		 searchResultsContainer.appendChild(productDiv);
	});
}

function saveToLocalStorage(productId) {
	const apiUrl = 'https://6725230fc39fedae05b40910.mockapi.io/fat_Alien/calories';
	fetch(`${apiUrl}/${productId}`)
		 .then(response => response.json())
		 .then(product => {
			  let savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
			  savedProducts.push(product);
			  localStorage.setItem('savedProducts', JSON.stringify(savedProducts));
			  alert('Продукт сохранён в локальном хранилище');
		 })
		 .catch(error => console.error('Ошибка при сохранении продукта:', error));
}

function addToSearchResults(productId) {
	const apiUrl = 'https://6725230fc39fedae05b40910.mockapi.io/fat_Alien/calories';
	fetch(`${apiUrl}/${productId}`)
		 .then(response => response.json())
		 .then(product => {
			  const productDiv = document.createElement('div');
			  productDiv.classList.add('product-result');
			  productDiv.innerHTML = `
					<p><strong>${product.name}</strong></p>
					<p>Белки: ${product.protein} г, Жиры: ${product.fats} г, Углеводы: ${product.carbs} г, Калории: ${product.ccal} ккал</p>
			  `;
			  const searchResultsContainer = document.getElementById('searchResults');
			  searchResultsContainer.appendChild(productDiv);
			  alert('Продукт добавлен в результаты поиска');
		 })
		 .catch(error => console.error('Ошибка при добавлении продукта:', error));
}
