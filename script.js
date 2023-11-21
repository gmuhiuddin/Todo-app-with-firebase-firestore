import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAuth, signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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
const auth = getAuth(app);
let collectionRef = collection(db, "todo")

let todoInput = document.getElementById('todo-input');
let addBtn = document.getElementById('add-btn');
let listDiv = document.getElementById('list-div');
let signUpUserName = document.getElementById('sign-up-user-name');
let signUpEmail = document.getElementById('sign-up-user-email');
let signUpPassword = document.getElementById('sign-up-user-password');
let signInEmail = document.getElementById('user-email');
let signInPassword = document.getElementById('user-password');
let signUpForm = document.getElementById('sign-up-form');
let signInForm = document.getElementById('sign-in-form');
let signInTxt = document.getElementById('sign-in-txt');
let signInDiv = document.getElementById('sign-in');
let signupDiv = document.getElementById('sign-up');
let signUpTxt = document.getElementById('sign-up-txt');
let container = document.getElementsByClassName('container');
let logoutBtn = document.getElementById('logoutBtn');
let BlogAppContainer = document.getElementById('container');
let userNametodolist = document.getElementById('userNametodolist');
let userId = '';

addBtn.addEventListener('click', addTodoToFirestore)

async function addTodoToFirestore() {
  if (todoInput.value != '') {
    let userTodo = {
      todo: todoInput.value
    }

    await addDoc(collectionRef, userTodo)

    todoInput.value = '';

    getDocsFunc();

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user

    BlogAppContainer.style.display = 'flex'
    container[0].style.display = 'none'

    const uid = user.uid;
    userId = uid

    // ...
  } else {
    // User is signed out
    // ...
    BlogAppContainer.style.display = 'none';
    container[0].style.display = 'flex';

  }
});

signUpForm.addEventListener('submit', a => {

  a.preventDefault()

  createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
     userId = user.uid
      BlogAppContainer.style.display = 'flex'
      container[0].style.display = 'none'

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      signUpPassword.value = '';
      BlogAppContainer.style.display = 'none'
      container[0].style.display = 'flex'

      signInEmail.value = '';
      signUpPassword.value = '';
      signInPassword.value = '';
      // ..
    });

})

signInForm.addEventListener('submit', a => {
  a.preventDefault()

  signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      BlogAppContainer.style.display = 'flex'
      container[0].style.display = 'none'
      signUpPassword.value = '';
      signInPassword.value = '';
      userId = user.uid

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert('incorrect Email or Password')
      signInPassword.value = '';
    });
}
)

logoutBtn.addEventListener('click', function () {
  signOut(auth).then(() => {
    // Sign-out successful.

    BlogAppContainer.style.display = 'none'
    container[0].style.display = 'flex'
  }).catch((error) => {
    // An error happened.
    alert('Some error please try again')
  });
})

signUpTxt.addEventListener('click', () => {

  signInDiv.style.display = 'none'
  signupDiv.style.display = 'block'

})

signInTxt.addEventListener('click', () => {

  signInDiv.style.display = 'block'
  signupDiv.style.display = 'none'

})