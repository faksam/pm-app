// import { NextFunction, Request, Response } from 'express';
// // import Validator from 'validatorjs';
// const Validator = require('validatorjs');

// export const ProductValidation: any = (req: Request, res: Response, next: NextFunction) => {
//   const {
//     name, discount_percent, price, gender, brand, attribute, quantity,
//     description, pictures, seller_id, category_id, review,
//   } = req.body;

//   const validation = new Validator(
//     {
//       name,
//       discount_percent,
//       price,
//       gender,
//       brand,
//       quantity,
//       description,
//     },
//     {
//       name: 'required|string',
//       discount_percent: 'required|string',
//       price: 'required|string',
//       gender: 'required|string',
//       brand: 'required|string',
//       quantity: 'required|string',
//       description: 'required|string',
//     }
//   );

//   if (validation.passes()) {
//     return next();
//   }
//   {
//     const errors = validation.errors.all();
//     return res.status(400).send({
//       success: false,
//       status: 400,
//       error: errors,
//     });
//   }
// };

// export default ProductValidation;
