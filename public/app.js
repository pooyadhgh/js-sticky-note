const notesContainer = document.querySelector('#app');
const addNoteBtn = document.querySelector('.add-note');

const getNotes = () => {
  return JSON.parse(localStorage.getItem('notes') || '[]');
};

const saveNotes = notes => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

const updateNote = (id, newContent) => {
  const notes = getNotes();
  const selectedNote = notes.filter(item => item.id === id)[0];
  selectedNote.content = newContent;
  saveNotes(notes);
};

const deleteNote = (id, element) => {
  const notes = getNotes();
  const filteredNotes = notes.filter(item => item.id !== id);
  saveNotes(filteredNotes);
  notesContainer.removeChild(element);
};

const createNoteElement = (id, content) => {
  const noteElement = document.createElement('textarea');
  noteElement.classList.add('note');
  noteElement.value = content;

  noteElement.addEventListener('change', () =>
    updateNote(id, noteElement.value)
  );
  noteElement.addEventListener('dblclick', () =>
    deleteNote(id, noteElement)
  );
  return noteElement;
};

const addNote = () => {
  const notes = getNotes();
  const noteItem = {
    id: Math.floor(Math.random() * 100000),
    content: 'Add something ...',
  };

  const noteElement = createNoteElement(
    noteItem.id,
    noteItem.content
  );
  notesContainer.insertBefore(noteElement, addNoteBtn);

  notes.push(noteItem);
  saveNotes(notes);
};

getNotes().forEach(item => {
  const noteElement = createNoteElement(item.id, item.content);
  notesContainer.insertBefore(noteElement, addNoteBtn);
});

addNoteBtn.addEventListener('click', () => addNote());
