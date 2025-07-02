"use client"
import Section from "../components/Section"
import SaveLoadBar from "../components/SaveLoadBar"
import { PortfolioProvider } from "../context/PortfolioContext"
import { usePortfolio } from "../hooks/usePortfolio"

function Builder() {
  const [state, dispatch] = usePortfolio()

  function addSection() {
    const name = prompt("Section Name?")
    if (name) dispatch({ type: "ADD_SECTION", name })
  }

  return (
    <div className="p-8">
      <input
        value={state.title}
        onChange={e => dispatch({ type: "SET_TITLE", title: e.target.value })}
        placeholder="Portfolio Title"
        className="text-3xl font-bold outline-none border-b-2"
      />
      <SaveLoadBar />
      {state.sections.map(s => (
        <Section key={s.name} name={s.name} />
      ))}
      <button onClick={addSection} className="btn mt-4">
        ➕ Add Section
      </button>
    </div>
  )
}

export default function Page() {
  return (
    <PortfolioProvider>
      <Builder />
    </PortfolioProvider>
  )
}
