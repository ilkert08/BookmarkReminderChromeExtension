async function removeBookmark(id){
	console.log("Bookmark with id: " + id + "removed.");
}

async function GetRandomBookmark(){


	let numOfBookmarks = 1000;
	let randomBookmark = await chrome.bookmarks.getRecent(numOfBookmarks, function(items) {
		let arrSize = items.length;
		let randomBookmarkIndex = Math.floor(Math.random() * arrSize);
		let item = items[randomBookmarkIndex];
		let link = document.getElementById("randomLink");
		link.setAttribute("href", item.url);
		link.innerText = item.url
		console.log("Random bookmark randomP url is: " + item.url);
		});
	console.log("randomBookmark: " + randomBookmark);



}

GetRandomBookmark();

