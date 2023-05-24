import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';


// The web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5rTzaDATliWSsXsuJFz5UwRhejr_0kQo",
  authDomain: "sep11-9f401.firebaseapp.com",
  projectId: "sep11-9f401",
  storageBucket: "sep11-9f401.appspot.com",
  messagingSenderId: "25395934947",
  appId: "1:25395934947:web:761ca2e3fbb2ef06d837d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = "index2.html";
      console.log('User logged in:', userCredential.user);
    })
    .catch((error) => {
      // Handle login errors
      errorMessage.textContent = "wrong login";
    });
});
