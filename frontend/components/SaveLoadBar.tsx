"use client"
import { useState } from "react"
import { usePortfolio } from "../hooks/usePortfolio"

export default function SaveLoadBar() {
  const [state, dispatch] = usePortfolio()
  const [msg, setMsg] = useState("")

  async function save() {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    })
    setMsg(resp.ok ? "saved!" : "error")
  }

  async function load() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/portfolio/${state.userId}`
    )
    if (res.ok) {
      const data = await res.json()
      dispatch({ type: "LOAD", state: data })
      setMsg("loaded")
    } else {
      setMsg("not found")
    }
  }

  return (
    <div className="my-4 flex gap-4">
      <button onClick={save} className="btn">
        💾 Save
      </button>
      <button onClick={load} className="btn">
        🔄 Load
      </button>
      <span>{msg}</span>
    </div>
  )
}
