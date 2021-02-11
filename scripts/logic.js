/* ################   User Interaction   ################*/
function actionToggle(i) {
	console.log(i.target);
}

window.onload = function () {
	//menu button action
	var menuAction = document.getElementById("actionmenu");
	var gridLayout = document.getElementById("main");
	menuAction.addEventListener("click", function () {
		if (this.innerHTML == "close") {
			this.innerHTML = "menu_open";
			gridLayout.style.gridTemplateRows = "60px auto 0%";
		} else {
			//if its open close
			this.innerHTML = "close";
			gridLayout.style.gridTemplateRows = "60px auto 25%";
		}
	});

	var btns = document.getElementsByClassName("cardheader");

	// Add our event listeners
  window.addEventListener("click", actionToggle, false);
  
};
