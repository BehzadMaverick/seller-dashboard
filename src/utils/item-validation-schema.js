import * as Yup from "yup";

export const ItemValidationSchema = Yup.object().shape({
  name: Yup.string().min(3, "* Minimum 3 Characters Required").required("* Item Name Required"),
  price: Yup.number()
    .typeError("* Numeric Value Required")
    .min(1, "* Minimum Price can be $1")
    .required("* Item Price Required"),
  description: Yup.string()
    .min(70, "* Minimum 70 Characters Required")
    .required("* Description Required"),
});
