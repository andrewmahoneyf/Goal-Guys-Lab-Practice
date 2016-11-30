var Controller = {
   getCurrentLegislation: function() {
      return fetch('https://www.govtrack.us/api/v2/bill?congress=112&order_by=-current_status_date&limit=6')
         .then(function(response) {
            return response.json();
         });
   },
   getMoreCurrentLegislation: function(next) {
      return fetch('https://www.govtrack.us/api/v2/bill?congress=112&order_by=-current_status_date&limit=6&offset=' + next)
         .then(function(response) {
            return response.json();
         });
   },
   getSearchResults: function(searchTerm) {
      return fetch('https://www.govtrack.us/api/v2/bill?q=' + searchTerm + '&limit=6')
         .then(function(response) {
            return response.json();
         });
   },
   getMoreSearchResults: function(searchTerm, next) {
      return fetch('https://www.govtrack.us/api/v2/bill?q=' + searchTerm + '&limit=6&offset=' + next)
         .then(function(response) {
            return response.json();
         })
   },
   getCurrentSenators: function() {
      return fetch('https://www.govtrack.us/api/v2/role?current=true&role_type=senator')
         .then(function(response) {
            console.log(response);
            return response.json();
         });
   },
}

export default Controller;