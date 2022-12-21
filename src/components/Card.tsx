import { useEffect, useState } from 'react';
import '../App.css'
interface ObjPosition {
  x: number,
  y: number,
  id?: number
}
function Card({x: px, y: py, id}: ObjPosition) {
  const [x, setX] = useState<number | null>(null);
  const [y, setY] = useState<number | null>(null);
  const [show, setShow] = useState('none');

  useEffect(() => {
    setX(px);
    setY(py);
    setShow('block')
  }, [])
  return (
    <div className='cicle' style={{top: `${y}px`, left: `${x}px`, display: `${show}`}} id={`${id}`}></div>
  )
}

export default Card