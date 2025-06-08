// import React, { Component } from 'react'
// import NewsItem from '../NewsItem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types';

// export class News extends Component {

//   static defaultProps = {
//     country: "in",
//     category: "general",
//     pageSize: 6,
//   }

//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1
//     }
//     document.title = `${this.props.category}- GorillaNews`;
//   }

//   async updateNews(pageNo)
//   {
//     this.setState({ loading: true });
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=my_secret_key&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, date: parsedData.articles.publ });
//   }

//   async componentDidMount() {
//     this.setState({ loading: true });
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=my_secret_key&page=1&pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, date: parsedData.articles.publ });
//   }

//   handleNextClick = async () => {
//     if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
//       this.setState({ loading: true });
//       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=my_secret_key&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
//       let data = await fetch(url);
//       let parsedData = await data.json();
//       this.setState({ page: this.state.page + 1, articles: parsedData.articles, loading: false });
//     }
//     if (this.state.page + 1 === Math.ceil(this.state.totalResults / this.props.pageSize)) {
//       document.querySelector(".nextBtn").disabled = true;
//     }
//   }

//   handlePrevClick = async () => {
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=my_secret_key&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     this.setState({
//       page: this.state.page - 1,
//       articles: parsedData.articles,
//       loading: false
//     });
//     if (document.querySelector(".nextBtn").disabled === true) {
//       document.querySelector(".nextBtn").disabled = false;
//     }

//   }
//   render() {
//     return (
//       <div className='container my-3'>
//         <h1 className='text-center' style={{ marginBlock: '40px' }}>GorillaNews Top - {((this.props.category).charAt(0)).toUpperCase() + (this.props.category).slice(1)} Headlines </h1>
//         {this.state.loading&&<Spinner/>}
        
//           {/* dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           style={{ display: 'flex', flexDirection: 'column-reverse' }} 
//           inverse={true} 
//           hasMore={this.state.articles.length!==this.totalResults}
//           loader={<h4>Loading...</h4>}
//           scrollableTarget="scrollableDiv"
//         */}
//         <div className="row">
//           {this.state.articles.map((ele) => {
//             return <div className="col-md-4" key={ele.url}>
//               <NewsItem title={ele.title ? ele.title.length >= 50 ? ele.title.slice(0, 45) + "..." : ele.title : ""} description={ele.description ? ele.description.slice(0, 100) + "..." : ""} imageUrl={ele.urlToImage} newsUrl={ele.url} date={ele.publishedAt} source={ele.source.name} />
//             </div>
//           })}
//         </div>
//         <div className='container d-flex justify-content-between'>
//           <button disabled={this.state.page <= 1 ? true : false} type="button" className="btn btn-dark my-3" onClick={this.handlePrevClick}>	&larr; Pervious</button>
//           <button type="button" className="btn btn-dark nextBtn my-3" onClick={this.handleNextClick} >Next &rarr;</button>
//         </div>
//       </div>
//     )
//   }
// }

// export default News

import React, { Component } from 'react';
import NewsItem from '../NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    category: 'technology',
    pageSize: 6,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  fetchNews = async () => {
    this.setState({ loading: true });

    // ✅ HARDCODED WORKING API CALL:
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=my_secret_key&page=${this.state.page}&pageSize=6`;

    console.log("Fetching from:", url);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("API Response:", parsedData);

    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0,
      loading: false,
    });
  };

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 6)) return;

    await this.setState({ page: this.state.page + 1 });
    this.fetchNews();
  };

  handlePrevClick = async () => {
    if (this.state.page <= 1) return;

    await this.setState({ page: this.state.page - 1 });
    this.fetchNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '40px 0' }}>
          GorillaNews - {this.capitalize(this.props.category)} Headlines
        </h1>

        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading && this.state.articles.length === 0 && (
            <p className="text-center">No news available for this category and country.</p>
          )}
          {this.state.articles.map((ele) => (
            <div className="col-md-4" key={ele.url}>
              <NewsItem
                title={ele.title?.length > 45 ? ele.title.slice(0, 45) + '...' : ele.title}
                description={ele.description?.slice(0, 100) + '...'}
                imageUrl={ele.urlToImage}
                newsUrl={ele.url}
                date={ele.publishedAt}
                source={ele.source?.name}
              />
            </div>
          ))}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark my-3"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 6)}
            className="btn btn-dark my-3"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
