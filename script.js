import firebase from "firebase";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getDatabase } from 'firebase/database';

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
const database = getDatabase(app);

// Get references to HTML elements
const addWorkoutForm = document.getElementById('add-workout-form');
const workoutList = document.getElementById('workouts');

// Add workout to Firebase database
addWorkoutForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const exerciseName = addWorkoutForm.elements['exercise-name'].value;
  const sets = addWorkoutForm.elements['sets'].value;
  const reps = addWorkoutForm.elements['reps'].value;
  push(ref(database, 'workouts'), {
    exerciseName: exerciseName,
    sets: sets,
    reps: reps
  });

  addWorkoutForm.reset();
});

// Get workouts from Firebase database
onValue(ref(database, 'workouts'), function(snapshot) {
  workoutList.innerHTML = '';
  snapshot.forEach(function(childSnapshot) {
    const childData = childSnapshot.val();
    const exerciseName = childData.exerciseName;
    const sets = childData.sets;
    const reps = childData.reps;
    const workoutListItem = document.createElement('li');
    workoutListItem.innerHTML = '<span>' + exerciseName + '</span> - Sets: ' + sets + ', Reps: ' + reps;
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', function() {
      remove(ref(database, 'workouts/' + childSnapshot.key));
    });
    workoutListItem.appendChild(deleteButton);
    workoutList.appendChild(workoutListItem);
  });
});
