/* ################   User Interaction   ################*/
function isBreakpoint() {
	var w = window.innerWidth;
	var h = window.innerHeight;

	if (h < 544) {
		return 0;
		//mobile landscape
	} else if (w < 768) {
		return 1;
		//mobile portrait
	} else {
		//large screen
		return 2;
	}
}

function actionToggle(i) {
	var elem = i.currentTarget.id;
	var action = $("#" + i.currentTarget.id).data("open");

	console.log(elem + "\n" + action);
	if (action == "1") {
		switch (elem) {
			case "btnlayer":
				$("#content_layers").hide("slow");
				$("#expand_layers").html("unfold_less");
				break;
			case "btnlegend":
				$("#content_legend").hide("slow");
				$("#expand_legend").html("unfold_less");
				break;
			case "btnfilter":
				$("#content_filter").hide("slow");
				$("#sites-filter").hide("slow");
				$("#expand_filter").html("unfold_less");
				break;
			case "btninfo":
				$("#content_info").hide("slow");
				$("#expand_info").html("unfold_less");
				break;
			default:
				console.log("no attribute matches listener to class");
			// code block
		}
		$("#" + elem).data("open", "0");
	} else {
		//if its open close
		switch (elem) {
			case "btnlayer":
				$("#content_layers").show("slow");
				$("#expand_layers").html("unfold_more");
				break;
			case "btnlegend":
				$("#content_legend").show("slow");
				$("#expand_legend").html("unfold_more");
				break;
			case "btnfilter":
				$("#content_filter").show("slow");
				$("#sites-filter").show("slow");
				$("#expand_filter").html("unfold_more");
				break;
			case "btninfo":
				$("#content_info").show("slow");
				$("#expand_info").html("unfold_more");
				break;
			default:
				console.log("no attribute matches listener to class");
			// code block
		}
		$("#" + elem).data("open", "1");
	}
}

$(document).ready(function () {
	$("#actionmenu").bind("click", function () {
		var x = isBreakpoint();

		if (this.innerHTML == "close") {
			this.innerHTML = "menu_open";
			if (x == 0) {
				//mobile landscape
				document.getElementById("sidebarmenu").style.display = "none";
			} else if (x == 1) {
				//mobile portrait
				document.getElementById("sidebarmenu").style.display = "none";
			} else if (x == 2) {
				//desktop
				document.getElementById("sidebarmenu").style.display = "none";
			}
		} else if (this.innerHTML == "menu_open") {
			this.innerHTML = "close";
			if (x == 0) {
				//landscape
				document.getElementById("sidebarmenu").style.display = "block";
			} else if (x == 1) {
				//portrait
				document.getElementById("sidebarmenu").style.display = "block";
			} else if (x == 2) {
				document.getElementById("sidebarmenu").style.display = "block";
			}
		} else {
			this.innerHTML = "menu_open";
			document.getElementById("sidebarmenu").style.display = "none";
		}
	});

	$(".cardheader").bind("click", function (e) {
		actionToggle(e);
	});
});
