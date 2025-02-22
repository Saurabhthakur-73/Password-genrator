import { useState , useCallback , useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length , setlength] = useState(8)
  const [isnum, setnum] = useState(false)
  const [ischar, setchar] = useState(false)
  const [password, setpassword] = useState("")

  //refhook
  const passref = useRef(null)
  const passgen = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(isnum) str += "0123456789"
    if(ischar) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)

  }, [length, ischar, isnum , setpassword])

  const copypassclip = useCallback(()=>{
    passref.current.select();
    passref.current.setSelectionRange(0, 8)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passgen()
  } , [length, ischar, isnum, passgen])


  return (
    <>
      <div className='w-full max-w-full mx-auto shadow-md rounded-lg px-4 my-8 text-black-500 bg-yellow-500'>
        <h1>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text" 
            value={password}
            className='outline-none w-full py-1 px-3 '
            placeholder='password'
            readOnly
            ref={passref}
          />
          <button 
          onClick={copypassclip}
          className='outline-none bg-sky-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range" 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setlength(e.target.value)}}
              />
              <label>length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={isnum}
            id='numinput'
            onChange={()=>{
              setnum((prev)=> !prev)
            }} />
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={ischar}
            id='charinput'
            onChange={()=>{
              setchar((prev)=> !prev)
            }} />
            <label>Charactor</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
