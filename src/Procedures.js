import React from 'react';

class YoutubePage extends React.Component {
  render() {
    return (
        <main className="container">
          <h2>General Procedure Video Guides</h2>
        </main>
    );
  }
}

class TrafficPage extends React.Component {
  render() {
    return (
        <main className="container">
          <h2>Traffic Stops</h2>
        </main>
    );
  }
}

class DoorPage extends React.Component {
  render() {
    return (
        <main className="container">
          <h2>Police Encounters at Your House</h2>
        </main>
    );
  }
}

class FAQPage extends React.Component {
  render() {
    return (
        <main className="container">
          <h2>FAQ</h2>
        </main>
    );
  }
}



export {YoutubePage, TrafficPage, DoorPage, FAQPage}; 