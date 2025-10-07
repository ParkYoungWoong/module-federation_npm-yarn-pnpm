import React, { lazy, Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary"
import './App.css'

export default function App() {
  const RemoteHeader = lazy(() => import('remote/Header'))
  const RemoteMain = lazy(() => import('remote/Main'))
  const RemoteAside = lazy(() => import('remote/Aside'))
  return (
    <div className="app">
      <h1>Host App</h1>
      <div className="container">
        <div className="header">
          <ErrorBoundary fallback={<div>Error Remote Header</div>}>
            <Suspense fallback="Loading Remote Header...">
              <RemoteHeader />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="main">
          <ErrorBoundary fallback={<div>Error Remote Main</div>}>
            <Suspense fallback="Loading Remote Main...">
              <RemoteMain />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="aside">
          <ErrorBoundary fallback={<div>Error Remote Aside</div>}>
            <Suspense fallback="Loading Remote Aside...">
              <RemoteAside />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}