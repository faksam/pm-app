// import Validator from 'validatorjs';
const Validator = require('validatorjs');

export const ProductValidation: any = (formBody) => {
  const {
    name, description, address, region, img,
  } = formBody;

  const validation = new Validator(
    {
      name, 
      description, 
      address, 
      region, 
      img, 
    },
    {
      name: 'required|string',
      description: 'required|string',
      address: 'required|string',
      region: 'required|string',
      img: 'required|string',
    }
  );

  if (validation.passes()) {
    return true;
  }
  {
    const errors = validation.errors.all();
    return {
      success: false,
      status: 400,
      error: errors,
    };
  }
};

export default ProductValidation;
