import react, { Fragment, useState } from 'react'
import { Button } from '../../../components/buttons';
import { Card1 } from "../../../components/cards";
import { Input } from "../../../components/inputs";
import { Http, IHttpResponse } from '../../../core/Http';
import { Notificacion, SpinnerLoading } from '../../../core/Notiflix';

export const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({})

  const handleLogin = async(e:any) => {
    console.log('event::',e)
    console.log('login::', loginForm)
    SpinnerLoading.loading()
    let result
    try {
      result = await Http.GET('/listar')

    } catch (error:any) {
      Notificacion.error(error?.error||'Error al listar')
      SpinnerLoading.remove() 
    }
    SpinnerLoading.remove() 
    console.log(result)
   }

  return <Fragment >
    <Card1 class='mx-auto mt-5 w-3/12' headerClass={'text-center uppercase text-blue-600'} title={'Login'}>
      <>
        <Input label={'Usuario'} placeholder={'Usuario'} icon={'fa fa-user'}
          saveForm={loginForm} itemForm='usuario' />
        <Input label={'Pasword'} placeholder={'Password'} icon={'fa fa-key'} type='password'
          saveForm={loginForm} itemForm='password' />
        <div className='w-full flex flex-row-reverse'>
          <button onClick={e => {handleLogin(e) }}></button>
          <Button icon='fa fa-search ' text='Acceder' onClick={e=> { handleLogin(e) } } />
        </div>
      </>
    </Card1>
  </Fragment>

}