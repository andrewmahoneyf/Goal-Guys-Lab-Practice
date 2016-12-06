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
   getSenatorVotingRecord: function(senatorId) {
         return fetch('https://www.govtrack.us/api/v2/vote_voter/?person=400222&limit=10&order_by=-created&format=json&fields=vote__id,created,option__value,vote__category,vote__chamber,vote__question,vote__number')
               .then(function(response) {
                     console.log(response);
                     return response.json();
               });
   },
}

export default Controller;