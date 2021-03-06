/* ################   User Interaction   ################*/
var generalDtxt;

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

function toggleDiv($element) {

	if ($("#GeneralDiscP").html() == "General Disclaimer:")
		$("#GeneralDiscP").html(generalDtxt);
	else {
		$("#GeneralDiscP").html("General Disclaimer:");
	}

}

function actionToggle(i) {
	var elem = i.currentTarget.id;
	var action = $("#" + i.currentTarget.id).data("open");

	console.log(elem + "\n" + action);
	if (action == "1") {
		switch (elem) {
			case "btnlayer":
				$("#content_layers").hide("normal");
				$("#expand_layers").html("unfold_less");
				break;
			case "btnlegend":
				$("#content_legend").hide("normal");
				$("#expand_legend").html("unfold_less");
				break;
			case "btnfilter":
				$("#content_filter").hide("normal");
				//$("#sites-filter").hide("slow");
				$("#expand_filter").html("unfold_less");
				break;
			case "btninfo":
				$("#content_info").hide("normal");
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
				$("#content_layers").show("normal");
				$("#expand_layers").html("unfold_more");
				break;
			case "btnlegend":
				$("#content_legend").show("normal");
				$("#expand_legend").html("unfold_more");
				break;
			case "btnfilter":
				$("#content_filter").show("normal");
				$("#sites-filter").show("normal");
				
				$("#expand_filter").html("unfold_more");
				break;
			case "btninfo":
				$("#content_info").show("normal");
				$("#expand_info").html("unfold_more");
				break;
			default:
				console.log("no attribute matches listener to class");
			// code block
		}
		$("#" + elem).data("open", "1");
	}
}

function progress(timeleft, timetotal, $element) {
	$element.show('normal');
	$("#GeneralDiscP").html(generalDtxt);
	
	var progressBarWidth = timeleft * $element.width() / timetotal;
	$element.find('div').animate({ width: progressBarWidth }, 500);
    // $element.find('div').animate({ width: progressBarWidth }, 500).html(Math.floor(timeleft/60) + ":"+ timeleft%60);
	if (timeleft > 0) {
		setTimeout(function () {
			
			progress(timeleft - 1, timetotal, $element);
			
		}, 1000);
	} else if (timeleft == 0) {
		$element.hide('normal');
		$("#GeneralDiscP").html("General Disclaimer:");
		
	}
};

$(document).ready(function () {

	//load general diclaimer
	progress(20, 20, $('#progressBar'));

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

	$("#generaldiscdiv").bind("click", function (e) {
		toggleDiv(e);
	});

	$.ajax({
		url : "generaldisclaimer.txt",
		dataType: "text",
		success : function (data) {
			generalDtxt = data;
		}
	});


});
