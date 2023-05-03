//variables:
const rootElem = document.getElementById("root");
const lable = document.getElementById("lable");
const allEpisodes = getAllEpisodes();
const select = document.querySelector("#select");



//showing all episodes
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
//showing one episode
function makePageForEpisodes(episodeList) {
   let output="";
  episodeList.forEach((episode) => {
    let seasonStr = episode.season.toString().padStart(2, "0");
    let episodeStr = episode.number.toString().padStart(2, "0");
    output += `
    <div style="background-color:white; width:250px; higth:300px;">
    <h1 style="color:black;">${episode.name} - S${seasonStr}E${episodeStr}</h1>
    <img src="${episode.image.medium}"></img>
    <div><p>${episode.summary}</p></div>
    </div>
    `;
    
    return output;
  });


  const rootElem = document.getElementById("root");
  rootElem.innerHTML = output;
  let episodeNumber = document.createElement("div");
  episodeNumber.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(episodeNumber);
}

window.onload = setup();



// acces to input's value
const input = document.querySelector("#search-bar");
input.addEventListener("keyup", function(e) {
  let result = "";

  const inputValue = e.target.value;
  const allEpisodes = getAllEpisodes();
  let inputValueInsensitive = new RegExp(inputValue, "i");
  let selectedEpisodes = allEpisodes.filter((episode) => {
    if (
      episode.name.match(inputValueInsensitive) !== null ||
      episode.summary.match(inputValueInsensitive) !== null
    ) {
      return episode;
    }
  });

    result = makePageForEpisodes(selectedEpisodes); 
  
  lable.innerText = `Displaying  ${selectedEpisodes.length}/${allEpisodes.length}  episodes`;
});

 //fill the select element with all episoses 
allEpisodes.forEach((episode) => {
  let option = document.createElement("option");
  let seasonEpisodeNumber = getSeasonEpisodeNumber(episode);
  option.innerText = `${episode.name} ${seasonEpisodeNumber}`;
  select.appendChild(option);
});
 
 

 //get seseon and episode number from all episodes
 function getSeasonEpisodeNumber(episode) {
   let seasonStr = episode.season.toString().padStart(2, "0");
   let episodeStr = episode.number.toString().padStart(2, "0");
   return `- S${seasonStr}E${episodeStr}`;
 }

 //select one option from select element
 select.addEventListener("change", (event) => {
   
   rootElem.textContent = "";
   rootElem.textContent = `You like ${event.target.value}`;
   
 });
