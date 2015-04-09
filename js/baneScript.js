var currentPlayer = "none";
var currentPlace = "0";
var data = '{"name": "none", "place": "0"}';
var story = null;

//INITIALIZATION
var xmlhttp = new XMLHttpRequest();
var url = "js/story.xml";
xmlhttp.open("GET", url, false);
xmlhttp.send();
story = xmlhttp.responseXML;
/**
*what happens when you press enter on the console box
*/
function inputEnter(e, input)
{
	if(e.keyCode == 13)
	{
		postOutput(input);
		alert(story.getElementsByTagName("story")[0].getElementsByTagName("1").nodeValue);
		document.getElementById("consoleInput").value = "";
	}
}

/**
* posts the given string input to the page console
*/
function postOutput(input)
{
		console = document.getElementById("consoleOutput");
		console.innerHTML = console.innerHTML + " " + input + "\n>"
		
		console.scrollTop = console.scrollHeight;
}