// import libraries
import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';
import ProductValidation from '../../helpers/productValidation';

import { createProduct } from '../../store/modules/products';

// styles

// components
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

export class NewProduct extends React.Component<ProductProps, ProductState> {
  initialState = {
    displayFullAuth: false,
    errors: {
      productDescriptionError: false,
      productAddressError: false,
      productNameError: false,
      productRegionError: false,
      productImgError: false,
    },
    productImg: '',
    productDescription: '',
    productAddress: '',
    productRegion: '',
    productName: '',
    productDescriptionLabel: 'Description',
    productDescriptionHelperText: 'Please enter product description',
    productAddressLabel: 'Product Address',
    productAddressHelperText: 'Please the the product address',
    productNameLabel: 'Product Name',
    productNameHelperText: 'Please the your product name',
    productRegionLabel: 'Product Region/City',
    productRegionHelperText: 'Please the product your region',
    productImgLabel: 'Img',
    productImgHelperText: 'Please select product image',
  };

  state = this.initialState;

  componentDidMount() {

  }


  onChange = (event) => {
    const { errors } = this.state;

    this.setState({
      [event.target.name]: event.target.value
    });
    event.preventDefault();
  }

  addNewProduct = (e) => {
    e.preventDefault();
    let isValid;
    const {
      productName,
      productAddress, 
      productImg,
      productDescription,
      productRegion } = this.state;

      isValid = ProductValidation({
        name: productName,
        address: productAddress, 
        img: productImg,
        description: productDescription,
        region: productRegion
      });

      console.log(isValid);
      const { createProduct } = this.props;
      if(isValid==true) {
        createProduct({
          name: productName,
          address: productAddress, 
          img: productImg,
          description: productDescription,
          region: productRegion,
        });
      } else {
        this.setState({
          productDescriptionHelperText: (isValid.error.description ? isValid.error.description[0] : 'Please enter product description'),
          productRegionHelperText: (isValid.error.region ? isValid.error.region[0] : 'Please the product your region'),
          productNameHelperText: (isValid.error.name ? isValid.error.name[0] : 'Please the your product name'),
          productAddressHelperText: (isValid.error.address ? isValid.error.address[0] : 'Please the the product address'),
          productImgHelperText: (isValid.error.img ? isValid.error.img[0] : 'Please select product image'),
      });
    }

    window.location.href="/";
  }

  displayFullAuthForm = (e) => {
    e.preventDefault();

    this.setState((prevState) => ({
      displayFullAuth: !prevState.displayFullAuth
    }))
  }

  render() {
    const {
      displayFullAuth,
      productName,
      productAddress, 
      productDescription,
      productImg,
      productRegion,
      errors,
      productAddressHelperText,
      productAddressLabel,
      productNameHelperText,
      productNameLabel,
      productDescriptionHelperText,
      productDescriptionLabel,
      productRegionLabel,
      productRegionHelperText,
      productImgLabel,
      productImgHelperText,
    } = this.state;

    return (
      <div className="new-product">
        <Container maxWidth="md">

          <TextField
            id="filled-select-currency"
            error={errors.productImgError}
            label={productImgLabel}
            helperText={productImgHelperText}
            name="productImg"
            value={productImg}
            onChange={this.onChange}
            placeholder="Img"
            fullWidth
            required={true}
          ></TextField>
          <TextField
            id="filled-select-currency"
            error={errors.productNameError}
            label={productNameLabel}
            helperText={productNameHelperText}
            name="productName"
            value={productName}
            onChange={this.onChange}
            placeholder="Full Name"
            fullWidth
            required={true}
          ></TextField>
          <TextField
            id="filled-select-currency"
            error={errors.productDescriptionError}
            label={productDescriptionLabel}
            helperText={productDescriptionHelperText}
            name="productDescription"
            value={productDescription}
            onChange={this.onChange}
            placeholder="Description No"
            fullWidth
            required={true}
          ></TextField>
          <TextField
            error={errors.productRegionError}
            id="filled-select-currency"
            label={productRegionLabel}
            helperText={productRegionHelperText}
            name="productRegion"
            value={productRegion}
            onChange={this.onChange}
            placeholder="City/Region"
            fullWidth
            required={true}
          ></TextField>
          <TextField
            error={errors.productAddressError}
            id="filled-select-currency"
            label={productAddressLabel}
            helperText={productAddressHelperText}
            name="productAddress"
            value={productAddress}
            onChange={this.onChange}
            placeholder="Address"
            fullWidth
            required={true}
          ></TextField>
          <Button color="primary" onClick={this.addNewProduct}>Save</Button>
        </Container>
      </div>
    );
  }
}

export const mapStateToProps = state => ({

});

export const mapDispatchToProps = dispatch => ({
  createProduct: product => dispatch(createProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
