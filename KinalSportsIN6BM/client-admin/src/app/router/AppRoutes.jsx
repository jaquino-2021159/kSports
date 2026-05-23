import { Routes, Route, Navigate } from "react-router-dom";

import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { VerifyEmailPage } from "../../features/auth/pages/VerifyEmailPage.jsx";
import { ResetPasswordPage } from "../../features/auth/pages/ResetPasswordPage.jsx";
import { Unauthorized } from "../../features/auth/pages/UnauthorizedPage.jsx";

import { DashboardPage } from "../layouts/DashboardPage.jsx";

import { Users } from "../../features/users/components/Users.jsx";
import { Fields } from "../../features/fields/components/Fields.jsx";

import { RoleGuard } from "./RoleGuard.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

export const AppRoutes = () => {
    return (
        <Routes>

            {/* ===================== */}
            {/* RUTAS PÚBLICAS */}
            {/* ===================== */}
            <Route path="/" element={<AuthPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* ===================== */}
            {/* RUTAS PROTEGIDAS */}
            {/* ===================== */}
            <Route element={<ProtectedRoute />}>
                <Route element={<RoleGuard allowedRoles={["ADMIN_ROLE"]} />}>

                    <Route path="/dashboard" element={<DashboardPage />}>
                        <Route index element={<Navigate to="/dashboard/users" replace />} />
                        <Route path="users" element={<Users />} />
                        <Route path="fields" element={<Fields />} />
                    </Route>

                </Route>
            </Route>

        </Routes>
    );
};