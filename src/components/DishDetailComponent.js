import React from 'react';
import { Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle } from 'reactstrap';



const DistD = (props) => {
  if (props.select != null) {
    return(
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5">
            <Card>
            <CardImg width="50%" src={props.select.image} alt={props.select.name} />
            <CardBody>
             <CardTitle>{props.select.name}</CardTitle>
             <CardText>{props.select.description}</CardText>
            </CardBody>
            </Card>
            </div>
            <div  className="col-12 col-md">
              <h2>Comments</h2>
              {
                props.select.comments.map((item)=>
                <div>
                <ul>
                <li>
                 <p>{item.comment}</p>
                 <p>{item.author}</p>
                 <p>{item.date}</p>
                </li>
                </ul>
                </div>
              )
              }
            </div>
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
export default DistD;
