const InitialBookmarkId = -1;
const NumOfBookmarks = 100000;
let currentRandomBookmarkId = InitialBookmarkId;


function init(){
	getRandomBookmark();
	setButtonOnClickEvent();
}

async function removeBookmark(){
	console.log("Bookmark to delete id: " + currentRandomBookmarkId);

	let isInitialBookmarkId = currentRandomBookmarkId == InitialBookmarkId;
	if(isInitialBookmarkId){
		return;
	}

	let isConfirmed = confirm("Are you sure you want to remove this bookmark?");
	if (isConfirmed) {
		await chrome.bookmarks.remove(currentRandomBookmarkId, function() {
			getRandomBookmark(); // Refresh.
			console.log("Bookmark with id: " + currentRandomBookmarkId + " has been removed.");
		});
	}
}

async function getRandomBookmark(){

	currentRandomBookmarkId = InitialBookmarkId;
	let randomBookmark = await chrome.bookmarks.getRecent(NumOfBookmarks, function(items) {

		let isInitialBookmarkId = currentRandomBookmarkId == InitialBookmarkId;
		if(isInitialBookmarkId){
			setDefaultBookmarkPageHtmlValues();
		}

		let arrSize = items.length;
		if(arrSize == 0){
			return;
		}

		let randomBookmarkIndex = Math.floor(Math.random() * arrSize);
		console.log("x1");
		let item = items[randomBookmarkIndex];
		console.log("x2");
		setSuccessfulBookmarkPageHtmlValues(item);

	});
	console.log("randomBookmark: " + randomBookmark);
}

function setButtonOnClickEvent(){
	document.getElementById("removeButton").addEventListener("click", removeBookmark);
}

function setDefaultBookmarkPageHtmlValues(){

	let url = document.getElementById("randomBookmarkUrl");
	url.style.display = "none";

	let title = document.getElementById("randomBookmarkTitle");
	title.style.display = "none";

	let titleText = document.getElementById("randomBookmarkTitleText");
	titleText.style.display = "none";

	let urlText = document.getElementById("randomBookmarkUrlText");
	urlText.style.display = "none";

	let removeButtonText = document.getElementById("removeButtonText");
	removeButtonText.style.display = "none";

	let removeButton = document.getElementById("removeButton");
	removeButton.style.display = "none";

	let noBookMarkText = document.getElementById("noBookMarkText");
	noBookMarkText.style.display = "block";
}

function setSuccessfulBookmarkPageHtmlValues(item){

	let url = document.getElementById("randomBookmarkUrl");
	url.setAttribute("href", item.url);
	url.innerText = item.url;
	url.style.display = "block";

	let title = document.getElementById("randomBookmarkTitle");
	title.setAttribute("href", item.url);
	title.innerText = item.title;
	title.style.display = "block";

	let titleText = document.getElementById("randomBookmarkTitleText");
	titleText.style.display = "block";

	let urlText = document.getElementById("randomBookmarkUrlText");
	urlText.style.display = "block";

	let removeButton = document.getElementById("removeButton");
	removeButton.style.display = "block";

	let removeButtonText = document.getElementById("removeButtonText");
	removeButtonText.style.display = "block";


	let noBookMarkText = document.getElementById("noBookMarkText");
	noBookMarkText.style.display = "none";

	currentRandomBookmarkId = item.id;
	console.log("Random bookmark is: " + JSON.stringify(item));
}

init();
