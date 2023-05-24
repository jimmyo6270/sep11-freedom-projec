import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getDatabase, push, ref, onValue, remove, set } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js';

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
const auth = getAuth(app);

function addWorkoutToDatabase(uid, exerciseName, sets, reps) {
  const workoutRef = ref(database, `users/${uid}/workouts`);
  const newWorkoutRef = push(workoutRef);

  set(newWorkoutRef, {
    exerciseName: exerciseName,
    sets: sets,
    reps: reps
  })
    .then(() => {
      console.log('Workout added successfully!');
    })
    .catch((error) => {
      console.error('Error adding workout:', error);
    });
}

function deleteWorkout(uid, workoutKey) {
  const workoutRef = ref(database, `users/${uid}/workouts/${workoutKey}`);
  remove(workoutRef)
    .then(() => {
      console.log('Workout deleted successfully!');
    })
    .catch((error) => {
      console.error('Error deleting workout:', error);
    });
}

function displayWorkoutList(uid) {
  const workoutRef = ref(database, `users/${uid}/workouts`);

  onValue(workoutRef, (snapshot) => {
    const workouts = snapshot.val();
    const workoutsList = document.getElementById('workouts');
    workoutsList.innerHTML = '';

    for (let workoutKey in workouts) {
      const workout = workouts[workoutKey];
      const workoutItem = document.createElement('li');
      workoutItem.textContent = `${workout.exerciseName} - ${workout.sets} sets, ${workout.reps} reps`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteWorkout(uid, workoutKey);
      });

      workoutItem.appendChild(deleteButton);
      workoutsList.appendChild(workoutItem);
    }
  }, (error) => {
    console.error('Error retrieving workout list:', error);
  });
}

document.getElementById('add-workout-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const exerciseName = document.getElementById('exercise-name').value;
  const sets = parseInt(document.getElementById('sets').value);
  const reps = parseInt(document.getElementById('reps').value);

  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    addWorkoutToDatabase(uid, exerciseName, sets, reps);
  }

  document.getElementById('exercise-name').value = '';
  document.getElementById('sets').value = '';
  document.getElementById('reps').value = '';
});

auth.onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;
    displayWorkoutList(uid);
  }
});