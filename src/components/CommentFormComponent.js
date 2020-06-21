import React, {Component} from 'react';
class CommentForm extends Component{
  constructor(props){
    super(props);

    this.state={
      isModalOpen: false
    }


  }

toggleModal(){
  this.setState({isModalOpen:!this.state.isModalOpen});
}



}
