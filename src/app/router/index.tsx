import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './guards/ProtectedRoute'
import GuestRoute from './guards/GuestRoute'
import { routes } from '@/config/routes'
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus'
import { UnauthorizedPage } from '@/features/auth/pages/UnauthorizedPage'
import { TailwindTestPage } from '@/pages/TailwindTestPage'
import { RegisterChoicePage } from '@/features/auth/pages/RegisterChoicePage'
import { RegisterIndependentPage } from '@/features/auth/pages/RegisterIndependentPage'
import { RegisterFranchisePage } from '@/features/auth/pages/RegisterFranchisePage'
import { RegisterJoinPage } from '@/features/auth/pages/RegisterJoinPage'
import { AcceptInvitationPage } from '@/features/auth/pages/AcceptInvitationPage'
import { PendingApprovalPage } from '@/features/auth/pages/PendingApprovalPage'

const PlatformLayout = lazy(() => import('./layouts/PlatformLayout'))
const OrganizationLayout = lazy(() => import('./layouts/OrganizationLayout'))
const BranchLayout = lazy(() => import('./layouts/BranchLayout'))
const ClientLayout = lazy(() => import('./layouts/ClientLayout'))
const AuthLayout = lazy(() => import('./layouts/AuthLayout'))
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'))
const PublicLayout = lazy(() => import('./layouts/PublicLayout'))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })))
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })))
const VerifyEmailPage = lazy(() => import('@/features/auth/pages/VerifyEmailPage').then((m) => ({ default: m.VerifyEmailPage })))

const Placeholder = ({ title }: { title: string }) => (
  <div>
    <h2 className="text-lg font-medium">{title}</h2>
    <p className="mt-2 text-sm text-muted-foreground">Placeholder page</p>
  </div>
)

function HomeRedirect() {
  const { state, isLoading } = useAuthStatus()
  if (isLoading) return <div>Loading...</div>

  if (state.status === 'authenticated') {
    return <Navigate to={routes.dashboard.root} replace />
  }

  if (state.status === 'email-unverified') {
    return <Navigate to={routes.auth.verifyEmail} replace />
  }

  return <Navigate to={routes.auth.login} replace />
}

export default function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={routes.public.root} element={<PublicLayout />}>
          <Route index element={<HomeRedirect />} />
          <Route path={routes.public.unauthorized} element={<UnauthorizedPage />} />
          <Route path={routes.public.tailwindTest} element={<TailwindTestPage />} />
          <Route path={routes.public.joinInvite(':token')} element={<AcceptInvitationPage />} />
        </Route>

        <Route path={routes.auth.root} element={<GuestRoute><AuthLayout /></GuestRoute>}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterChoicePage />} />
          <Route path="register-independent" element={<RegisterIndependentPage />} />
          <Route path="register-franchise" element={<RegisterFranchisePage />} />
          <Route path="register-join" element={<RegisterJoinPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route path="join/:token" element={<AcceptInvitationPage />} />
          <Route path="pending-approval" element={<PendingApprovalPage />} />
        </Route>

        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path={routes.dashboard.root} element={<PlatformLayout />}>
            <Route index element={<Placeholder title="Platform Home" />} />
          </Route>
          <Route path={routes.dashboard.organizations} element={<OrganizationLayout />}>
            <Route index element={<Placeholder title="Organization Home" />} />
          </Route>
          <Route path={routes.dashboard.organizationBranches} element={<OrganizationLayout />}>
            <Route index element={<Placeholder title="Branches" />} />
          </Route>
          <Route path={routes.dashboard.branch} element={<BranchLayout />}>
            <Route index element={<Placeholder title="Branch Home" />} />
          </Route>
          <Route path={routes.dashboard.branchOrders} element={<BranchLayout />}>
            <Route index element={<Placeholder title="Commandes" />} />
          </Route>
          <Route path={routes.dashboard.branchMenu} element={<BranchLayout />}>
            <Route index element={<Placeholder title="Menu" />} />
          </Route>
          <Route path={routes.dashboard.branchKitchen} element={<BranchLayout />}>
            <Route index element={<Placeholder title="Cuisine" />} />
          </Route>
          <Route path={routes.dashboard.clients} element={<ClientLayout />}>
            <Route index element={<Placeholder title="Client Home" />} />
          </Route>
          <Route path={routes.dashboard.clientSupport} element={<ClientLayout />}>
            <Route index element={<Placeholder title="Support client" />} />
          </Route>
          <Route path={routes.dashboard.settings} element={<Placeholder title="Paramètres" />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
