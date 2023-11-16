import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDMeG-Yt8eUI3eoSEbLokIk9Fo_fCRTZ3k",
    authDomain: "blog-app-9f834.firebaseapp.com",
    projectId: "blog-app-9f834",
    storageBucket: "blog-app-9f834.appspot.com",
    messagingSenderId: "114009764949",
    appId: "1:114009764949:web:3c7974840f125054e290dc",
    measurementId: "G-K5QB7B6K9N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let collectionRef = collection(db, "todo")

let todoInput = document.getElementById('todo-input');
let addBtn = document.getElementById('add-btn');
let listDiv = document.getElementById('list-div');

addBtn.addEventListener('click', addTodoToFirestore)

async function addTodoToFirestore() {
    if (todoInput.value != '') {
        let userTodo = {
            todo: todoInput.value
        }

        let data = await addDoc(collectionRef, userTodo)
        
        todoInput.value = ''; 
        getDocsFunc()
        makeTodoList();


    } else {
        alert('Please enter some thing in input box')
    }
}

async function getDocsFunc() {
    listDiv.innerHTML = null
    let todos = await getDocs(collectionRef);

    todos.forEach(docs => {
        makeTodoList(docs)
    })
}

getDocsFunc()

function makeTodoList(value) {

    let { todo } = value.data()

    let div = document.createElement('div');;
    div.className = 'div';

    let p = document.createElement("p");
    p.className = 'p';
    p.innerText = todo;

    let delBtn = document.createElement('span');
    delBtn.innerText = "×";
    delBtn.className = 'delBtn';
    delBtn.id = value.id;

    div.appendChild(p);
    div.appendChild(delBtn);

    delBtn.addEventListener("click", async function () {
        console.log(this.id)
        let docRef = doc(db, 'todo', this.id);
            await deleteDoc(docRef);
        getDocsFunc()
    })

    listDiv.appendChild(div);

}