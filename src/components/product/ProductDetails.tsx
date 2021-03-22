// import libraries
import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';
// import PaystackButton from 'react-paystack';
import { createProduct } from '../../store/modules/products';

// styles

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
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

// interfaces

const ProductDetails = (props: any) => {
const { product } = props;
    return (
      <div className="new-product">
        <Container maxWidth="md">
        <Grid container spacing={2}>
        <Grid key={`product-${product._id}`} item xs={12} sm={6} md={4} lg={3}>
              
            <Grid item xs={12}>
              <h3>Product {product.name}</h3>
            </Grid>

            <Card className="" style={{ maxWidth: 280 }}>
                <CardActionArea>
                  <CardMedia
                    className="" style={{ height: 240 }}
                    image={product.img}
                    title={product.name}
                  /> 
                </CardActionArea>
                <CardActions>
                  <Button disabled>
                    {product.name}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Divider />
          </Grid> 
          <Button color="primary" href="/">All Products</Button>
        </Container>
      </div>
    );
}

export default ProductDetails;
