import { useLocation, Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"
import { selectCurrentAccessToken } from "./authSlice";

const RequireAuth = () => {
    const token = useSelector(selectCurrentAccessToken)
    const location = useLocation();

  return 
  (
    token
        ? <Outlet/>
        : <Navigate to="/login" state={{from: location}} replace />
  )
}


export default RequireAuth