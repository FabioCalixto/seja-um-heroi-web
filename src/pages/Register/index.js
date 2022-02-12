import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import alertify from 'alertifyjs'

import api from '../../services'

import './styles.scss'
import './alertify.min.css'

import logoImg from '../../assets/logo.svg'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')

  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
    }

    try {
      const response = await api.post('create-ong', data)

      alertify.alert(
        `Yeah! Obrigado por se cadastar em nosso sistema! Aqui está o seu ID de acesso: ${response.data.id}`,
      )

      navigate('/', { replace: true })
    } catch (err) {
      alertify.error(
        'Opaaa!, acho que o Superman encostou em uma Kryptonita! Teve um erro no cadastro, tente novamente.',
      )
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro e ajude pessoas a encontrarem os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o Login
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            {' '}
            Cadastrar{' '}
          </button>
        </form>
      </div>
    </div>
  )
}
