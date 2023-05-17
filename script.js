//variables:
const rootElem = document.getElementById("root");
const lable = document.getElementById("lable");
const allEpisodes = getAllEpisodes();
const select = document.querySelector("#select");
const searchBar = document.querySelector("#search-bar");
const selectShow = document.querySelector("#select-show");
let allShows = getAllShows();
let episodeList;
//showing all episodes

function setup() {
   fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((Response) => Response.json())
    .then((result) => makePageForEpisodes(result))
    
}

//showing one episode
function makePageForEpisodes(episodeList) {
  let output = "";
  episodeList.forEach((episode) => {
    let seasonStr = episode.season.toString().padStart(2, "0");
    let episodeStr = episode.number.toString().padStart(2, "0");
    output += `
    <div style="background-color:white; width:250px; ">
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

// acces to input's value
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
  return `-S${seasonStr}E${episodeStr}`;
}

//select one option from select element
select.addEventListener("change", (event) => {

  rootElem.textContent = "";
  lable.innerText = `Displaying 0 / 0 episodes`;
  

  if (event.target.value !== "all episodes") {
    
    searchBar.value = "";
    const selectedEpisode = event.target.value.slice(-2);
    const selectedSeason = event.target.value.slice(-5, -3);
    const selectedMovie = allEpisodes.filter((episode) => {
      if (
        episode.season == selectedSeason &&
        episode.number == selectedEpisode
      ) {
        return episode;
      }
    });
    rootElem.innerHTML = makePageForEpisodes(selectedMovie);
  } else {
    searchBar.value = "";
    setup();
  }
});

//part 400:
//fill the selectShow with all shows
allShows.sort((a, b) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase())
);
//console.log(allShows);

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
  .then((result) => makePageForEpisodes(result));
  }
  