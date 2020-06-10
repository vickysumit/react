//import React from 'react';
import React, { Component } from 'react';
import Menu from './MenuComponents';
import {DISHES} from '../shared/dishes';
import DistD from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes:DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishID) {
    this.setState({ selectedDish:dishID});
  }


  render() {

    return (
      <div>
        <Header  />
        <Menu dishes={this.state.dishes}
              onClick={(dishID) => this.onDishSelect(dishID)}/>
        <DistD select={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        <Footer />
      </div>
    );
  }

}

export default Main;
