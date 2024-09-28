import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'


function App() {
  const [length, setLength] = useState(8)
  const [pass,setPass]=useState("")
  const [number,checkedNumber]=useState(false)
  const [character,checkedCharacter]=useState(false)
  const [copy,lastCopy]=useState("")
  const passRef=useRef(null)
  const passRef1=useRef(null)
  

  const Password=useCallback(()=>{
    let d="->"
    let p=""
    let s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(number) s+="0123456789"
    if(character) s+="!@#$%^&*-_+=[]{}~`"
    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*s.length+1)
      p+=s.charAt(char)
    }
    setPass(p);
  },[length,number,character,setPass])

  const copyClick=useCallback(()=>{
    lastCopy(pass);
    passRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  },[pass])

  const copyClick1=useCallback(()=>{
    lastCopy(copy);
    passRef1.current?.select();
    window.navigator.clipboard.writeText(copy);
  },[copy])

  const generate=()=>{
    Password()
  }

  return (
    <>
       <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
        />
        <button
        onClick={copyClick}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={8}
        max={15}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={() => {
              checkedNumber((number) =>{
                if(!number)
                {
                  checkedNumber(true)
                }
                else{
                  checkedNumber(false)
                }
              } );
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                  checkedCharacter((character) => {
                    if(!character){
                      checkedCharacter(true)
                    }
                    else{
                      checkedCharacter(false)
                    }
                  } )
              }}
          />
          <label htmlFor="characterInput">Special Characters</label>
      </div>
    </div>

    <div className='mt-2 flex justify-center'><button className='bg-blue-200 p-2 text-black rounded-lg' onClick={generate}>Generate</button></div>
    

</div>

<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-white">
            <h2 className="flex justify-center">Last Password You have Copied</h2>
            <div className="text-white flex p-2 m-3 justify-around">
                <label htmlFor="">Password:</label>
                <input
            type="text"
            value={copy}
            className="outline-none py-1 px-3 rounded-md text-black"
            placeholder=""
            readOnly
            ref={passRef1}
        />
                <button
                   onClick={copyClick1}
                   className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-md'
                    >copy
                </button>
            </div>
        </div>

        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-white">
        <h2 className="flex justify-center">For Checking Password Strength</h2>
        <br />
        <p>1. Copy Password</p>
        <p>2. Click Below Button</p>
        <br />
         <div className='flex justify-center'>
         <a href="https://www.passwordmonster.com/" target='_blank'>
        

        <div>
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-md'>Click Here</button>
        </div>
    </a>
              
         </div>
        </div>

    </>
      
  )
}

export default App
