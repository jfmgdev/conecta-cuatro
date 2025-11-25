import { Celda } from "./Celda"

export const Columna = ({ index, columna, handleClick }) => {
    return (
        <div className={`columna`} data-columna={index} key={index}>
            {columna.map((casilla, filaIndex) => (
                <Celda
                    key={`${index}-${filaIndex}`}
                    index={index}
                    casilla={casilla}
                    filaIndex={filaIndex}
                    handleClick={handleClick}
                />
            ))}
        </div>
    )
}