const InitialBookmarkId = -1;
const NumOfBookmarks = 100000;
let currentRandomBookmarkId = InitialBookmarkId;


function init(){
	getRandomBookmark();
	setRemoveButtonOnClickEvent();
	setRefreshButtonOnClickEvent();
}

async function removeBookmark(){
	let isInitialBookmarkId = currentRandomBookmarkId == InitialBookmarkId;
	if(isInitialBookmarkId){
		return;
	}

	let isConfirmed = confirm("Are you sure you want to remove this bookmark?");
	if (isConfirmed) {
		await chrome.bookmarks.remove(currentRandomBookmarkId, function() {
			refreshCurrentBookmark(); // Refresh.
		});
	}
}

function refreshCurrentBookmark(){
	getRandomBookmark(); // Refresh.
}

async function getRandomBookmark(){

	currentRandomBookmarkId = InitialBookmarkId;
	await chrome.bookmarks.getRecent(NumOfBookmarks, function(items) {

		let isInitialBookmarkId = currentRandomBookmarkId == InitialBookmarkId;
		if(isInitialBookmarkId){
			setDefaultBookmarkPageHtmlValues();
		}

		let arrSize = items.length;
		if(arrSize == 0){
			return;
		}

		let randomBookmarkIndex = Math.floor(Math.random() * arrSize);
		let item = items[randomBookmarkIndex];
		setSuccessfulBookmarkPageHtmlValues(item);

	});
}

function setRemoveButtonOnClickEvent(){
	document.getElementById("removeButton").addEventListener("click", removeBookmark);
}

function setRefreshButtonOnClickEvent(){
	document.getElementById("refreshButton").addEventListener("click", refreshCurrentBookmark);
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

	let refreshButton = document.getElementById("refreshButton");
	refreshButton.style.display = "none";

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

	let refreshButton = document.getElementById("refreshButton");
	refreshButton.style.display = "block";

	let noBookMarkText = document.getElementById("noBookMarkText");
	noBookMarkText.style.display = "none";

	currentRandomBookmarkId = item.id;
	console.log("Random bookmark is: " + JSON.stringify(item));
}

init();
