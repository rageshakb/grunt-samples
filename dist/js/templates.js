angular.module('mainApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/modal.html',
    "<div class=modal><div class=modal-dialog><div class=modal-content><div class=modal-header><button type=button class=close data-dismiss=modal aria-hidden=true>&times;</button><h4 class=modal-title>{{ title }}</h4></div><div class=modal-body ng-transclude></div></div></div></div>"
  );


  $templateCache.put('templates/userdetail.tmpl.html',
    "<div class=modal-content><div class=modal-header><button type=button class=close data-dismiss=modal aria-hidden=true ng-click=cancel()>&times;</button><h4 class=modal-title>User Registration Form</h4></div><div class=modal-body><form role=form><div class=form-group><label for=firstName>First Name</label><input class=form-control ng-model=user.firstName id=firstName placeholder=\"Enter first name\"></div><div class=form-group><label for=lastName>Last Name</label><input class=form-control ng-model=user.lastName id=lastName placeholder=\"Enter last name\"></div><div class=form-group><label for=nationality>Nationality</label><input class=form-control ng-model=user.nationality id=nationality placeholder=\"Enter nationality\"></div><div class=form-group><label for=location>Location</label><input class=form-control ng-model=user.location placeholder=\"Enter location\"></div></form></div><div class=modal-footer><button type=button class=\"btn btn-default\" data-dismiss=modal ng-click=cancel()>Close</button> <button type=button class=\"btn btn-primary\" ng-click=createUser(user)>Save changes</button></div></div>"
  );


  $templateCache.put('templates/userform.tmpl.html',
    "<modal title=\"Login Form\" visible><form><p><label for=name>Name</label><input name=person.name id=name ng-model=person.name></p><p><label for=email>Email</label><input name=email id=email ng-model=person.email></p><p><label for=address>Address</label><input name=address id=address ng-model=person.address></p><p><label for=nationality>Nationality</label><input name=nationality id=nationality ng-model=person.nationality></p><span><button ng-click=save()>Add</button></span></form></modal>"
  );


  $templateCache.put('templates/userinfo.tmpl.html',
    "<p><div ng-transclude></div></p>"
  );


  $templateCache.put('templates/userlist.tmpl.html',
    "<table style=\"border: 5px solid grey\"><thead><th>Name</th><th>Email</th><th>Address</th><th>Nationality</th><th>Edit</th><th>Delete</th></thead><tbody><tr ng-repeat=\"person in persons\"><td>{{person.name}}</td><td>{{person.email}}</td><td>{{person.address}}</td><td>{{person.nationality}}</td><td><a href=# ng-click=edit(person.id)>Edit</a></td><td><a href=# ng-click=delete(person.id)>Delete</a></td></tr></tbody></table>"
  );


  $templateCache.put('templates/users.tmpl.html',
    "<h2>User List</h2><button class=\"btn btn-primary pull-right\" ng-click=open(user)>Add user</button><table class=\"table table-bordered\" style=\"margin-top : 70px\"><thead><th>First Name</th><th>Last Name</th><th>Nationality</th><th>Location</th><th></th><th></th></thead><tbody><tr ng-repeat=\"u in users\"><td>{{u.firstName}}</td><td>{{u.lastName}}</td><td>{{u.nationality}}</td><td>{{u.location}}</td><td><a href=# ng-click=open(u)>Edit</a></td><td><a href=# ng-click=deleteUser(u.id)>Delete</a></td></tr></tbody></table>"
  );


  $templateCache.put('partials/about.tmpl.html',
    "<div class=container><div class=row-fluid><nav class=\"navbar navbar-inverse\" role=navigation><div class=navbar-header><a class=navbar-brand ui-sref=.home1>AngularUI Router1</a></div><ul class=\"nav navbar-nav\"><li><a ui-sref=.home1>Home1</a></li><li><a ui-sref=.about1>About1</a></li></ul></nav><div ui-view></div></div></div>"
  );


  $templateCache.put('partials/about1.tmpl.html',
    "<h1>This is the about page</h1>"
  );


  $templateCache.put('partials/home.tmpl.html',
    "<div class=container><div class=row-fluid><nav class=\"navbar navbar-inverse\" role=navigation><div class=navbar-header><a class=navbar-brand ui-sref=.home1>AngularUI Router1</a></div><ul class=\"nav navbar-nav\" ng-controller=NavBarCtrl><li ng-class=\"{active : isStateActive('home.home1')}\"><a ui-sref=.home1>Home1</a></li><li ng-class=\"{active : isStateActive('home.about1')}\"><a ui-sref=.about1>About1</a></li></ul></nav><div ui-view></div></div></div>"
  );


  $templateCache.put('partials/home1.tmpl.html',
    "<div class=\"jumbotron text-center\"><h1>The Homey Page</h1><p>This page demonstrates <span class=text-danger>nested</span> views.</p></div>"
  );


  $templateCache.put('partials/location.tmpl.html',
    "<h3>This is the locatiion page</h3>"
  );


  $templateCache.put('partials/services.tmpl.html',
    "<h3>This is the services page</h3>"
  );

}]);
