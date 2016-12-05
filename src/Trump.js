import React from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-bootstrap';
import _ from 'lodash';


var DT_IMAGES = [
  { img: 'https://img.washingtonpost.com/blogs/the-fix/files/2016/04/Nah.gif' },
  { img: 'https://fsmedia.imgix.net/14/a6/41/40/86da/4131/8920/0caca6f1d561/tech-and-trump-just-dont-get-along.gif?rect=0,23,360,180&dpr=2&auto=format&q=75' },
  { img: 'https://fsmedia.imgix.net/99/31/02/a2/bb62/4915/a4b0/4a7a9b2ab4e4/it-is-fair-to-compare-mike-the-chimp-to-presidential-candidate-donald-trump.gif?rect=0,0,480,240&dpr=2&auto=format&q=75' },
  { img: 'https://media.giphy.com/media/3oEduPl42wFdlt3cRy/giphy.gif' },
  { img: 'https://media.giphy.com/media/l41lVJ9rkJUQQTb5m/giphy.gif' },
  { img: 'http://i2.cdn.turner.com/money/dam/assets/150811165239-trump-shrug-gif-custom-1.gif' },
  { img: 'https://s3.amazonaws.com/wp-ag/wp-content/uploads/sites/72/2015/09/carsonstaredown.gif' },
  { img: 'https://media.giphy.com/media/oagA1iVTmm3Re/giphy.gif' },
  { img: 'http://i0.kym-cdn.com/photos/images/newsfeed/001/124/859/9a2.gif' },
  { img: 'https://3.bp.blogspot.com/-ipOcb_lr5p0/V35X60n2s9I/AAAAAAAAYhE/NA5zJdBRSmw_1CVo8G7vb9UQntbMEJOrgCLcB/s1600/trump3gifgifgif.gif' },
  { img: 'https://i.kinja-img.com/gawker-media/image/upload/s--EGgm48cl--/c_scale,fl_progressive,q_80,w_800/nipaxksleoy4w0fxgazv.gif' },
  { img: 'https://static1.squarespace.com/static/5640f08ee4b0250517e6cb18/t/578ae7d9be659461330e5146/1468721126645/' },
  { img: 'http://img2.thejournal.ie/inline/2982309/original/?width=591&version=2982309' },
  { img: 'https://byucomms302.files.wordpress.com/2015/09/trumpsalute.gif' },
  { img: 'http://esq.h-cdn.co/assets/16/21/480x240/landscape-1464273178-giphy.gif' },
  { img: 'http://www.digiwidgy.com/wp-content/uploads/2016/07/donald.gif' },
  { img: 'http://i2.wp.com/www.theindianpanorama.news/wp-content/uploads/2016/04/b746d6522.gif?resize=324%2C160' },
  { img: 'https://s3.amazonaws.com/wp-ag/wp-content/uploads/sites/72/2015/09/Donald-Trump-Faces.gif' },
  { img: 'https://i0.wp.com/fusion.net/wp-content/uploads/2016/03/trumpwater.gif?resize=480%2C270&quality=80&strip=all' },
  { img: 'https://media.giphy.com/media/xT9DPCinBMPhFFW1HO/giphy.gif' },
  { img: 'http://images.complex.com/complex/image/upload/giphy_39_pn5gex.gif' }
];

var controller = {
  search: function (searchQuery) {
    var uri = 'https://api.whatdoestrumpthink.com/api/v1/quotes';
    return fetch(uri)
      .then(function (res) { return res.json() })
      .then(function (data) {
        ReactDOM.render(
          <TrumpQuotes data={data} />,
          document.querySelector('#midpage')
        );
        return data;
      })
  },
};

class TrumpQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quotes: [] };
    this.fetchData = this.fetchData.bind(this);
    this.fetchData(this.state.searchValue);
  }
  fetchData(searchTerm) {
    var thisComponent = this;
    controller.search(searchTerm)
      .then(function (data) {
        thisComponent.setState({ quotes: data.messages.non_personalized })
      })
      .catch((err) => this.setState({ quotes: [] }));
  }
  render() {
    return (
      <div id="midpage">
        <QuoteList quotes={this.state.quotes} />
      </div>
    );
  }
}

class QuoteList extends React.Component {
  render() {
    var quoteResults = this.props.quotes.map(function (message) {
      return (
        <Carousel.Item>
          <Quote quoteCard={message} />
        </Carousel.Item>
      );
    })
    return (
      <div>
        <h2>Donald's infamous quotes:</h2>
        <Carousel className="cards-container">
          {quoteResults}
        </Carousel>
      </div>
    );
  }
}

class Quote extends React.Component {
  render() {
    var message = this.props.quoteCard
    var num = Math.floor(Math.random() * 20);
    return (
      <div className="card">
        <div className="content">
          <img src={DT_IMAGES[num].img} alt='Donald Trump' />
          <div className="center">
            <p>"{message}" </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TrumpQuotes;