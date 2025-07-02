import { useContext } from "react"
import { PortfolioContext } from "../context/PortfolioContext"

export const usePortfolio = () => useContext(PortfolioContext)
