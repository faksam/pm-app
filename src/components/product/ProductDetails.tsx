// import libraries
import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';
import ProductValidation from '../../helpers/productValidation';
import { storage } from "../../helpers/firebaseConf";

import { getProduct } from '../../store/modules/products';

// styles

// components
import {
  Button,
  Container,
  TextField,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
} from '@material-ui/core';

// interfaces
import { ProductProps, ProductState } from './interfaces';

export class ProductDetails extends React.Component<ProductProps, ProductState> {
  initialState = {
    product: {
      img: [],
      description: '',
      name: '',
    },
    comment: {
      comment: '',
      parentId: '',
    },
    displayFullAuth: false,
    errors: {
      commentError: false,
      commentReplyError: false,
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
    commentLabel: 'New Comment',
    productDescriptionHelperText: 'Please enter product description',
    commentReplyLabel: 'New Comment Reply',
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
    // console.log(this.props.match.params.id);
    this.props.getProduct(this.props.match.params.id);
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

  getProductDetails = (e) => {
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

      const imgPromises = [];
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
              storage.ref('images').child(productName+imgCount).getDownloadURL()
              .then(fireBaseUrl => {
                this.setState((prevState) => ({ productImgUrl: [...prevState.productImgUrl, fireBaseUrl] 
                }));
                // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
              })
            });
        };
        Promise.all(imgPromises)
            .then(() => console.log('All files uploaded'))
            .catch(err => console.log(err.code));
      }
      isValid = ProductValidation({
        name: productName,
        address: productAddress, 
        img: productImgUrl.length,
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
    } = this.state;

    return (
      <div className="new-product">
        <Container maxWidth="md">
          <Grid>
            <h2>{this.props.product.name}: {this.props.product.description}</h2>
            <Card className="" style={{ maxWidth: 420, marginLeft: "auto", marginRight: "auto"  }}>
              <CardActionArea>
                <CardMedia
                  className="" style={{ height: 400, width: 420}}
                  image={this.props.product.img ? this.props.product.img[0] : ''}
                  title={this.props.product.description}
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid>
            <TextField
              error={false}
              id="filled-select-currency"
              helperText={`write a comment here.`}
              name="comment"
              value={this.state.comment.comment}
              onChange={this.onChange}
              placeholder="Comment"
              fullWidth
              required={true}
            ></TextField>
            <Button color="primary" onClick={this.onChange}>Save</Button>
          </Grid>
        </Container>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  auth: state.auth,
  product: state.products.data,
});

export const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProduct(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
