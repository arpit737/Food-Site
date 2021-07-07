//get quotes from api
const quoteContainer=document.getElementById('quote-container')
const quoteText=document.getElementById('quote')
const authorText=document.getElementById('author')
const twitterBtn=document.getElementById('twitter')
const newQuotebtn=document.getElementById('new-quote')
const loader=document.getElementById('loader')
//show lloading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading
function complete () {
    quoteContainer.hidden= false;
    loader.hidden = true;
}
let apiQuotes = [];
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author is blank and replacde it with unkbown 
    if(!quote.author){
        authorText.textContent='Unknown';
    }
    else{
        authorText.textContent=quote.author;
    }
    
   //check quote length to determmine the styling
   if(quote.text.length>20){
       quoteText.classList.add('long-quote');
   }
   else{
    quoteText.classList.remove('long-quote');
   }
   //set the code and hide the loader 
    quoteText.textContent=quote.text;
    complete();
}
async function getQuotes () {
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
       //error

    }
}
//tweet a quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');  
}
//event listeners
newQuotebtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);
 getQuotes();
