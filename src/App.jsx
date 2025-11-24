import { useState } from 'react'
import './App.css'

function App() {

  const turnos = {
    rojo: 'roja',
    azul: 'azul'
  }

  const [tablero, setTablero] = useState(Array.from({ length: 7 }, () => Array(6).fill(null)))
  const [turno, setTurno] = useState(turnos.rojo)
  const [ganador, setGanador] = useState()

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

    // Si hay una fila vacía, colocar la ficha --
    if (filaVaciaIndex !== -1) {
      nuevaColumna[filaVaciaIndex] = turno
      const nuevoTablero = [...tablero]
      nuevoTablero[columnaIndex] = nuevaColumna
      setTablero(nuevoTablero)

      // Cambiar el turno
      const nuevoTurno = turno === turnos.rojo ? turnos.azul : turnos.rojo
      setTurno(nuevoTurno)
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

        <div className={turno === turnos.rojo ? 'turno-actual turno-rojo' : 'turno-actual turno-azul'}>
          Turno: Jugador {turno === turnos.rojo ? 'Rojo' : 'Azul'}
        </div>

        <div className="tablero" id="tablero">
          {tablero.map((columna, index) => (
            <div className="columna" data-columna={index} key={index}>
              {columna.map((casilla, filaIndex) => (
                <div className={`celda ficha-${casilla}`} data-fila={`${index}-${filaIndex}`} key={`${index}-${filaIndex}`} onClick={() => handleClick(`${index}-${filaIndex}`)}>
                </div>
              ))}
            </div>
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
