angular
  .module("app")
  .factory("Tickets", [
    "$resource",
    function($resource) {
      return $resource(
        "/tickets/:id",
        { id: "@_id" },
        {
          update: { method: "PUT" },
          statuslist: {
            url: "/tickets/statuslist",
            method: "GET",
            isArray: true
          },
          overview: { url: "/tickets/overview", method: "GET", isArray: true }
        }
      );
    }
  ])
  .factory("Users", [
    "$resource",
    function($resource) {
      return $resource(
        "/users/:id",
        { id: "@_id" },
        {
          update: { method: "PUT" },
          register: { url: "users/register", method: "POST" },
          querydev: { url: "/users/querydev", method: "GET", isArray: true }
        }
      );

      /* no parameters gives us a default structure
    
    https://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/

    get()    ->GET
    query()  ->GET
    save()   -> POST   
    remove() -> DELETE
    delete() -> DELETE
---
    update is not in default
    update () -> PUT
--    { id: '@_id' }
    value objekat._id will be passed as parameter id

    */
    }
  ])
  .factory("Login", [
    "$resource",
    function($resource) {
      return $resource("/users/login");
    }
  ]);
