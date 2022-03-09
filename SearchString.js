// Load a book
function loadBook(filename, displayName){
 let currentBook = "";
 let url = "books/" + filename;

 // reset the UI
 document.getElementById("fileName").innerHTML = displayName;
 document.getElementById("searchstat").innerHTML = "";
 document.getElementById("keyword").value = "";

 // Server request to load book
 var xhr = new XMLHttpRequest();
 xhr.open("GET", url, true); 
 xhr.send(); 

 xhr.onreadystatechange = function () {
  if (/* xhr.readystate == 4 && */ xhr.status == 200) {
   currentBook = xhr.responseText;
   
   // get doc info before it gets altered
   getDocStats(currentBook);

      // remove line feeds and carriage returns and replace with a <br>
   currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');

   document.getElementById("fileContent").innerHTML = currentBook;

   var elmnt = document.getElementById("fileContent");
   elmnt.scrollTop = 0;
  }
 };
}

// get the book stats
function getDocStats(fileContent) {

  var docLength = document.getElementById("docLength");
  var wordCount = document.getElementById("wordCount");
  var charCount = document.getElementById("charCount");

  let text = fileContent.toLowerCase();
  let wordArray = text.match(/\b\S+\b/g); //looks for characters between any two spaces (globally)
  let wordDictionary = {};

// filter out stop words
  var nonStopWords = [];
  nonStopWords = filterStopWords(wordArray);

// count every word in the wordArray
for(let word in nonStopWords) {
 let wordValue = nonStopWords[word];
 if (wordDictionary[wordValue] > 0) {
  wordDictionary[wordValue] += 1;
 }
 else {
  wordDictionary[wordValue] = 1
 }
}

// sort the array
let wordList = sortProperties(wordDictionary);

// return the top 5 words
var high5Words = wordList.slice(0, 6);
// return the botom 5 words
var low5Words = wordList.slice(-6,wordList.length);

// write the values to the webpage
var mostUsed = document.getElementById("mostUsed");
var leastUsed = document.getElementById("leastUsed");
ULTemplate(high5Words, mostUsed);
ULTemplate(low5Words, leastUsed);


docLength.innerText = "Document Length: " + text.length;
wordCount.innerText = "Word Count: " + wordArray.length;
} 


function ULTemplate(items, element){
 let rowTemplate = document.getElementById("template-ul-items");
 let templateHTML = rowTemplate.innerHTML;
 let resultsHTML = "";

 for(i=0; i<items.length-1; i++){
  resultsHTML += templateHTML.replace('{{val}}', items[i][0] + " : " + items[i][1] + " time(s)");
 }

 element.innerHTML = resultsHTML;
}

function sortProperties(object){
 // first convert the object to an array
 let returnArray = Object.entries(object);

 // sort the array by value
 returnArray.sort(function (first, second){
return second[1] - first[1];
 });

 return returnArray;
}

// filter out the stop words
function filterStopWords(wordArray) {
 var stopWords = getStopWords();
 var nonStopObject = {};
 var nonStopArray = [];

 for (i=0; i < stopWords.length; i++) {
  nonStopObject[stopWords[i].trim()] = true;
 }

 for (i=0; i < wordArray.length; i++) {
  word = wordArray[i].trim().toLowerCase(); // gives the current word
  if (!nonStopObject[word]){
   nonStopArray.push(word);
  }
 }

 return nonStopArray;
}

//a list of stop words we don't want to include in document info or Stats
function getStopWords() {
    return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
}

// highlights the words from the search input
function performMark() {

}