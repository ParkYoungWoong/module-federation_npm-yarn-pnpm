import React, { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary"

export default function App() {
  const RemoteHeader = React.lazy(() => import('remote/Header'))
  const RemoteNav = React.lazy(() => import('remote/Nav'))
  const RemoteMain = React.lazy(() => import('remote/Main'))
  return (
    <div>
      <h1>Host App</h1>
      <ErrorBoundary fallback={<div>Error Remote Header</div>}>
        <Suspense fallback="Loading Remote Header...">
          <RemoteHeader />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Error Remote Nav</div>}>
        <Suspense fallback="Loading Remote Nav...">
          <RemoteNav />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Error Remote Main</div>}>
        <Suspense fallback="Loading Remote Main...">
          <RemoteMain />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}