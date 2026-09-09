// Get assignments from localStorage

let assignments =
    JSON.parse(localStorage.getItem("assignments")) || [];


// Form

const form = document.getElementById("assignmentForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const title =
        document.getElementById("title").value;

    const subject =
        document.getElementById("subject").value;

    const description =
        document.getElementById("description").value;

    const deadline =
        document.getElementById("deadline").value;

    const faculty =
        document.getElementById("faculty").value;


    const assignment = {

        id: Date.now(),

        title: title,

        subject: subject,

        description: description,

        deadline: deadline,

        faculty: faculty,

        status: "Pending"
    };


    assignments.push(assignment);

    saveAssignments();

    form.reset();

    displayAssignments();

    alert("Assignment created successfully!");
});


// Save assignments

function saveAssignments() {

    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );

}


// Display assignments

function displayAssignments(searchText = "") {

    const list =
        document.getElementById("assignmentList");

    list.innerHTML = "";


    const filteredAssignments =
        assignments.filter(function(assignment) {

            return (
                assignment.title
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                ||
                assignment.subject
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );

        });


    if (filteredAssignments.length === 0) {

        list.innerHTML =
            "<p>No assignments found.</p>";

        updateDashboard();

        return;
    }


    filteredAssignments.forEach(function(assignment) {

        const div =
            document.createElement("div");

        div.className = "assignment";


        div.innerHTML = `

            <h3>${assignment.title}</h3>

            <p>
                <strong>Subject:</strong>
                ${assignment.subject}
            </p>

            <p>
                <strong>Description:</strong>
                ${assignment.description}
            </p>

            <p>
                <strong>Faculty:</strong>
                ${assignment.faculty}
            </p>

            <p>
                <strong>Deadline:</strong>
                ${assignment.deadline}
            </p>

            <span class="status">
                ${assignment.status}
            </span>

            <br>

            <button
                class="complete-btn"
                onclick="completeAssignment(${assignment.id})">
                Mark Completed
            </button>

            <button
                class="delete-btn"
                onclick="deleteAssignment(${assignment.id})">
                Delete
            </button>

        `;


        list.appendChild(div);

    });


    updateDashboard();
}


// Mark assignment completed

function completeAssignment(id) {

    assignments =
        assignments.map(function(assignment) {

            if (assignment.id === id) {

                assignment.status = "Completed";

            }

            return assignment;

        });


    saveAssignments();

    displayAssignments();

}


// Delete assignment

function deleteAssignment(id) {

    const confirmDelete =
        confirm("Delete this assignment?");

    if (!confirmDelete) {
        return;
    }


    assignments =
        assignments.filter(function(assignment) {

            return assignment.id !== id;

        });


    saveAssignments();

    displayAssignments();

}


// Search

document
    .getElementById("search")
    .addEventListener("input", function() {

        displayAssignments(this.value);

    });


// Dashboard statistics

function updateDashboard() {

    const total =
        assignments.length;

    const completed =
        assignments.filter(function(assignment) {

            return assignment.status === "Completed";

        }).length;


    const pending =
        total - completed;


    document.getElementById(
        "totalAssignments"
    ).textContent = total;


    document.getElementById(
        "pendingAssignments"
    ).textContent = pending;


    document.getElementById(
        "completedAssignments"
    ).textContent = completed;

}


// Initial display

displayAssignments();
