


const addBtn = document.querySelector('.add-notes');
const clearBtn = document.querySelector('.clear-notes');
const container = document.querySelector('.container');

const notes = JSON.parse(localStorage.getItem('notes'));
addBtn.addEventListener('click', () => addNewNote())

const addNewNote = (text = "") => {
    const note = document.createElement('div')
    note.classList.add('note');

    note.innerHTML =`
    <div class="tools">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button> 
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea')

    textArea.value = text;
    main.innerHTML =  marked.parse(text)

    deleteBtn.addEventListener('click', () => {
        note.remove();
       updateLS();
    });
    editBtn.addEventListener('click', () => {
       main.classList.toggle('hidden');
       textArea.classList.toggle('hidden');
    });
    
    textArea.addEventListener('input', (e) => {
        const {value} = e.target;
        main.innerHTML = marked.parse(value);
        updateLS()
    })
    clearBtn.addEventListener('click', () => {
        localStorage.clear();
        container.removeChild(note)
      })
    container.appendChild(note);
    
}

if(notes){
    notes.forEach(note => {
        addNewNote(note);
    })
}
const updateLS = () => {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];
    notesText.forEach(note => notes.push(note.value));

    localStorage.setItem('notes', JSON.stringify(notes));
}

