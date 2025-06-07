import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, date, source } = this.props;
    return (
      <div>
        <div className="card my-3" >
          <img src={imageUrl ? imageUrl : "https://imgs.search.brave.com/kRNFgtddE4MgQtUODaHm4u4QSbFCsqQLG_AfWmh9M_U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI2/NDg5MDM1NS9waG90/by93aGF0cy1uZXcu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXYxTHJJOXVGdUhm/VWt2SVlfeTJrRDRP/VWs2VmpWcFMwWTJ0/RWQzdkNwVWM9"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} 
              <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:"1",left:"90%"}}>
                <span >{source}</span>
            </span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary" style={{ color: "green" }}>Published on {(new Date(date)).toGMTString()}</small></p>
            <Link to={newsUrl} target='_blank' className="btn btn-sm btn-secondary">Read more</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
