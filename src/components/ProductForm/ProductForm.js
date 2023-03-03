import React, {useState} from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton, TextareaAutosize,
} from "@mui/material";
import FileInput from "../UI/Form/FileInput/FileInput";
import FormElement from "../UI/Form/FormElement/FormElement";
import {LoadingButton} from "@mui/lab";
import {useSelector} from "react-redux";
import {ArrowForward} from "@mui/icons-material";

const ProductForm = ({onSubmit, error}) => {
  const loading = useSelector(state => state.products.loading)
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(newProduct).forEach(key => {
      formData.append(key, newProduct[key]);
    });

    onSubmit(formData);

    setNewProduct({
      title: "",
      price: "",
      description: "",
      image: "",
    })
  };

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setNewProduct(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setNewProduct(prevState => ({...prevState, [name]: file}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={submitFormHandler}
      >
        <Grid
          container
          maxWidth="md"
          textAlign="center"
          marginX="auto"
          direction="column"
          rowSpacing={3}
        >
          <FormElement
            required={true}
            onChange={inputChangeHandler}
            name="title"
            label="Title"
            value={newProduct.title}
            error={getFieldError('title')}
          />

          <FormElement
            required={true}
            onChange={inputChangeHandler}
            type="number"
            name="price"
            label="Price"
            value={newProduct.price}
            error={getFieldError('price')}
          />

          <TextareaAutosize
            name="description"
            placeholder="Описание продукта"
            value={newProduct.description}
            onChange={inputChangeHandler}
            minRows={3}
            style={{
              maxWidth: "900px",
              marginTop: "24px",
              borderRadius: "4px",
              borderColor: "#c5c5c5",
              padding: "16.5px 14px",
              fontSize: "16px"
            }}
          />

          <Grid item>
            <FileInput
              label="Image"
              name="image"
              image={newProduct.image}
              onChange={fileChangeHandler}
            />
          </Grid>

          <Grid item>
            <LoadingButton type="submit" variant="contained" loading={loading}>Создать</LoadingButton>
          </Grid>
        </Grid>
      </form>
      {newProduct.image && (
        <Grid maxWidth="600px" textAlign="left" padding="100px" marginX="auto">
          <Card sx={{
            height: '100%',
            boxShadow: "6",
            border: "5px solid rgba(66,227,116,0.7)",
            borderRadius: "10px"
          }}>
            <CardHeader title={newProduct.title}/>
            <CardMedia
              title={newProduct.title}
              image={URL.createObjectURL(newProduct.image)}
              sx={{paddingTop: '56.25%', height: 0}}
            />
            <CardContent>
              <strong>
                Price: {newProduct.price} KGS
              </strong>
            </CardContent>
            <CardActions sx={{justifyContent: "space-between", paddingX: "20px"}}>
              <IconButton>
                <ArrowForward/>
              </IconButton>
              <Button>
                В корзину
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default ProductForm;