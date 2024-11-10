document.addEventListener('DOMContentLoaded', function() {
	// Проверка поддержки localStorage
	if (typeof(Storage) === "undefined") {
		 console.error("Local Storage не поддерживается данным браузером");
		 return;
	}

	const addNoteBtn = document.getElementById('addNoteBtn');
	const notebookContent = document.getElementById('notebookContent');

	// Функция для сохранения данных в localStorage
	function saveToLocalStorage(notes) {
		 localStorage.setItem('notes', JSON.stringify(notes));
	}

	// Функция для загрузки заметок из localStorage
	function loadNotes() {
		 const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
		 notebookContent.innerHTML = ''; // Очистка текущих заметок
		 savedNotes.forEach(note => {
			  createNoteSection(note);
		 });
	}

	// Функция для создания новой секции заметки
	function createNoteSection(note) {
		 const noteSection = document.createElement('div');
		 noteSection.classList.add('notebook__section');
		 noteSection.innerHTML = `
			  <div class="content">${note.content}</div>
			  <div class="timestamp">${note.timestamp}</div>
		 `;
		 notebookContent.appendChild(noteSection);
	}

	// Добавление новой заметки
	addNoteBtn.addEventListener('click', function() {
		 const newNoteContent = prompt("Введите текст заметки:");
		 if (!newNoteContent || newNoteContent.trim() === '') {
			  alert("Заметка не может быть пустой");
			  return;
		 }

		 const newNote = {
			  content: newNoteContent,
			  timestamp: new Date().toLocaleString(),
		 };

		 // Загружаем старые заметки из localStorage
		 const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
		 savedNotes.push(newNote);

		 // Сохраняем обновленные заметки в localStorage
		 saveToLocalStorage(savedNotes);

		 // Добавляем новую заметку на страницу
		 createNoteSection(newNote);
	});

	// Загрузка заметок при загрузке страницы
	loadNotes();
});
