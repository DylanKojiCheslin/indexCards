Meteor.startup(function () {
  if (Tag.collection.findOne()) {
    var initSubjects = [
      {tag: "Accounting"},
      {tag: "Agriculture"},
      {tag: "Architecture"},
      {tag: "Aviation"},
      {tag: "Biology"},
      {tag: "Business"},
      {tag: "Chemistry"},
      {tag: "Communication"},
      {tag: "Computer Science"},
      {tag: "Cooking"},
      {tag: "Dance"},
      {tag: "Design"},
      {tag: "Economics"},
      {tag: "Education"},
      {tag: "Engineering"},
      {tag: "Finance"},
      {tag: "Game Theory"},
      {tag: "Geology"},
      {tag: "History"},
      {tag: "Linguistics"},
      {tag: "Law"},
      {tag: "Literature"},
      {tag: "Management"},
      {tag: "Marketing"},
      {tag: "Mathematics"},
      {tag: "Philosophy"},
      {tag: "Political Science"},
      {tag: "Psychology"},
      {tag: "Public Relations"},
      {tag: "Sociology"},
      {tag: "Technology"},
      {tag: "Theology"},
      {tag: "Logistics"},
      {tag: "Video Game Development"},
      {tag: "Web Design"},
      {tag: "Web Development"},
    ];
    initSubjects.forEach(function(entry) {
      Rooms.insert(entry);
    });
  }
});
