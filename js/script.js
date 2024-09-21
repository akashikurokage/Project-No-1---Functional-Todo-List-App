//GLOBAL VARIABLES

//Theme Switcher Variables
let darkmode = localStorage.getItem("dark-mode");
const themeBtn = document.getElementById("theme-btn");

//Variables for Modal Box: "If the user clicks an Add Task Button without inputting single character."
const modalBox = document.querySelector(".notif-modalBox");
const confirmBtn = document.querySelector(".modal-confirm");

//Variables for Add Task function
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("task-adder");

//Modal icon for Empty In Progress Tasklist 
const emptyInProgressModal = document.querySelector(".empty-inProgressTask")

//Modal icon for Empty Completed Tasklist 
const emptyCompletedModal = document.querySelector(".empty-completedTask")

//In Progress and Completed tasklist, and it's corresponsive button Variables.
const inProgressTasklist = document.querySelector(".inProgress-tasklist");
const completedTasklist = document.querySelector(".completed-tasklist");

const inProgressTaskItems = document.querySelector(".inProgress-tasks");
const completedTaskItems = document.querySelector(".completed-tasks");

const completedTasklistBtn = document.querySelector(".completed-btn");
const inProgressTasklistBtn = document.querySelector(".inprogress-btn");


/****************************************************************************/

/*LOADING BOTH TASKLISTS FUNCTION: Refer the Line No. # for localStorage modification*/
loadInProgressTaskItem();


/****************************************************************************/

/*ADDING A TASK FUNCTION*/
let newTask; //Declaring undefined Task Variable for later declaration check[JS Line No: 50].

function addTask(){
	if(taskInput.value === ""){
		modalBox.classList.add("show"); //This modal error box will appear if the user clicks the "Add Task" button without inputting any single character.
	}

	else{
		inProgressTasklist.style.display = "block"; //Displays "In Progress" Tasklist.
		newTask = document.createElement("li"); //Creates a single task inside the "li" element.
		
		
		const taskItems = document.createElement("span"); //Creates the "span" element CSS styles that is inside of "li" element[JS line No: 50] for added Task Items.
		taskItems.classList.add("side-1"); //Adding a "side-1" class tag to the created span.
		taskItems.innerHTML = `<i class="ri-checkbox-blank-circle-line"></i>${taskInput.value}`; //Displaying Input task value + Checkbox Icon inside of created "span" element with a class of "side-1".

		
		const taskBtns = document.createElement("span"); //Creates another "span" element that is inside of created "li" element[JS line No: 50] for Delete button
		taskBtns.classList.add("side-2"); //Adding a "side-2" class tag to the another created span.
		taskBtns.innerHTML = `<i class="ri-delete-bin-5-fill"></i>`; //Displaying Delete Button styles that is inside of another created "span" element with a class name of "side-2".

		
		//Appending the Inputted task and Styles inside the "ul" INPROGRESS tasklist
		newTask.appendChild(taskItems); //Appending the created Task Item[JS Line No: 53] inside the created "li" element[JS Line No: 50].
		newTask.appendChild(taskBtns); //Appending the created Delete Button[JS Line No: 58] inside the created "li" element[JS Line No: 50].
		
		inProgressTaskItems.appendChild(newTask); //Appending the created "li" element[JS Line No: 50] along with its children inside the In Progress Tasklist Items[JS Variable Line No: 25].
 
		
		emptyInProgressModal.style.display = "none"; //Hides the Empty modal box for In Progress Tasklist if the tasklist contains a task.

		//Hides the Completed Tasklist which functions as redirecting back to the "In Progress" Tasklist if the user attempts to add a task after the user clicks "Completed Tasklist" button.
		emptyCompletedModal.style.display = "none";
		completedTasklist.style.display = "none";
	}
	
	taskInput.value = ""; //Removes the Inputted task inside the input bar.
	saveInProgressTaskItem(); /*LOADING BOTH TASKLISTS FUNCTION: Refer the Line No. # for localStorage modification*/
 }



/****************************************************************************/

/*ADDING A TASK USING "ENTER KEY BUTTON"*/
taskInput.addEventListener("keypress", function(e){
	if(e.key === "Enter"){
		e.preventDefault();
		addTaskBtn.click();
	}
});

/****************************************************************************/


//ERROR MODAL BOX MESSAGE: This only triggers when the user clicks an Add Task Button without inputting any single character inside the input bar.
confirmBtn.addEventListener("click", function(){
	modalBox.classList.remove("show"); //Add a "show" class to the modalBox variable[JS Line No: 8].
	
	 taskInput.classList.add("inputError"); //Adds the class "inputError"[CSS Line No: 124] to run the animation. 
	setTimeout(() => {
        taskInput.classList.remove("inputError");//Removes the class "inputError" to stop the animation. 
    }, 2000); //This is Box Shadow error Animation timing.
});

/****************************************************************************/


/*FUNCTION FOR NAVIGATING BETWEEN IN PROGRESS & COMPLETED TASKLIST*/
//1. In Progress Tasklist:
function showInProgressTasklist(){
	inProgressTasklist.style.display = "block"; //Displays the "In Progress" Tasklist[JS Line No: 22].
	completedTasklist.style.display = "none"; //Hides the "Completed" Tasklist[JS Line No: 23].
	emptyCompletedModal.style.display = "none"; //Hides the Empty Tasklist Modal Message for "Completed" Tasklist[JS Line No: 23].
	
	emptyInProgressTasklist(); //Calling "In Progress" Tasklist Function value[JS Line No: 133].
}

//2. Completed Tasklist:
function showCompletedTasklist(){
	completedTasklist.style.display = "block"; //Displays the "Completed" Tasklist[JS Line No: 22].
	inProgressTasklist.style.display = "none"; //Hides the "In Progress" Tasklist[JS Line No: 22].
	emptyInProgressModal.style.display = "none"; //Hides the Empty Tasklist Modal Message for "In Progress" Tasklist[JS Line No: 23].
	
	emptyCompletedTasklist(); //Calling "Completed" Tasklist Function value[JS Line No: 149].
}

/****************************************************************************/


/*TASK DETECTOR FUNCTION: BASIC INTERACTIVITY*/
//1. Empty "In Progress" Tasklist:
function emptyInProgressTasklist(){
	if (inProgressTaskItems.children.length === 0){
		emptyInProgressModal.style.display = "block";
		inProgressTasklist.style.display = "none";

	}

	else{
		emptyInProgressModal.style.display = "none";
		inProgressTasklist.style.display = "block";
	}

}


//2. Empty "Completed" Tasklist:
function emptyCompletedTasklist(){
	if (completedTaskItems.children.length === 0){
		emptyCompletedModal.style.display = "block";
		completedTasklist.style.display = "none";
	}

	else{
		emptyCompletedModal.style.display = "none";
		completedTasklist.style.display = "block";
	}
}



/****************************************************************************/


/*EVENT LISTENER BUTTONS FOR IN PROGRESS & COMPLETED TASKLIST BUTTONS*/
//1. In Progress Tasklist Button:
inProgressTasklistBtn.addEventListener("click", showInProgressTasklist);
inProgressTasklistBtn.click();


//2. Completed Tasklist Button:
completedTasklistBtn.addEventListener("click", showCompletedTasklist);



//MARKING A TASK AS DONE AND MOVE IT TO THE COMPLETED TASKLIST.
inProgressTasklist.addEventListener("click", function(e){
	if(e.target.classList.contains("ri-checkbox-blank-circle-line")){
		const oldTaskItem = e.target.closest("li");

		if(oldTaskItem){
			oldTaskItem.classList.toggle("checked");
			e.target.classList.remove("ri-checkbox-blank-circle-line");
			e.target.classList.add("ri-checkbox-circle-fill");
			

			if(oldTaskItem.classList.contains("checked")){
				completedTaskItems.appendChild(oldTaskItem);
				emptyInProgressTasklist();
			}
		}
	}

	else if(e.target.classList.contains("ri-delete-bin-5-fill")){
		const oldTaskItem = e.target.closest("li");
		oldTaskItem.remove();
		emptyInProgressTasklist();
	}
	
	saveInProgressTaskItem();
});


/****************************************************************************/


//MARKING A TASK AS UNDONE AND MOVE IT TO THE INPROGRESS TASKLIST.
completedTasklist.addEventListener("click", function(e){
	if(e.target.classList.contains("ri-checkbox-circle-fill")){
		const completedTask = e.target.closest("li");

		if(completedTask){
			completedTask.classList.remove("checked");
			e.target.classList.remove("ri-checkbox-circle-fill");
			e.target.classList.add("ri-checkbox-blank-circle-line");

			inProgressTaskItems.appendChild(completedTask);
			emptyCompletedTasklist();
		}
	}

	else if(e.target.classList.contains("ri-delete-bin-5-fill")){
		const completedTask = e.target.closest("li");
		completedTask.remove();
		emptyCompletedTasklist();
	}

	saveInProgressTaskItem();
}); 

/****************************************************************************/



/*LOCAL STORAGE FUNCTIONS*/

//1. SAVING & LOADING TASK ITEM FOR BOTH TASKLIST
function saveInProgressTaskItem(){
	localStorage.setItem("dataItem", inProgressTaskItems.innerHTML);
	localStorage.setItem("dataItem1", completedTaskItems.innerHTML);
}

function loadInProgressTaskItem(){
	inProgressTaskItems.innerHTML = localStorage.getItem("dataItem");
	completedTaskItems.innerHTML = localStorage.getItem("dataItem1");
}


//2. SAVE AND LOAD CURRENT THEME 
const enableDarkmode = () => {
	themeBtn.innerHTML = `<i class="ri-sun-fill"></i>Light Mode`;
	document.body.classList.add("dark-mode");
	localStorage.setItem("dark-mode", "active");
}


const disableDarkmode = () => {
	themeBtn.innerHTML = `<i class="ri-moon-clear-line"></i>Dark Mode`;
	document.body.classList.remove("dark-mode");
	localStorage.setItem("dark-mode", null);
}

if(darkmode === "active") enableDarkmode();

themeBtn.addEventListener("click", () => {
	darkmode = localStorage.getItem("dark-mode");
	
	if (darkmode !== "active"){
		enableDarkmode();
	}
	else{
		disableDarkmode();
	}
});