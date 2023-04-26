//You can edit ALL of the code here
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
