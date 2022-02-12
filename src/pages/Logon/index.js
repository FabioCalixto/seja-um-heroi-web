import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import alertify from 'alertifyjs'

import api from '../../services'

import './styles.scss'
import './alertify.min.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

const Logon = () => {
  const [id, setId] = useState('')
  const navigate = useNavigate()
  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await api.post('login', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      navigate('/profile', { replace: true })
    } catch (err) {
      alertify.error('Oh oh! Parece que algo deu errado... tente novamente!')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}

export default Logon
