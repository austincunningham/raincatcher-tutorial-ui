var ngModule;
try {
  ngModule = angular.module('wfm.users');
} catch (e) {
  ngModule = angular.module('wfm.users', []);
}

ngModule.run(['$templateCache', function($templateCache) {
  $templateCache.put('wfm-template/user-template.tpl.html',
    '<div class="ui rasied segment"> \n'+
    '<div ng-if="loading">\n' +
    '  <h1>Loading User List...</h1>' +
    '<div class="ui icon message">\n'+
    '<i class="notched circle loading icon"></i>\n'+
    '    <div class="content">\n'+
    '    <div class="header">\n'+
    '    Just one second\n'+
    '</div>\n'+
    '<p>Were fetching that content for you.</p>\n'+
    '</div>\n'+
    '</div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="user_list" ng-if="!loading">\n' +
    '  <h1>List Of Users</h1>\n' +
    '\n' +
    '  <ul>\n' +
    '    <li ng-repeat="user in users">\n' +
    '      {{ user.firstname }} {{ user.lastname }} {{user.address}}\n' +
    '    </li>\n' +
    '  </ul>\n' +
    '</div>\n' +
    '</div>\n' +
    '\n' +
    '<form class="ui form raised segment">'+
    '<div class="user_form" class="ui form">\n' +
    '  <h1>Add A User</h1>\n' +
    '\n' +
    '  <label for="inputFirstName" class="">First Name</label>\n' +
    '  <input type="text"\n' +
    '         name="inputFirstName"\n' +
    '         ng-model="newUser.firstname"\n' +
    '         ng-required="true"\n' +
    '  ></input>\n' +
    '\n' +
    '  <label for="inputLastName" class="">Last Name</label>\n' +
    '  <input type="text"\n' +
    '         name="inputLastName"\n' +
    '         ng-model="newUser.lastname"\n' +
    '         ng-required="true"\n' +
    '  ></input>\n' +
    '<div></div>\n' +
    '  <label for="inputAddress" class="">Address</label>\n' +
    '  <input type="text"\n' +
    '         name="inputAddress"\n' +
    '         ng-model="newUser.address"\n' +
    '         ng-required="true"\n' +
    '  ></input>\n' +
    '  <button ng-click="addUser()" class="ui blue button" >Add New User</button>\n' +
    '</div>\n' +
    '</div>\n' +
    '</form>\n'+
    '\n' +
    ' \n' +
    '\n' +
    '');
}]);
