//variables:
const rootElem = document.getElementById("root");
const lable = document.getElementById("lable");


function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
   let output="";
  episodeList.forEach((episode) => {
    
    output += `
    <div style="background-color:white; width:250px; higth:300px;">
    <h1 style="color:black;">${episode.name}</h1>
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
}

window.onload = setup();



// acces to input's value
const input = document.querySelector("#search-bar");
input.addEventListener("input", function () {
  let result = "";
  const inputValue = input.value;
  const allEpisodes = getAllEpisodes();
  
  let selectedEpisodes = allEpisodes.filter((episode) => {
    if (
      episode.name.includes(inputValue) ||
      episode.summary.includes(inputValue)
    ) {
     return episode; 
    }
  });
  
rootElem.innerText = "";
selectedEpisodes.forEach((selectEpisode)=>{

result += `
    <div style="background-color:white; width:250px; higth:300px;">
    <h1 style="color:black;">${selectEpisode.name}</h1>
    <img src="${selectEpisode.image.medium}"></img>
    <div><p>${selectEpisode.summary}</p></div>
    </div>
    `;
})
 rootElem.innerHTML = result;
lable.innerText = `Displaying  ${selectedEpisodes.length}/${allEpisodes.length}  episodes`;
   
});

 