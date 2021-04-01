// import libraries
import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';
import ProductValidation from '../../helpers/productValidation';
import { storage } from "../../helpers/firebaseConf";

import { createProduct } from '../../store/modules/products';

// styles

// components
import {
  Button,
  Container,
  TextField,
} from '@material-ui/core';

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
    productImg: null,
    productImgUrl: [],
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
    this.setState({
      [event.target.name]: event.target.value
    });
    event.preventDefault();
  }

  onFileChange = (event) => {
    const files = event.target.files;
    this.setState({ 
      productImg: files,
      productImgHelperText: `${files.length} image(s)`,
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
      productImgUrl,
      productDescription,
      productRegion } = this.state;

      const { createProduct } = this.props;

      let imgCount = 0;
      if(productImg && productImg.length > 0) {
        console.log('in product image uploader');
        for (const imgFile of productImg) {
          imgCount++;
          const uploadTask = storage.ref(`/images/${productName+imgCount}`).put(imgFile);
          uploadTask.on('state_changed', 
            (snapShot) => {
              //takes a snap shot of the process as it is happening
              console.log(snapShot)
            }, (err) => {
              //catches the errors
              console.log(err)
            }, () => {
              // gets the functions from storage refences the image storage in firebase by the children
              // gets the download url then sets the image from firebase as the value for the imgUrl key:
              storage.ref('images/').child(productName+imgCount).getDownloadURL()
              .then(fireBaseUrl => {
                this.setState((prevState) => ({ productImgUrl: [...prevState.productImgUrl, fireBaseUrl] 
                }));
                // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
              })
            });
        };
      }
      isValid = ProductValidation({
        name: productName,
        address: productAddress, 
        img: productImgUrl.length || 0,
        description: productDescription,
        region: productRegion
      });

      console.log(isValid);
      if(isValid==true) {
        createProduct({
          name: productName,
          address: productAddress, 
          img: productImgUrl,
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

    if(isValid==true) window.location.href="/";
  }

  displayFullAuthForm = (e) => {
    e.preventDefault();

    this.setState((prevState) => ({
      displayFullAuth: !prevState.displayFullAuth
    }))
  }

  render() {
    const {
      productName,
      productAddress, 
      productDescription,
      productImg,
      productImgUrl,
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
          <div>
            <TextField
              id="filled-select-currency"
              error={errors.productImgError}
              label={productImgLabel}
              helperText={productImgHelperText}
              name="productImg"
              value={productImgUrl.toString()}
              placeholder="Img"
              disabled
            ></TextField>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              placeholder="Product Images"
              style={{display: "none"}}
              name="productImg" 
              onChange={this.onFileChange}
            />
            <label htmlFor="contained-button-file">
              <Button color="primary" component="span" style={{marginTop: "10px"}}>
                Upload
              </Button>
            </label>
          </div>
          <Button variant="contained" color="primary" onClick={this.addNewProduct}>Save</Button>
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
