import React from 'react'
import Calendar from './components/Calendar'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Simple Calendar App</h1>
        <p className="text-gray-600">A clean and functional calendar</p>
      </header>
      
      <main>
        <Calendar />
      </main>
    </div>
  )
}

export default App