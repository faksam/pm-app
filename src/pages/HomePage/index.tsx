// import libraries
import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';

// styles
import './HomePage.scss';

// components

// import Carousel from 'react-material-ui-carousel';
import {
  Button,
  Divider,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';



// interfaces
import { ProductProps, ProductState } from './interfaces';
 
// helper functions
import { getProducts, productError } from '../../store/modules/products';

// fixtures

export class HomePage extends React.Component<ProductProps, ProductState> {

  initialState = {
    product: {
      _id: '',
      name: '',
      address: '',
      img: '',
      description: '',
      region: '',
    },
    clickQuickView: false,
  };

  state = this.initialState;

  componentDidMount() {
    this.props.getProducts();
    console.log(this.props)
  }

  onClickQuickView = (product) => (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      product,
      clickQuickView: !prevState.clickQuickView,
    }));
  }

  onCloseModalView = e => {
    e.preventDefault();
    this.setState((prevState) => ({
      clickQuickView: !prevState.clickQuickView,
    }));
  }

  render() {
    return (
      <div className="home-page">
        <Container maxWidth="md">
        <br />
        <section id="product-section" className="container">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h3>All Products</h3>
              <span>(Note: Logged In Users Can Only See Products In His/Her Region)</span>
            </Grid>

            {this.props.products.map(product => (<Grid key={`product-${product._id}`} item xs={12} sm={6} md={4} lg={3}>
              <Card className="" style={{ maxWidth: 280 }}>
                <CardActionArea>
                  <CardMedia
                    className="" style={{ height: 240 }}
                    image={product.img[0]}
                    title={product.name}
                    onClick={this.onClickQuickView(product)}
                  /> 
                </CardActionArea>
                <CardActions>
                  <Button disabled>
                    {product.name}
                  </Button>
                </CardActions>
              </Card>
            </Grid>))}
            <Divider />
          </Grid> 
          <Dialog open={this.state.clickQuickView} onClose={this.onCloseModalView} aria-labelledby="form-dialog-title" style={{width: "100%"}}>
              <DialogTitle id="form-dialog-title">{this.state.product.name}: {this.state.product.description}</DialogTitle>
            <Divider />
              <br/>
              <DialogContent style={{}}>
                <Grid>
                  <Card className="" style={{ maxWidth: 420, marginLeft: "auto", marginRight: "auto"  }}>
                    <CardActionArea>
                      <CardMedia
                        className="" style={{ height: 400, width: 420}}
                        image={this.state.product.img[0]}
                        title={this.state.product.description}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              </DialogContent>
              <br/>
              <Divider />
              <DialogActions style={{ marginLeft: "auto", marginRight: "auto"  }}>
                <Button onClick={this.onCloseModalView} color="primary">
                  Close
                </Button>
                {this.props.auth.isAuthenticated ? <Button color="primary" href={`/products/`+this.state.product._id} >View</Button>: null}
              </DialogActions>
            </Dialog>
    
          </section>
        </Container>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  products: state.products.data,
  auth: state.auth,
});

export const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
