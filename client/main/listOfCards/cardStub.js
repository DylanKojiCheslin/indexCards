Template.cardStub.onCreated(function() {
  var self =  this;
    if (self.isBeingEdited == undefined) {
      self.isBeingEdited = new ReactiveVar;
      self.isBeingEdited.set( false );
    };
});

Template.cardStub.helpers({
  isBeingEdited: function(){
    return Template.instance().isBeingEdited.get();
  }
});

Template.cardStub.events({
  "click .edit-this-card": function(event, template){
    event.preventDefault();
    if (template.isBeingEdited == undefined) {
        template.isBeingEdited = new ReactiveVar(true);
      }
      if ( template.isBeingEdited.get() == false) {
        template.isBeingEdited.set(true);
      }
  },
});

//Autoform Hooks
var updateCardHooks = {
  after:{
    "method-update": function(error,result) {
      var self = this;
      console.log(self);
      if(error){
        toastr.error(error,'Error');
      }
      if(result){
        console.log(result);
        self.template.get("isBeingEdited").set(false);
        toastr.success(result.toastrMessage, result.toastrTitle);
      }
    }

  }
};

AutoForm.hooks({
  updateCardForm: updateCardHooks,
});
