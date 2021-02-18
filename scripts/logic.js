/* ################   User Interaction   ################*/
function isBreakpoint() {
	var w = window.innerWidth;
	var h = window.innerHeight;

	if (h <= 544) {
		return 0;
		//mobile landscape
	} else if (w <= 768) {
		return 1;
		//mobile portrait
	} else {
		//large screen
		return 2;
	}
}

function actionToggle(i) {
	if (i.target.innerHTML == "unfold_more") {
		i.target.innerHTML = "unfold_less";
		switch (i.target.id) {
			case "expand_layers":
				document.getElementById("content_layers").style.display = "inherit";
				break;
			case "expand_legend":
				document.getElementById("content_legend").style.display = "inherit";
				break;
			case "expand_filter":
				document.getElementById("content_filter").style.display = "inherit";
				document.getElementById("sites-filter").style.display = "inherit";

				break;
			case "expand_info":
				document.getElementById("content_info").style.display = "inherit";
				break;
			default:
				console.log("no attribute matches listener to class");
			// code block
		}
	} else {
		//if its open close
		i.target.innerHTML = "unfold_more";
		switch (i.target.id) {
			case "expand_layers":
				document.getElementById("content_layers").style.display = "none";
				break;
			case "expand_legend":
				document.getElementById("content_legend").style.display = "none";
				break;
			case "expand_filter":
				document.getElementById("content_filter").style.display = "none";
				document.getElementById("sites-filter").style.display = "none";
				break;
			case "expand_info":
				document.getElementById("content_info").style.display = "none";
				break;
			default:
				console.log("no attribute matches listener to class");
			// code block
		}
	}
}

window.onload = function () {
	//menu button action
	var menuAction = document.getElementById("actionmenu");
	var gridLayout = document.getElementById("main");
	menuAction.addEventListener("click", function () {
		var x = isBreakpoint();
		console.log(x);
		if (this.innerHTML == "close") {
			this.innerHTML = "menu_open";
			if (x == 0) {
				//mobile landscape
				gridLayout.style.gridTemplateRows = "40px auto 0%";
				gridLayout.style.gridTemplateColumns = "0 auto";
			} else if (x == 1) {
				//mobile portrait
				gridLayout.style.gridTemplateRows = "60px auto 0%";
				gridLayout.style.gridTemplateColumns = "0% auto";
			} else if (x == 2) {
				//desktop
				gridLayout.style.gridTemplateRows = "60px auto 0%";
				gridLayout.style.gridTemplateColumns = "0% auto";
			}
		} else {
			this.innerHTML = "close";
			if (x == 0) {
				//landscape
				gridLayout.style.gridTemplateRows = "40px auto 0%";
				gridLayout.style.gridTemplateColumns = "25% auto";
			} else if (x == 1) {
				//portrait
				gridLayout.style.gridTemplateRows = "60px auto 35%";
				gridLayout.style.gridTemplateColumns = "0% auto";
			} else if (x == 2) {
				gridLayout.style.gridTemplateRows = "60px auto 25% 0%";
				gridLayout.style.gridTemplateColumns = "auto 80%";
			}
		}
	});

	document.querySelectorAll(".showmore").forEach((item) => {
		item.addEventListener("click", (event) => {
			actionToggle(event);
		});
	});
};
