import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import alertify from 'alertifyjs'

import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services'

import './styles.scss'
import './alertify.min.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const ongId = localStorage.getItem('ongId')

  const navigate = useNavigate()

  async function handleNewIncident(e) {
    e.preventDefault()

    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      })

      navigate('/profile', { replace: true })
    } catch (err) {
      alertify.error('Ocorreu um erro ao cadastrar o caso')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />
          <h1>Cadastrar nova causa</h1>
          <p>
            Descreva a causa detalhadamente para encontrar um herói para
            resolver isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Início
          </Link>
        </section>

        <form>
          <input
            placeholder="Titulo da causa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em em Kwanza"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button onClick={handleNewIncident} className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
