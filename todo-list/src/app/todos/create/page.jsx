'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTodo() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: title,
          description,
          status,
          completed: status === 'completed',
          inProgress: status === 'in-progress'
        })
      });

      if (!res.ok) throw new Error('Erreur lors de la création');

      // Redirection après succès
      router.push('/todos');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Créer une nouvelle tâche</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Titre de la tâche"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="pending">En attente</option>
          <option value="completed">Complétée</option>
          <option value="in-progress">En cours</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Création...' : 'Créer la tâche'}
        </button>
      </form>
    </div>
  );
}
