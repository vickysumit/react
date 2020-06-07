import React, { Component } from 'react';
import { Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle } from 'reactstrap';

class DistD extends Component {
  constructor(props){
    super(props);
    this.state = {


    };
  }

render() {




  if (this.props.select != null) {
    return(

          <div className="row">
            <div className="col-12 col-md-5">
            <Card>
            <CardImg width="50%" src={this.props.select.image} alt={this.props.select.name} />
            <CardBody>
             <CardTitle>{this.props.select.name}</CardTitle>
             <CardText>{this.props.select.description}</CardText>
            </CardBody>
            </Card>
            </div>
            <div  className="col-12 col-md">
              <h2>Comments</h2>
              {
                this.props.select.comments.map((item)=>
                <div>

                <ul>
                <li>
                 <p>{item.comment}</p>
                 <p>{item.author}</p>
                 <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</p>
                </li>
                </ul>
                </div>
              )
              }

            </div>
          </div>




    );

    }

  else {
    return (
      <div></div>
    );
  }
}


}
export default DistD;
