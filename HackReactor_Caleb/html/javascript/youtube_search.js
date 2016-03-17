// This function will display js value on HTML
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

// This function will call js client library
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// This will call YouTube API 
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
    search();
}

// I will call 'snippet' to see the title and description  of the youtube video
function search() {
    var request = gapi.client.youtube.search.list({
        part: 'snippet'        
    });    
    // sending request to API server to call on search response
    request.execute(onItemList);
    request.execute(onTitleSearch);
    request.execute(onDescriptionSearch);
    request.execute(channelTitleSearch);
}
    
//This function gets every list from response.    
function onItemList(response){
        showResponse("<br>All data from YouTube SDK: <br><br>");
        showResponse(response);
}


// This function gets titles for every item
// And also putting titles into array
function onTitleSearch(response) {
    var titles = '';  
    var titlesArray = [];
    //I created empty array where I can store string in side. 
   //I am trying to create for loop that goes every title in item then  push only title into itlesArray  
    for (var i = 0; i < response.items.length; i++) {
        titles += response.items[i].snippet.title;
        titlesArray.push(response.items[i].snippet.title);
        titles += "<br />";
        
    }
    
    showResponse("<br>Titles<br>");
    showResponse(titles);
    showResponse(titlesArray);
    showResponse("<br>");
}

// This function gets description for every item
function onDescriptionSearch(response) {
    var description = '';    //create empty string
    for (var i = 0; i < response.items.length; i++) {
        description += response.items[i].snippet.description;
        description += "<br />";
    }

    showResponse("<br>Description data: <br><br>");
    showResponse(description +"<br>");
    splitString(description);
}

//Split description string  
function splitString(description) {
    var arrayOfStrings = description.split(' '); 
// I'm strying to split description by space('  ') 
//Then putting every element into array 
    showResponse("<br>Split string data: <br><br>");
    showResponse('The original string is: <br>"' + description + '"<br>');
    showResponse('The separator is <br>"' + ' ' +'" <br>');
    showResponse('The array has ' + arrayOfStrings.length + ' elements: ' + arrayOfStrings.join(' / '));
    showResponse(arrayOfStrings);
}

function channelTitleSearch(response) {
    var arrayOfTitle = ''; 
    for(var i = 0; i <response.items.length; i++) {
        arrayOfTitle += response.items[i].snippet.channelTitle;
        arrayOfTitle += "<br/>";
    }
    showResponse("<br> Channel Title Data: <br><br>");
    showResponse(arrayOfTitle);
}

