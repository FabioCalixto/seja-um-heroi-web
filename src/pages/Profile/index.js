import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import alertify from 'alertifyjs'

import api from '../../services'

import logoImg from '../../assets/logo.svg'

import './styles.scss'
import './alertify.min.css'

export default function Profile() {
  const [incidents, setIncidents] = useState([])
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')
  const history = useNavigate()
  useEffect(() => {
    api
      .get('profile', { headers: { Authorization: ongId } })
      .then((response) => {
        setIncidents(response.data)
      })
  }, [ongId])

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      })

      setIncidents(incidents.filter((incident) => incident.id !== id))
    } catch (err) {
      alertify.error('Erro ao deletar caso, tente novamente')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>
          Bem vindo (a), <strong>{ongName}</strong>!
        </span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Causas Cadastradas</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CAUSA:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-AO', {
                style: 'currency',
                currency: 'AOA',
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#E02041" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
