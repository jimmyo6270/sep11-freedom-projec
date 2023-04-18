import { getAuth } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'

const auth = getAuth(app);


const email = document.getElementById('email').value;
const password = document.getElementById('password').value;


signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
