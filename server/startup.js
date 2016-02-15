Meteor.startup(function () {
  if ( ! Tag.collection.findOne()) {
    var initTags = [
      {text: "Accounting"},
      {text: "Agriculture"},
      {text: "Architecture"},
      {text: "Aviation"},
      {text: "Biology"},
      {text: "Business"},
      {text: "Chemistry"},
      {text: "Communication"},
      {text: "Computer Science"},
      {text: "Cooking"},
      {text: "Dance"},
      {text: "Design"},
      {text: "Economics"},
      {text: "Education"},
      {text: "Engineering"},
      {text: "Finance"},
      {text: "Game Theory"},
      {text: "Geology"},
      {text: "History"},
      {text: "Linguistics"},
      {text: "Law"},
      {text: "Literature"},
      {text: "Management"},
      {text: "Marketing"},
      {text: "Mathematics"},
      {text: "Philosophy"},
      {text: "Political Science"},
      {text: "Psychology"},
      {text: "Public Relations"},
      {text: "Sociology"},
      {text: "Technology"},
      {text: "Theology"},
      {text: "Logistics"},
      {text: "Video Game Development"},
      {text: "Web Design"},
      {text: "Web Development"},
    ];
    initTags.forEach(function(entry) {
      Tag.collection.insert(entry);
    });
  }
});
