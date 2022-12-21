import { useRef, useState } from 'react';
import Card from './components/Card';
import './App.css';

interface ObjPosition {
  x: number,
  y: number,
  id?: number
}

function App() {
  const [arrCicle, setArrCicle] = useState<ObjPosition[]>([]);
  const [arrPositions, setArrPositions] = useState<any>([]);
  const container = useRef<any>(null);

  const createCircle = ({x, y}: any) => {
    setArrCicle([...arrCicle, {x, y, id: arrCicle.length}]);
  }
  const handleClick = (ev: any) => {
    const rect = container.current.getBoundingClientRect();
    const x = ev.clientX - rect.left - 10;
    const y = ev.clientY - rect.top - 10;
    createCircle({ x, y })
  };

  const undoClick = () => {
    const arrPostions = new Set(arrPositions);
    setArrPositions([...Array.from(arrPostions), arrCicle[arrCicle.length - 1]]);
    const newArrCircle = arrCicle;
    newArrCircle.pop();
    console.log(newArrCircle, arrPositions);
    setArrCicle(newArrCircle);
  }

  const redoClick = () => {
    console.log(arrPositions)
    // const [obj] = [...arrPositions].reverse();
    const obj = arrPositions.pop();
    console.log(obj)
    console.log(arrPositions)
    createCircle(obj);
  }

  return (
    <>
    <h1>Click and show</h1>
      <button type='button' onClick={() => {setArrCicle([]); setArrPositions([])}}>
        Clear All
      </button>
      <button type='button' onClick={() => undoClick()} disabled={(arrCicle.length === 0)}>Undo</button>
      <button type='button' onClick={() => redoClick()} disabled={(arrPositions.length === 0)}>Redo</button>
      <div className='App' onClick={handleClick} ref={container}>
      {arrCicle.length > 0 &&
          arrCicle.map((cicle) => (
            <Card x={cicle.x} y={cicle.y} key={cicle.id} id={cicle.id} />
          ))}
      </div>
    </>
  );
}

export default App;
