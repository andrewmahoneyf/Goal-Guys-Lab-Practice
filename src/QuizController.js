
//module with functions to download a model from online
var Qcontroller = {
  searchLegislators: function(query) {
    var resource = "https://congress.api.sunlightfoundation.com/legislators/locate?zip=";
    var trackUri = resource + query;
    return fetch(trackUri)
      .then(function(res) { return res.json()})
  },
}

export default Qcontroller;