'use client' ;
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function UpdateTodo({ params }) {
  const id = params.todoId;
  const router = useRouter();
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Charger la todo existante
  useEffect(() => {
    fetch(`http://localhost:3001/todos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement');
        return res.json();
      })
      .then(data => {
        setText(data.text || '');
        setDescription(data.description || '');
        setStatus(data.completed ? 'completed' : data.inProgress ? 'inProgress' : 'pending');
        setLoading(false);
      })
      .catch(() => {
        setErrorMsg('Impossible de charger la tâche.');
        setLoading(false);
      });
  }, [id]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const updatedTodo = {
      text,
      description,
      completed: status === 'completed',
      inProgress: status === 'inProgress'
    };

    const res = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo)
    });

    if (!res.ok) {
      setErrorMsg('Erreur lors de la mise à jour.');
      return;
    }

    setSuccessMsg('Tâche mise à jour avec succès !');
    setTimeout(() => router.push('/todos'), 1500);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Modifier la tâche</h1>
      {errorMsg && <div className="mb-2 text-red-600">{errorMsg}</div>}
      {successMsg && <div className="mb-2 text-green-600">{successMsg}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Titre</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Statut</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={status}
            onChange={e => setStatus(e.target.value)}
            required
          >
            <option value="pending">En attente</option>
            <option value="inProgress">En cours</option>
            <option value="completed">Complétée</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
       </div>
  );
}