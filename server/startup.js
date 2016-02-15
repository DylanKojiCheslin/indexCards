Meteor.startup(function () {
  if ( ! Tag.collection.findOne()) {
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
      {text: "political Science"},
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
      Tag.collection.insert(entry);
    });
  }
});
