
firebase.initializeApp({
    apiKey: "AIzaSyAsBfLqIT4ki2tV_UnbfFE1VbNFDhGWVZM",
    authDomain: "taskmanagement-726bc.firebaseapp.com",
    projectId: "taskmanagement-726bc",
});

//Conect to database
const db = firebase.firestore();

//Function to add a task
function addTask(){
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    if(task !== ""){
        db.collection('tasks').add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
        alert('Task Added.');
    }
}

//Fetch tasks from the database and display them
function renderTasks(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement('li');

    taskItem.className = "task-item";

    taskItem.innerHTML = `
        <span>${doc.data().task}</span>
        <button onclick="deleteTask('${doc.id}')">Delete</button
    `;

    taskList.appendChild(taskItem);
}


//Fetch task list
db.collection('tasks')
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot=>{
        const changes = snapshot.docChanges();
        changes.forEach(change=>{
            if(change.type === "added"){
                renderTasks(change.doc);
            }
        });
    });

//Delete Task
function deleteTask(id){
    db.collection('tasks').doc(id).delete();
}
