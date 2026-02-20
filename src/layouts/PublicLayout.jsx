import { Outlet } from "react-router-dom"
import { NavBar } from "./navbar/NavBar"

export const PublicLayout = () => {

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}