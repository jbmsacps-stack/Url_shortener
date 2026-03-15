const API = 'http://localhost:5000/api/notes';

// Run when the page loads — fetch and show all notes
document.addEventListener('DOMContentLoaded', loadNotes);

// When "Add Note" is clicked
document.getElementById('add-btn').addEventListener('click', addNote);

// Fetch all notes from the backend and display them
async function loadNotes() {
  const res = await fetch(API);
  const notes = await res.json();

  const list = document.getElementById('notes-list');
  list.innerHTML = ''; // Clear old notes before re-rendering

  notes.forEach((note) => {
    const card = document.createElement('div');
    card.className = 'note-card';

    const date = new Date(note.createdAt).toLocaleDateString();

    card.innerHTML = `
      <div>
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <span class="date">${date}</span>
      </div>
      <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
    `;

    list.appendChild(card);
  });
}

// Send a POST request to create a new note
async function addNote() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (!title || !content) {
    alert('Please fill in both fields!');
    return;
  }

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });

  // Clear the form inputs
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';

  // Reload notes to show the new one
  loadNotes();
}

// Send a DELETE request to remove a note by its ID
async function deleteNote(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadNotes(); // Refresh the list
}