import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 


var controller = {
  search: function(searchQuery) {    
    var uri = 'https://api.whatdoestrumpthink.com/api/v1/quotes';
    return fetch(uri) 
      .then(function(res) { return res.json() })
      .then(function(data) {
        ReactDOM.render(
          <App data={data} />, 
          document.querySelector('#root')
        );
        return data;
      })
  },
};


export default controller; //export object