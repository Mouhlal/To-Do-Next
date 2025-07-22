## 📝 Next.js Todo List App — CRUD avec JSON Server & TailwindCSS

Ce projet est une application de gestion de tâches (Todo List) développée avec **Next.js**, stylisée avec **Tailwind CSS**, et utilisant **JSON Server** comme API REST simulée. Il permet aux utilisateurs de :

* ➕ **Créer** une nouvelle tâche
* 📋 **Lire** la liste des tâches existantes
* ✏️ **Mettre à jour** une tâche (texte, statut)
* 🗑️ **Supprimer** une tâche avec confirmation

### 🔧 Technologies utilisées :

* **Next.js** (App Router)
* **React Hooks** (`useState`, `useEffect`, `useRouter`, etc.)
* **Tailwind CSS** (design moderne et responsive)
* **JSON Server** (simulateur d’API backend REST)
* **Fetch API** pour la communication HTTP

### 📁 Fonctionnalités principales :

* Interface utilisateur simple et responsive
* Architecture claire avec séparation des composants
* Utilisation du rendu côté serveur (SSR) et côté client (CSR) selon les besoins
* Confirmation avant suppression d'une tâche
* Gestion des erreurs de requêtes API

### 🚀 Lancement du projet en local :

1. Cloner le dépôt :

```bash
git clone https://github.com/votre-utilisateur/todo-list.git
cd todo-list
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer le serveur JSON :

```bash
npx json-server --watch db.json --port 3001
```

4. Lancer l'application Next.js :

```bash
npm run dev
```

---

