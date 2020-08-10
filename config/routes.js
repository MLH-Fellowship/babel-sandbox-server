/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  // Production endpoints
  'POST /api/v1/blobs/create':            { action: 'blobs/create' },
  'POST /api/v1/blobs/fork/:id':          { action: 'blobs/fork' },

  'PUT /api/v1/blobs/update/:id':         { action: 'blobs/update' },

  'GET /api/v1/blobs/:id':                { action: 'blobs/get-blob' },
  'GET /share/:id':                       { action: 'blobs/get-blob' },

  // Endpoints for testing purposes
  'GET /api/v1/blobs/view':               { action: 'blobs/view' },

  'GET /api/v1/blobs/view-forks/:id':     { action: 'blobs/view-forks' },

  'GET /api/v1/blobs/view-configs/:id':   { action: 'blobs/view-configs' },

  'GET /api/v1/plugin/view':              { action: 'plugin/view' },

  'GET /api/v1/config/view':              { action: 'config/view' },

  'GET /api/v1/source/view':              { action: 'source/view' },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
