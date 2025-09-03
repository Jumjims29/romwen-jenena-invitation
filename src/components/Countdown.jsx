import React, { useEffect, useState } from 'react'

export default function Countdown({ to }){
  const [left, setLeft] = useState({d:0,h:0,m:0,s:0})
  useEffect(()=>{
    const t = setInterval(()=>{
      const diff = Math.max(0, new Date(to) - new Date())
      const d = Math.floor(diff / (1000*60*60*24))
      const h = Math.floor(diff / (1000*60*60) % 24)
      const m = Math.floor(diff / (1000*60) % 60)
      const s = Math.floor(diff / 1000 % 60)
      setLeft({d,h,m,s})
    }, 1000)
    return ()=>clearInterval(t)
  },[to])
  return (
    <div className="grid grid-4" role="timer" aria-live="polite">
      {['DAY/S','HOUR/S','MINUTE/S','SECOND/S'].map((lbl, i)=>{
        const val = [left.d,left.h,left.m,left.s][i]
        return (
          <div key={lbl} className="card" style={{textAlign:'center'}}>
            <div className="h2">{String(val).padStart(2,'0')}</div>
            <div className="muted" style={{letterSpacing:'.2em', fontWeight:700}}>{lbl}</div>
          </div>
        )
      })}
    </div>
  )
}
