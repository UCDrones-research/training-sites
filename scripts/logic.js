/* ################   User Interaction   ################*/
function actionToggle(i) {
	if (i.target.innerHTML == "unfold_more") {
		i.target.innerHTML = "unfold_less";
		switch(i.target.id) {
			case 'expand_layers':
				document.getElementById("content_layers").style.display = 'inherit';
			  break;
			case 'expand_legend':
				document.getElementById("content_legend").style.display = 'inherit';
				break;
			case 'expand_filter':
				document.getElementById("content_filter").style.display = 'inherit';
				document.getElementById("sites-filter").style.display = 'inherit';

				break;
			case 'expand_info':
				document.getElementById("content_info").style.display = 'inherit';
				break;
			default:
				console.log("no attribute matches listener to class");
			  // code block
		  }
	} else {
		//if its open close
		i.target.innerHTML = "unfold_more";
		switch(i.target.id) {
			case 'expand_layers':
				document.getElementById("content_layers").style.display = 'none';
			  break;
			case 'expand_legend':
				document.getElementById("content_legend").style.display = 'none';
				break;
			case 'expand_filter':
				document.getElementById("content_filter").style.display = 'none';
				document.getElementById("sites-filter").style.display = 'none';
				break;
			case 'expand_info':
				document.getElementById("content_info").style.display = 'none';
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
		if (this.innerHTML == "close") {
			this.innerHTML = "menu_open";
			gridLayout.style.gridTemplateRows = "60px auto 0%";
			dri
		} else {
			//if its open close
			this.innerHTML = "close";
			gridLayout.style.gridTemplateRows = "60px auto 25%";
		}
	});

	document.querySelectorAll('.showmore').forEach(item => {
		item.addEventListener('click', event => {
			actionToggle(event);
		})
	  })
  
};
