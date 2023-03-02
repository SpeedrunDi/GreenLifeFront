import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import {registrationRequest} from "../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import {LoadingButton} from "@mui/lab";

const Register = () => {
  const dispatch = useDispatch()
  const user = useSelector(state1 => state1.users.user)
  const error = useSelector(state1 => state1.users.error)
  const loading = useSelector(state1 => state1.users.loading)
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  })

  if (user) {
    return <Redirect to="/"/>
  }

  const inputChangeHandler = (e) => {
    const {name, value} = e.target
    setState(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(registrationRequest({...state}))
  }

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'green' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <FormElement onChange={inputChangeHandler}
                         value={state.name}
                         name="name"
                         label="Имя"
                         required
                         type="text"
                         error={getFieldError('name')}
            />
            <FormElement onChange={inputChangeHandler}
                         value={state.email}
                         name="email"
                         label="Электронная почта"
                         required
                         type="email"
                         error={getFieldError('email')}
            />
            <FormElement onChange={inputChangeHandler}
                         value={state.password}
                         name="password"
                         label="Пароль"
                         required
                         type="password"
                         error={getFieldError('password')}
            />
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            loading={loading}
          >
            Зарегистрироваться
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                У вас уже есть аккаунт? войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Register