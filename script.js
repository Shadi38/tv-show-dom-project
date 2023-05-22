//variables:
const rootElem = document.getElementById("root");
const showRoot = document.getElementById("show-root");
const lable = document.getElementById("lable");
const allEpisodes = getAllEpisodes();
const select = document.querySelector("#select");
const searchBar = document.querySelector("#search-bar");
const selectShow = document.querySelector("#select-show");
const button = document.querySelector("#btn");
let allShows = getAllShows();
let episodeList;
let allFetchEpisodes ='';


//showing all episodes
 function setup() {
   makePageForShow(allShows);
      
 }

//making page for each episode
function makePageForEpisodes(episodeList) {
  showRoot.innerText="";
  let output = "";
  episodeList.forEach((episode) => {
    let seasonStr = episode.season.toString().padStart(2, "0");
    let episodeStr = episode.number.toString().padStart(2, "0");
    output += `
    <div style="background-color:white; width:250px;border-radius:4px;">
    <h1 style="color:black;">${episode.name} - S${seasonStr}E${episodeStr}</h1>
    <img src="${episode.image.medium}"></img>
    <div><p>${episode.summary}</p></div>
    </div>
    `;
  });
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = output;
  let episodeNumber = document.createElement("div");
  episodeNumber.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(episodeNumber);
  return output;
}

window.onload = setup();

// acsses to input's value
const input = document.querySelector("#search-bar");
input.addEventListener("keyup", function (e) {
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

//part 300:
//fill the select box with all episoses
function fillSelectBox(allEpisodes){
allEpisodes.forEach((episode) => {
  let option = document.createElement("option");
  let seasonEpisodeNumber = getSeasonEpisodeNumber(episode);
  option.innerText = `${episode.name} ${seasonEpisodeNumber}`;
  select.appendChild(option);
})
};
//get seseon and episode number from all episodes
function getSeasonEpisodeNumber(episode) {
  let seasonStr = episode.season.toString().padStart(2, "0");
  let episodeStr = episode.number.toString().padStart(2, "0");
  return `-S${seasonStr}E${episodeStr}`;
}

//select one option from select box
select.addEventListener("change", (event) => {
  rootElem.textContent = "";
  showRoot.innerHTML = ""; 
  lable.innerText = `Displaying 0 / 0 episodes`;
    searchBar.value = "";
    const selectedEpisode = event.target.value.slice(-2);
    const selectedSeason = event.target.value.slice(-5, -3);
    const selectedMovie = allFetchEpisodes.filter((episode) => {
      if (
        episode.season == selectedSeason &&
        episode.number == selectedEpisode
      ) {
        return episode;
      }
    });
    rootElem.innerHTML = makePageForEpisodes(selectedMovie);
});


//level 400:
//fill the selectShow with all shows
allShows.sort((a, b) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase())
);
allShows.forEach((show) => {
let option = document.createElement("option");
option.innerText = `${show.name}`;
selectShow.appendChild(option);
})


//choose episodes for selected show
selectShow.addEventListener("change", (event) => {
  rootElem.textContent = "";
  lable.innerText = `Displaying 0 / 0 episodes`;
  let showName = event.target.value;

// Select the show object that matches the selected name
  let showSelected = allShows.find((show) => show.name === showName);
  let showId = showSelected.id;

//getting episodes that mach with selected show
fetchEpisodesForShow(showId);
})

function fetchEpisodesForShow(showId){ 
fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
  .then((Response) => Response.json())
  .then((result) => {
    makePageForEpisodes(result)
    select.innerText="";
    //fill select box to show all episodes ralated to selected show by select show 
   fillSelectBox(result);
   allFetchEpisodes = result
  })
  }

  //level 500:
  //make a format in html for shows
  function makePageForShow(){
    let output = "";
    allShows.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
    allShows.forEach(show => {
    
 output += `
    <div id="showPage">  
      
             <div id="divShowImg" >
               <img src="${show.image !== null ? show.image.medium : ""}"> 
             </div>
             <div id="divShowSummary" >
               <h1 style="text-align:center;">${show.name}</h1>
               <p>${show.summary}</p>
             </div>
             <div id="divShowUl">
               <ul>
                 <li">rated:${show.rating.average}</li>
                 <li">Genres:${show.genres}</li>
                 <li>Status:${show.status}</li>
                 <li>Runtime:${show.runtime}</li>
               </ul>
             </div>
       
    </div>    
      
      `;
    });
    showRoot.innerHTML = output;
  }

  //addEventListener for button to access all shows
  button.addEventListener("click",(event)=>{
   event.preventDefault();
   rootElem.textContent = "";
   input.value = "";
   makePageForShow(allShows);
  })

