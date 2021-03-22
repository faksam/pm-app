// import libraries
import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';

// styles
import './HomePage.scss';

// components
import ProductDetails from "../../components/product/ProductDetails";

// import Carousel from 'react-material-ui-carousel';
import {
  Button,
  Paper,
  Divider,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Modal,
  Typography,
  IconButton,
  InputAdornment,
  Grid,
  MenuItem,
  Fab,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon  from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';


// interfaces
import { ProductProps, ProductState } from './interfaces';
 
// helper functions
import { getProducts } from '../../store/modules/products';

// fixtures

export class HomePage extends React.Component<ProductProps, ProductState> {

  initialState = {
    product: {
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

    const {

    } = this.state;

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
                    image={product.img}
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
                  <Card className="" style={{ maxWidth: 400, marginLeft: "auto", marginRight: "auto"  }}>
                    <CardActionArea>
                      <CardMedia
                        className="" style={{ height: 400}}
                        image={this.state.product.img}
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
});

export const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
