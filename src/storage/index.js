export const guardarPartida = (tablero, turno, ganador) => {
    window.localStorage.setItem('tableroConecta', JSON.stringify(tablero))
    window.localStorage.setItem('turnoConecta', turno);
    window.localStorage.setItem('ganadorConecta', JSON.stringify(ganador));
}