
var database = firebase.database();

// Get references to HTML elements
var addWorkoutForm = document.getElementById('add-workout-form');
var workoutList = document.getElementById('workouts');

// Add workout to Firebase database
addWorkoutForm.addEventListener('submit', function(event) {
  event.preventDefault();
  var exerciseName = addWorkoutForm.elements['exercise-name'].value;
  var sets = addWorkoutForm.elements['sets'].value;
  var reps = addWorkoutForm.elements['reps'].value;
  database.ref('workouts').push({
    exerciseName: exerciseName,
    sets: sets,
    reps: reps
  });
  addWorkoutForm.reset();
});

// Get workouts from Firebase database
database.ref('workouts').on('value', function(snapshot) {
  workoutList.innerHTML = '';
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    var exerciseName = childData.exerciseName;
    var sets = childData.sets;
    var reps = childData.reps;
    var workoutListItem = document.createElement('li');
    workoutListItem.innerHTML = '<span>' + exerciseName + '</span> - Sets: ' + sets + ', Reps: ' + reps;
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', function() {
      database.ref('workouts/' + childSnapshot.key).remove();
    });
    workoutListItem.appendChild(deleteButton);
    workoutList.appendChild(workoutListItem);
  });
});