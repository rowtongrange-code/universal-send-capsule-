import React from 'react'
import CreateCapsule from './pages/CreateCapsule'
import OpenCapsule from './pages/OpenCapsule'

export default function App(){
  const [route, setRoute] = React.useState(window.location.pathname)
  React.useEffect(()=>{
    const onPop = ()=> setRoute(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return ()=> window.removeEventListener('popstate', onPop)
  },[])

  function nav(path){
    history.pushState({}, '', path)
    setRoute(path)
  }

  return (
    <div style={{padding:16,fontFamily:'sans-serif'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1 style={{margin:0,fontSize:20}}>Universal Send Capsule</h1>
        <nav>
          <button onClick={()=>nav('/')} style={{marginRight:8}}>Create</button>
          <button onClick={()=>nav('/open')}>Open</button>
        </nav>
      </header>
      <main style={{marginTop:16}}>
        {route === '/' && <CreateCapsule />}
        {route === '/open' && <OpenCapsule />}
      </main>
    </div>
  )
}
