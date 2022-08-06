import React, {useState} from 'react'
import firebaseApp from '../firebase/firebaseConfig'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, setDoc} from 'firebase/firestore'

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

const Login = () => {
  const [registrando, setRegistrando] = useState(false) 

  const registrarUsuario = async(email, password, rol) => {
    const infoUsuario = await createUserWithEmailAndPassword(auth, email, password)
    .then((usuarioFirebase) => {
      return usuarioFirebase
    })
    // console.log(infoUsuario.user.uid)
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`)
    setDoc(docuRef, {correo: email, rol: rol})
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    const rol = e.target.elements.rol.value
    console.log(email, password, rol)
    if(registrando){
      //* Función de registro
      registrarUsuario(email, password, rol)
    } else {
      //! Evaluar las credenciales del usuario
      signInWithEmailAndPassword(auth, email, password)
    }
  }

  return (
    <>
      <h1>{registrando ? "Registrate!!" : "Inicia Sesión"}</h1>
      <form onSubmit={submitHandler}>
        <label>Email</label>
        <input type="email" id='email' />
        <label>Contraseña</label>
        <input type="password" id='password' />
        <label >Rol
          <select id='rol'>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
        <input type="submit" 
          value = {registrando ? "Registrate!!" : "Inicia Sesión"}
        />
      </form>
      <button onClick={() => setRegistrando(!registrando)}>
        {registrando ? "Ya tienes cuenta?" : "¿No tienes cuenta?"}
      </button>
    </>
  )
}

export default Login