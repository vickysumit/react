import React, { Component } from 'react';
import DistD from './DishDetailComponent';
import { Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle } from 'reactstrap';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDish:null

        };
    }

    onDishSelect(dish) {
      this.setState({ selectedDish:dish});
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={() => this.onDishSelect(dish)}>
                      <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>

                  </CardImgOverlay>
                </Card>
              </div>
            );
        });
        const a = this.props.dishes;
      const abc = a.map((ids)=>{

      })

        return (
          <div className="container">
            <div className="row">
                  {menu}
            </div>
            <div>
              <DistD select={this.state.selectedDish} dishh ={this.state.dishes}/>
            </div>
          </div>
        );
    }
}

export default Menu;
