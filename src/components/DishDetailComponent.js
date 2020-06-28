import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Row,Col,Label, Button,ModalHeader, ModalBody, Modal} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseURL';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class DistD extends Component{
  renderComments(comments,postComment,dishId) {
      if (comments == null) {
          return (<div></div>)
      }
      const cmnts = comments.map(comment => {
          return (
              <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>-- {comment.author},
                  &nbsp;
                  {new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: '2-digit'
                      }).format(new Date(comment.date))}
                  </p>
              </li>
          )
      })
      return (
          <div className='col-12 col-md-5 m-1'>
              <h4> Comments </h4>
              <ul className='list-unstyled'>
                  {cmnts}
              </ul>
              <CommentForm dishId={dishId} postComment={postComment} />
          </div>
      )
  }

  renderDish(dish) {
      if (dish != null) {
          return (
              <div className='col-12 col-md-5 m-1'>
                  <Card>
                       <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                      <CardBody>
                          <CardTitle>{dish.name}</CardTitle>
                          <CardText>{dish.description}</CardText>
                      </CardBody>
                  </Card>
              </div>
          )
      }
      else {
          return (<div></div>)
      }
  }

  render() {
    if(this.props.isLoading){
      return(
        <div className="container">
          <div className="row">
              <Loading />
          </div>
        </div>
      );
    }
    else if (this.props.errmess){
      return(
        <div className="container">
          <div className="row">
              <h4>{this.props.errmess}</h4>
          </div>
        </div>
      );
    }

  else if (this.props.select != null) {
      const dish = this.props.select;
      const dishItem = this.renderDish(dish);
      const commentItem = this.renderComments(this.props.comments,this.props.postComment,this.props.select.id);
      return(
        <div className="container">
        <div className="row">
              <Breadcrumb>

                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{this.props.select.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                  <h3>{this.props.select.name}</h3>
                  <hr />
              </div>
          </div>
          <div className="row">
              {dishItem}
              {commentItem}
            </div>
        </div>
      )
    }
  else
    return (
        <div></div>
    )

  }
}
class CommentForm extends Component{
  constructor(props){
    super(props);

    this.state={
      isModalOpen: false
    }
this.toggleModal = this.toggleModal.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);


  }

toggleModal(){
  this.setState({isModalOpen:!this.state.isModalOpen});
}

handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
}

render() {
return(
  <React.Fragment>
  <Button type="submit" className="outline" onClick={this.toggleModal}>
      <span className="fa fa-edit fa-lg"></span> Submit Comment
  </Button>
<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>

    <ModalBody>
    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
      <Row className="form-group">
      <Label htmlFor="rating" md={12}>Rating</Label>
        <Col md={12}>
          <Control.select model=".rating" name="rating" className="form-control">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          </Control.select>
        </Col>
      </Row>
      <Row className="form-group">
      <Label htmlFor="author" md={12}>Your Name</Label>
      <Col md={12}>
          <Control.text model=".author" id="author" name="author"
              placeholder="Your Name"
              className="form-control"
              validators={{
                required, minLength: minLength(3), maxLength: maxLength(15)
              }}
               />

               <Errors className="text-danger"
               model=".name"
               show="touched"
               messages={{
                 required:'Required ',
                 minLength:'Must be greater than 2  characters',
                 maxLength:'Must be 15 characters or less'
               }}
               />
      </Col>
      </Row>
      <Row className="form-group">
          <Label htmlFor="comment" md={12}>Comments</Label>
          <Col md={12}>
              <Control.textarea model=".comment" id="comment" name="comment"
                  rows="6"
                  className="form-control" />
          </Col>
      </Row>
      <Row className="form-group">
      <Col >
      <Button className="bg-primary">Submit</Button>
      </Col>
      </Row>
    </LocalForm>
    </ModalBody>
</Modal>
</React.Fragment>
);
}



}

export default DistD;
