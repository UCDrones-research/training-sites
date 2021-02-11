/* ################   User Interaction   ################*/
function isBreakpoint() {
	var w = window.innerWidth;
	var h = window.innerHeight;

	if (w <= 768) {
		if (h <= 544) {
			//mobile landscape
			return 0;
		} else {
			//mobile portrait
			return 1;
		}
	} else if (h >= 544) {
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
				gridLayout.style.gridTemplateRows = "40px auto auto";
				gridLayout.style.gridTemplateColumns = "0 auto";
			} else if (x == 1) {
				//mobile landscape
				gridLayout.style.gridTemplateRows = "60px auto 0%";
				gridLayout.style.gridTemplateColumns = "60px auto 0%";
			} else if (x == 2) {
			}
		} else {
			this.innerHTML = "close";
			if (x == 0) {
				gridLayout.style.gridTemplateRows = "40px auto auto";
				gridLayout.style.gridTemplateColumns = "25% auto";
			} else if (x == 1) {
				//mobile landscape
				gridLayout.style.gridTemplateRows = "60px auto 25%";
				gridLayout.style.gridTemplateColumns = "auto 100%";
			} else if (x == 2) {
			}
		}
	});

	document.querySelectorAll(".showmore").forEach((item) => {
		item.addEventListener("click", (event) => {
			actionToggle(event);
		});
	});
};
