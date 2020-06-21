import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Row,Col,Label, Button,ModalHeader, ModalBody, Modal} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class DistD extends Component{
  renderComments(comments) {
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
              <CommentForm />
          </div>
      )
  }

  renderDish(dish) {
      if (dish != null) {
          return (
              <div className='col-12 col-md-5 m-1'>
                  <Card>
                      <CardImg width="100%" src={dish.image} alt={dish.name} />
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
    const dish = this.props.select
    if (dish == null) {
        return (<div></div>)
    }
    const dishItem = this.renderDish(dish)
    const commentItem = this.renderComments(this.props.comments)
    return (
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
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
}

render() {
return(
  <React.Fragment>
  <Button type="submit" className="outline" onClick={this.toggleModal}>
       Submit Comment
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
      <Row className="form-gropu">
      <Label htmlFor="name" md={12}>Your Name</Label>
      <Col md={12}>
          <Control.text model=".name" id="name" name="name"
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
