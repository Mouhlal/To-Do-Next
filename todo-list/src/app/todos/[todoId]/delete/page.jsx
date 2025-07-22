import { redirect } from "next/navigation";

export default async function DeleteTodo({ params }) {

const todoId = params.todoId;
const res = await fetch(`http://localhost:3001/todos/${todoId}`, {
  method: 'DELETE',
  cache: 'no-store',
});


  if (!res.ok) {
    throw new Error('Erreur lors de la suppression de la tâche');
  }

  redirect('/todos?deleted=1');
}
