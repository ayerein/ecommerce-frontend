import { Navigate, Outlet } from "react-router-dom"
import { Loader } from '../Loader'
import { useUser } from "../../context/User/useUser";

export const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useUser()

    if (loading) return <Loader />

    if (!user) {
        return <Navigate to="/auth" replace />
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}