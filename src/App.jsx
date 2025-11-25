import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import { Columna } from './components/Columna'
import { verificarGanador, checkEmpate } from './logic/index.js'
import { turnos } from './constants.js'
import { guardarPartida } from './storage/index.js'

function App() {

  const [tablero, setTablero] = useState(
    () => JSON.parse(window.localStorage.getItem('tableroConecta')) ||
      Array.from({ length: 7 }, () => Array(6).fill(null))
  )

  const [turno, setTurno] = useState(
    () => window.localStorage.getItem('turnoConecta') || turnos.rojo
  )

  const [ganador, setGanador] = useState(
    () => JSON.parse(window.localStorage.getItem('ganadorConecta')) || null
  )

  useEffect(() => {
    guardarPartida(tablero, turno, ganador)
  }, [tablero, turno, ganador])

  const handleClick = (filaData) => {
    const [columnaIndex, filaIndex] = filaData.split('-').map(Number)

    // Buscar la primera fila vacía en la columna seleccionada
    const nuevaColumna = [...tablero[columnaIndex]]
    let filaVaciaIndex = -1
    for (let i = nuevaColumna.length - 1; i >= 0; i--) {
      if (nuevaColumna[i] === null) {
        filaVaciaIndex = i
        break
      }
    }

    // Si hay una fila vacía, colocar la ficha
    if (filaVaciaIndex !== -1 && !ganador) {
      nuevaColumna[filaVaciaIndex] = turno
      const nuevoTablero = [...tablero]
      nuevoTablero[columnaIndex] = nuevaColumna
      setTablero(nuevoTablero)

      const nuevoGanador = verificarGanador(nuevoTablero)
      if (nuevoGanador) {
        setGanador(nuevoGanador)
        confetti({
          particleCount: 100,
          spread: 75,
          origin: { y: 0.6 }
        })
      } else if (checkEmpate(nuevoTablero)) {
        setGanador(false)
      } else {
        // Solo cambia de turno cuando no hay ganador o empate
        const nuevoTurno = turno === turnos.rojo ? turnos.azul : turnos.rojo
        setTurno(nuevoTurno)
      }

    }
  }

  const handleReset = () => {
    setTablero(Array.from({ length: 7 }, () => Array(6).fill(null)))
    setTurno(turnos.rojo)
    setGanador(null)
  }

  return (
    <>
      <div className="conecta4-container">
        <h1>CONECTA 4</h1>

        <div className={turno === turnos.rojo && ganador !== false ? 'turno-actual turno-rojo' : 'turno-actual turno-azul'}>
          {ganador ? (
            <span>¡Ganador: {ganador === turnos.rojo ? 'Jugador Rojo' : 'Jugador Azul'}!</span>
          ) : ganador === false ? (
            <span>Empate</span>
          ) : (
            <span>Turno: Jugador {turno === turnos.rojo ? 'Rojo' : 'Azul'}</span>
          )}
        </div>

        <div className="tablero" id="tablero">
          {tablero.map((columna, index) => (
            <Columna key={index} index={index} columna={columna} handleClick={handleClick} />
          ))}
        </div>

        <div className="controles">
          <button className="btn btn-reiniciar" onClick={handleReset}>Reiniciar Juego</button>
        </div>
      </div>
    </>
  )
}

export default App
