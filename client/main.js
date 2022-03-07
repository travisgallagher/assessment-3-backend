//const res = require("express/lib/response");

document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
        const data = response.data;
        alert(data);
        });
};

// const fortuneBtn = document.getElementById("fortuneButton").onclick = function () {
//     axios.get("http://localhost:4000/api/fortune/")
//         .then(function (response) {
//         const data = response.data;
//         alert(data);
//         });
// };


// Step 1: Grab the element from HTML
const fortuneBtn = document.getElementById("fortuneButton"); 

const nameBtn = document.getElementById("nameButton");
const nameInput = document.getElementById("nameInput");

const indexBtn = document.getElementById("indexButton"); 
const indexInput = document.getElementById("indexInput"); 

const form = document.querySelector("form"); 
const newNameInput = document.getElementById("newNameInput")
const newNameIndex = document.getElementById("newNameIndex")
const submitForm = document.getElementById(`submitForm`)


// Step 2: Write out the functionality of the element
function getFortune() {
    axios.get("http://localhost:4000/api/fortune")
        .then((res) => {
            console.log(res.data); 
            alert(res.data); 
        });
};

function createName() {
    const newName = nameInput.value; 

    const body = {
        newName // newName: newName
    };

    axios.post("http://localhost:4000/api/name", body)
        .then((res) => {
            // console.log(res.data);
            let name = res.data[res.data.length - 1]; //grabs last element in array
            alert(`you just registered ${name}`)
            console.log(res.data)

            nameInput.value = ``; 
        }) 
}

function deleteName() {
    const newIndex = indexInput.value; 

    axios.delete(`http://localhost:4000/api/delete/${newIndex}`)
        .then((res) => {
            alert("You have successfully deleted a user. ")
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err.response.data); 
        })
}

function editName() {
    const nameChange = newNameInput.value; 
    const indexChange = newNameIndex.value; 

    const body = {
        nameChange 
    };

    axios.put(`http://localhost:4000/api/edit/${indexChange}`, body)
        .then((res) => {
            alert(`Your users array now contains ${res.data}`)
            console.log(res.data)
        })
        .catch
        console.log((err) => {
            console.log(err.response.data); 
        }); 

}

// Step 3: Add the event listener to my element. 
// params for event listener: event and callback
fortuneBtn.addEventListener("click", getFortune); 
nameBtn.addEventListener("click", createName); 
indexBtn.addEventListener("click", deleteName); 
form.addEventListener("submit", editName); 

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const editGoal = (id,goalDesc,goalText) => {
const goalDescription = document.getElementById("goalDescription")
const goal = document.getElementById("goal");
goalDescription.value = goalDesc;
goal.value = goalText;

axios.put(`http://localhost:4000/api/goals/${id}`, {goalDescription:goalDescription.value,goal:goal.value}).then((res) => {
    populateGoals(res.data)
    console.log(res)
}).catch(err => {
    console.error({err})
})

}
const populateGoals = (goals) => {
    const goalsContainer = document.getElementById("goals");
    if(goals.length === 0) {removeAllChildNodes(goalsContainer); return;};

    goals.forEach((goal,i) => {
    const goalContainer = document.createElement("div");
    const goalDesc = document.createElement("p");
    const goalText = document.createElement("p");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    goalDesc.innerHTML = `Desc: ${goal.goalDescription}`;
    goalText.innerHTML = `Goal: ${goal.goal}`;
    deleteButton.onclick = () => {
        axios.delete(`http://localhost:4000/api/goals/${i}`).then(res => {
        console.log(res);
        populateGoals([])
        }).catch(err => {
        console.log({err});
        }) 
    }
    editButton.onclick = (e) => {
        e.preventDefault();
        editGoal(i,goalDesc.innerHTML,goalText.innerHTML)};
    goalContainer.style.cursor = 'pointer'
    deleteButton.innerText = "Delete";
    editButton.innerText = "Edit";
    goalContainer.append(goalDesc,goalText,deleteButton,editButton);
    goalsContainer.append(goalContainer);
    });
}

function getAllGoals() {
    axios.get("http://localhost:4000/api/goals")
    .then(function(res) {
        const data = response.data; 
        alert(data);  
})

}
document.getElementById("addGoalButton").onclick = function (e) {
    e.preventDefault();
    const goalDescription = document.getElementById("goalDescription").value;
    const goal = document.getElementById("goal").value; 
    const body = { goalDescription, goal };
    axios.post("http://localhost:4000/api/goals/", body)
        .then((response)  => {
        const data = response.data;
        populateGoals(data)
        }).catch(error => {
        console.log({error})
        });
    };