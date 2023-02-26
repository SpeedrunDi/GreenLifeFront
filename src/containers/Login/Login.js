import {useState} from "react"
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import {loginUserRequest} from "../../store/actions/usersActions"
import FormElement from "../../components/UI/Form/FormElement/FormElement";

const Login = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    email: '',
    password: '',
    remember: true
  })

  const inputChangeHandler = (e) => {
    const {name, value} = e.target
    setState(prev => ({...prev, [name]: value}))
  }

  const checked = (e) => {
    const value = e.target.value
    setState(prev => ({...prev, [value]: !state.remember}))
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(loginUserRequest({...state}))
  }

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
        <Avatar sx={{m: 1, bgcolor: 'green'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
          <Grid container spacing={2}>
            <FormElement onChange={inputChangeHandler}
                         value={state.email}
                         name="email"
                         label="Электронная почта"
                         required
                         type="email"
            />
            <FormElement onChange={inputChangeHandler}
                         value={state.password}
                         name="password"
                         label="Пароль"
                         required
                         type="password"
            />
          </Grid>

          <FormControlLabel
            control={<Checkbox value="remember"
                               checked={state.remember}
                               color="success"
                               onChange={checked}
            />}
            label="Запомнить данные"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register">
                У вас нету аккаунта? Зарегистрируйтесь
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Login