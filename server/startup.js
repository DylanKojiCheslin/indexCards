Meteor.startup(function () {
  //if there are no tags make some
  if (Tag.isEmpty()) {
    console.log("generating example Tags");
    var initTags = [
      {text: "accounting"},
      {text: "agriculture"},
      {text: "architecture"},
      {text: "aviation"},
      {text: "biology"},
      {text: "business"},
      {text: "chemistry"},
      {text: "communication"},
      {text: "computer science"},
      {text: "cooking"},
      {text: "dance"},
      {text: "design"},
      {text: "economics"},
      {text: "education"},
      {text: "engineering"},
      {text: "finance"},
      {text: "game Theory"},
      {text: "geology"},
      {text: "history"},
      {text: "linguistics"},
      {text: "law"},
      {text: "literature"},
      {text: "management"},
      {text: "marketing"},
      {text: "mathematics"},
      {text: "philosophy"},
      {text: "political science"},
      {text: "psychology"},
      {text: "public Relations"},
      {text: "sociology"},
      {text: "technology"},
      {text: "theology"},
      {text: "logistics"},
      {text: "video game development"},
      {text: "web design"},
      {text: "web development"},
    ];
    initTags.forEach(function(entry) {
      var tag = Tag.build(entry);
      tag.save();
    });
  }

//find philosophy
var tagExample = Tag.find({text: "psychology"});

  if (Card.isEmpty()) {
    console.log("generating example Tags");

    var initCards = [
      {
        question:"how you do that?",
        answer:"skills",
        difficulty:1,
        //change to use the id of a user who is created druing startup
        createdBy:"507f191e810c19729de860ea",
      },
      {
        question:"why you do that?",
        answer:"because",
        difficulty:1,
        //change to use the id of a user who is created druing startup
        createdBy:"507f191e810c19729de860ea",
      },
      {
        question:"do it again?",
        answer:"probly",
        difficulty:1,
        //change to use the id of a user who is created druing startup
        createdBy:"507f191e810c19729de860ea",
      },
    ];
    initCards.forEach(function(entry) {
      var card = Card.build(entry);
      entry.tagID = tagExample.id;
      card.save()
    })
  }
});
