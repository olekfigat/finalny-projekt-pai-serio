import React, { useState, useEffect } from "react";
import { Modal } from "./components/modal";
import { Pagination } from "./components/Paginacja";
import { TaskCard } from "./components/task";

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Projekt PAI z Reacta",
    category: "Nauka",
    priority: "Wysoki",
    completed: false,
  },
  {
    id: 2,
    title: "Zrobić zakupy",
    category: "Dom",
    priority: "Niski",
    completed: true,
  },
  {
    id: 3,
    title: "Odrobić matematykę",
    category: "Nauka",
    priority: "Średni",
    completed: false,
  },
  {
    id: 4,
    title: "Umyć samochód",
    category: "Hobby",
    priority: "Niski",
    completed: false,
  },
  {
    id: 5,
    title: "Przeczytać rozdział książki",
    category: "Hobby",
    priority: "Niski",
    completed: true,
  },
  {
    id: 6,
    title: "Nagrać filmik na YT",
    category: "Inne",
    priority: "Średni",
    completed: false,
  },
  {
    id: 7,
    title: "Spakować plecak",
    category: "Nauka",
    priority: "Wysoki",
    completed: false,
  },
  {
    id: 8,
    title: "Posprzątać pokój",
    category: "Dom",
    priority: "Średni",
    completed: true,
  },
  {
    id: 9,
    title: "Zapłacić rachunek",
    category: "Dom",
    priority: "Wysoki",
    completed: false,
  },
  {
    id: 10,
    title: "Zrobić trening",
    category: "Hobby",
    priority: "Średni",
    completed: false,
  },
  {
    id: 11,
    title: "Zaktualizować sterowniki",
    category: "Inne",
    priority: "Niski",
    completed: true,
  },
  {
    id: 12,
    title: "Przygotować obiad",
    category: "Dom",
    priority: "Średni",
    completed: false,
  },
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Wszystkie");
  const [sort, setSort] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Nauka");
  const [formPriority, setFormPriority] = useState("Średni");
  const [formCompleted, setFormCompleted] = useState(false);
  const [error, setError] = useState("");

  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  const openForm = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormTitle(task.title);
      setFormCategory(task.category);
      setFormPriority(task.priority);
      setFormCompleted(task.completed);
    } else {
      setEditingTask(null);
      setFormTitle("");
      setFormCategory("Nauka");
      setFormPriority("Średni");
      setFormCompleted(false);
    }
    setError("");
    setIsFormOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setError("Tytuł nie może być pusty!");
      return;
    }

    if (editingTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                title: formTitle,
                category: formCategory,
                priority: formPriority,
                completed: formCompleted,
              }
            : t,
        ),
      );
    } else {
      const newTask = {
        id: Date.now(),
        title: formTitle,
        category: formCategory,
        priority: formPriority,
        completed: formCompleted,
      };
      setTasks([newTask, ...tasks]);
    }
    setIsFormOpen(false);
  };

  const filteredTasks = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (category === "Wszystkie" ? true : t.category === category))
    .sort((a, b) => {
      const res = a.title.localeCompare(b.title);
      return sort === "asc" ? res : -res;
    });

  const totalPages = Math.ceil(filteredTasks.length / 5);
  const displayedTasks = filteredTasks.slice(
    (currentPage - 1) * 5,
    currentPage * 5,
  );

  return (
    <div className="container">
      <header>
        <h2>Menedżer Zadań</h2>
        <button className="btn btn-primary" onClick={() => openForm()}>
          + Dodaj zadanie
        </button>
      </header>

      <div className="controls">
        <input
          type="text"
          className="input-field"
          placeholder="Szukaj..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="input-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Wszystkie">Wszystkie kategorie</option>
          <option value="Nauka">Nauka</option>
          <option value="Dom">Dom</option>
          <option value="Hobby">Hobby</option>
          <option value="Inne">Inne</option>
        </select>
        <select
          className="input-field"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      {displayedTasks.length === 0 ? (
        <div className="empty">Brak zadań do wyświetlenia.</div>
      ) : (
        <div className="task-list">
          {displayedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openForm}
              onDelete={setTaskToDelete}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <Modal
        isOpen={isFormOpen}
        title={editingTask ? "Edytuj zadanie" : "Dodaj zadanie"}
        onClose={() => setIsFormOpen(false)}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Nazwa zadania:</label>
            <input
              type="text"
              className="input-field"
              style={{ width: "100%" }}
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            {error && <div className="error">{error}</div>}
          </div>

          <div className="form-group">
            <label>Kategoria:</label>
            <select
              className="input-field"
              style={{ width: "100%" }}
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
            >
              <option value="Nauka">Nauka</option>
              <option value="Dom">Dom</option>
              <option value="Hobby">Hobby</option>
              <option value="Inne">Inne</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priorytet:</label>
            <div className="radio-group">
              {["Niski", "Średni", "Wysoki"].map((p) => (
                <label key={p} style={{ fontWeight: "normal" }}>
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={formPriority === p}
                    onChange={(e) => setFormPriority(e.target.value)}
                  />{" "}
                  {p}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: "normal" }}>
              <input
                type="checkbox"
                checked={formCompleted}
                onChange={(e) => setFormCompleted(e.target.checked)}
              />{" "}
              Zadanie ukończone
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              marginTop: "15px",
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsFormOpen(false)}
            >
              Anuluj
            </button>
            <button type="submit" className="btn btn-primary">
              Zapisz
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!taskToDelete}
        title="Potwierdzenie"
        onClose={() => setTaskToDelete(null)}
      >
        <p>Czy na pewno chcesz usunąć zadanie "{taskToDelete?.title}"?</p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            marginTop: "15px",
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => setTaskToDelete(null)}
          >
            Anuluj
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
              setTaskToDelete(null);
            }}
          >
            Usuń
          </button>
        </div>
      </Modal>
    </div>
  );
}
