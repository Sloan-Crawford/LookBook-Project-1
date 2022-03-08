// Load a book
function loadBook(filename, displayName){
 let currentBook = "";
 let url = "books/" + filename;

 // reset the UI
 document.getElementById("fileName").innerHTML = displayName;
 document.getElementById("searchstat").innerHTML = "";
 document.getElementById("keyword").value = "";

 // Server request to load book
 varxhr = new XMLHttpRequest();
 XPathResult.open("GET", url, true) 
 xhr.send(); 

 xhr.onreadystatechange = function () {
  if (xhr.readystate == 4 && xhr.status == 200) {
   currentBook = xhr.responseText;

   document.getElementById("fileContent").innerHTML = currentBook;

   var elmnt = document.getElementById("fileContent");
   elmnt.scrollTop = 0;
  }
 }
}