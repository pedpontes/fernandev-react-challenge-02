import { login } from './utils';
import './index.css';
import { useEffect, useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {

  const [button, setButton] = useState(true)
  const [pass, setPass] = useState(false)
  const [email, setEmail] = useState(false)
  const [erro, setErro] = useState({msg:'', display:'none'});
  const [user, setUser] = useState({email: '',pass: ''})

  useEffect(() => {
    setButton(!(pass && email))
  },[pass,email]);

  function verifyEmail(e){
    setEmail(e.target.value != '');
    setUser((prevState) => {  //prevState é o objeto anterior do estado user
      return { ...prevState, email: e.target.value}
    });
  };

  function verifyPass(e){
    setPass(e.target.value.length > 6);
    setUser((prevState) => { //prevState é o objeto anterior do estado user
      return { ...prevState, pass: e.target.value}
    });
  };

  function enviar(e){
    setErro({msg: '', display: 'none'});
    setButton(true);
    login({ email: user.email, password: user.pass})
      .then( () => alert('Login efetuado com sucesso!'))
      .catch( err => setErro({msg: err.message,display: 'block'}))
  }

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        <div className='errorMessage' style={{'display': erro.display}}>{erro.msg}</div>
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id={'email'} type={'email'} autoComplete='off' onChange={(e) => verifyEmail(e)}/>
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} onChange={(e) => verifyPass(e)}/>
        </div>

        <div className='button'>
          <button disabled={button} onClick={(e) => enviar(e)}>Login</button>
        </div>
      </div>
    </div>
  );
}
