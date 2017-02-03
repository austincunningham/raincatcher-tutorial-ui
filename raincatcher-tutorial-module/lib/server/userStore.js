
//A simple in-memory store of objects describing users.
var mockUsers = [{
  id: 'user1id',
  firstname: "User 1",
  lastname: "second name",
  address: "Some Lane, Some Street, Some Country"
},
{
  id: 'user2id',
  firstname: 'He',
  lastname: 'Man',
  address: 'Castle Greyscull Ethernia'
},
{
  id: 'user3id',
  firstname: 'Opumius',
  lastname: 'Prime',
  address: 'The Ark under the mountain'
}];


/**
 * Setting up the user store to handle topics related to users.
 *
 * Whenever one of the topics below are published elsewhere (in this example, it is published by the http request handler in the router.js file),
 * the mediator will execute the relevant topic below to perform some logic to satify the topic.
 *
 * @param mediator
 */
module.exports = function setUpUserStore(mediator) {

  //Subscribing to the user list topic. This topic can be published by any other module/app that uses the same mediator.
  //In this case, the `wfm:user:list` topic is published when the cloud app relieves a http request. See router.js .
  mediator.subscribe('wfm:user:list', function() {

    //Business logic to satisfy the `wfm:user:list` topic.
    //The setTimeout is to highlight that this functionality can be asynchronous (e.g. a http request to another cloud app to get the users)
    setTimeout(function() {

      //Having the list of users, the `done:wfm:user:list` topic can be published to the mediator along with the list of users available.
      //The `done` prefix is always used by convention to identify an topic as complete.
      //This also shows that data can be passed to mediator topics for processing.
      mediator.publish('done:wfm:user:list', mockUsers);
    }, 300);
  });


  //Subscribing to the `wfm:user:create` topic add users to the array.
  mediator.subscribe('wfm:user:create', function(userToCreate) {

    //The setTimeout is to highlight that this functionality can be asynchronous (e.g. a http request to another cloud app to create users)
    setTimeout(function() {
      if (!userToCreate) {
        //If there is no data to create a user, then the topic should be in an error state.
        mediator.publish('error:wfm:user:create', new Error("Expected user data to create a user"));
      } else {
        userToCreate.id = 'user' + (mockUsers.length + 1) + "id";
        //Adding the user to the existing array of users.
        mockUsers.push(userToCreate);

        //Publishing the `done` state for the wfm:user:create topic.
        //This is consumed by the route handler in the `router.js` file.
        mediator.publish('done:wfm:user:create', userToCreate);
      }
    });

  });


  //Subscribing to the `wfm:user:delete` topic My effort to remove from array nothing happening yet.
  mediator.subscribe('wfm:user:delete', function(userToDelete) {
    console.log('do i ever get here userStore mediator.subscribe');
    //The setTimeout is to highlight that this functionality can be asynchronous (e.g. a http request to another cloud app to create users)
    setTimeout(function() {
      if (!userToDelete) {
              //If there is no data to create a user, then the topic should be in an error state.
        mediator.publish('error:wfm:user:delete', new Error("Expected user data to delete a user"));
      } else {
              //Removing a user to the existing array of users.
        console.log('do i ever get here userStore mediator.subscribe');
        //mockUsers.pop(userToDelete.id);
        mockUsers.splice((_.indexOf(mockUsers, _.findWhere(mockUsers, {id: userToDelete.id}))), 1);

        //Publishing the `done` state for the wfm:user:delete topic.
        // This is consumed by the route handler in the `router.js` file.
        mediator.publish('done:wfm:user:delete', userToDelete);
      }
    });

  });

};