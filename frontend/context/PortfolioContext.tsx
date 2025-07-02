"use client"
import { createContext, useReducer, ReactNode } from "react"

export interface MediaItem {
  id: string
  type: "image" | "video"
  s3Key: string
  url: string
  title: string
  description?: string
  metadata: Record<string, any>
}
export interface Section {
  name: string
  items: MediaItem[]
}
interface State {
  userId: string
  title: string
  sections: Section[]
}
type Action =
  | { type: "ADD_SECTION"; name: string }
  | { type: "ADD_ITEM"; section: string; item: MediaItem }
  | { type: "SET_TITLE"; title: string }
  | { type: "LOAD"; state: State }

const initial: State = { userId: "demoUser", title: "", sections: [] }
export const PortfolioContext = createContext<[State, React.Dispatch<Action>]>([
  initial,
  () => {},
])

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.title }
    case "ADD_SECTION":
      return { ...state, sections: [...state.sections, { name: action.name, items: [] }] }
    case "ADD_ITEM":
      return {
        ...state,
        sections: state.sections.map(s =>
          s.name === action.section ? { ...s, items: [...s.items, action.item] } : s
        ),
      }
    case "LOAD":
      return action.state
    default:
      return state
  }
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const value = useReducer(reducer, initial)
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}
