'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Page() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  // Chargement initial des todos
  useEffect(() => {
    fetch('http://localhost:3001/todos', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  // Fonction suppression
  async function handleDelete(todoId) {
    if (!confirm('Confirmez-vous la suppression de cette tâche ?')) return;

    const res = await fetch(`http://localhost:3001/todos/${todoId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      alert('Erreur lors de la suppression');
      return;
    }

    // Mise à jour de la liste localement
    setTodos(prev => prev.filter(todo => todo.id !== todoId));
    setSuccessMsg('Tâche supprimée avec succès !');

    // Effacer le message après 3 secondes
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          ✅ {successMsg}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h1 className="text-2xl font-bold">Mes Tâches</h1>
          <p className="text-blue-100 opacity-90">
            {todos.length} tâche{todos.length !== 1 ? 's' : ''} au total
          </p>
        </div>

        {/* Todo List */}
        <div className="divide-y divide-gray-200">
          {todos.map(todo => (
            <div key={todo.id} className="p-4 hover:bg-gray-50 transition-colors group flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`flex-shrink-0 h-5 w-5 rounded-full ${
                    todo.completed ? 'bg-green-500' : todo.inProgress ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  aria-hidden="true"
                />
                <div className="ml-3 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {todo.text}
                  </p>
                  <p className="text-xs text-gray-500">
                    {todo.completed ? 'Complétée' : todo.inProgress ? 'En cours' : 'En attente'}
                  </p>
                </div>
              </div>

             <div className="flex items-center gap-2">
      <Link
        href={`/todos/${todo.id}/update`}
        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
        title="Modifier"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" />
        </svg>
      </Link>
      <button
        onClick={() => handleDelete(todo.id)}
        className="p-1 text-red-600 hover:text-red-800 transition-colors"
        title="Supprimer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between text-sm text-gray-500">
          <span>Complétées: {todos.filter(t => t.completed).length}</span>
          <span>En cours: {todos.filter(t => t.inProgress).length}</span>
          <span>En attente: {todos.filter(t => !t.completed && !t.inProgress).length}</span>
        </div>

        {/* Add Button */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Link
            href="/todos/create"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une tâche
          </Link>
        </div>
      </div>
    </div>
  );
}
