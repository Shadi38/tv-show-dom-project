function matchesSearchFilter(episode, searchString) {
   return true; 
}

test("search filter result matches with one word",function(){
let episode = {
  id: 4952,
  url: "http://www.tvmaze.com/episodes/4952/game-of-thrones-1x01-winter-is-coming",
  name: "Winter is Coming",
  season: 1,
  number: 1,
  airdate: "2011-04-17",
  airtime: "21:00",
  airstamp: "2011-04-18T01:00:00+00:00",
  runtime: 60,
  image: {
    medium:
      "http://static.tvmaze.com/uploads/images/medium_landscape/1/2668.jpg",
    original:
      "http://static.tvmaze.com/uploads/images/original_untouched/1/2668.jpg",
  },
  summary:
    "<p>Lord Eddard Stark, ruler of the North, is summoned to court by his old friend, King Robert Baratheon, to serve as the King's Hand. Eddard reluctantly agrees after learning of a possible threat to the King's life. Eddard's bastard son Jon Snow must make a painful decision about his own future, while in the distant east Viserys Targaryen plots to reclaim his father's throne, usurped by Robert, by selling his sister in marriage.</p>",
  _links: {
    self: {
      href: "http://api.tvmaze.com/episodes/4952",
    },
  },
};

expect(matchesSearchFilter(episode, "winter")).toBe(true)

});





Test("matchesSeaerchFilter icluding space", function () {
  let episode = {
      id: 4952,
      url:
        "http://www.tvmaze.com/episodes/4952/game-of-thrones-1x01-winter-is-coming",
      name: "Winter is Coming",
      season: 1,
      number: 1,
      airdate: "2011-04-17",
      airtime: "21:00",
      airstamp: "2011-04-18T01:00:00+00:00",
      runtime: 60,
      image: {
        medium:
          "http://static.tvmaze.com/uploads/images/medium_landscape/1/2668.jpg",
        original:
          "http://static.tvmaze.com/uploads/images/original_untouched/1/2668.jpg",
      },
      summary:
        "<p>Lord Eddard Stark, ruler of the North, is summoned to court by his old friend, King Robert Baratheon, to serve as the King's Hand. Eddard reluctantly agrees after learning of a possible threat to the King's life. Eddard's bastard son Jon Snow must make a painful decision about his own future, while in the distant east Viserys Targaryen plots to reclaim his father's throne, usurped by Robert, by selling his sister in marriage.</p>",
      _links: {
        self: {
          href: "http://api.tvmaze.com/episodes/4952",
        },
      },
    },

  expect(matchesSeaerchFilter(episode, "winter is coming")).toBe(true);
});