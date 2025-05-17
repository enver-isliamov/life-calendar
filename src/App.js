// Главный компонент приложения Life Calendar
import React, { useState } from "react";
import "./App.css";
import LifeCalendar from "./LifeCalendar";

function App() {
  // Состояния для персонализации
  const [surname, setSurname] = useState("Фамилия");
  const [motto, setMotto] = useState("Мотивирующая фраза");
  const [shape, setShape] = useState("circle"); // форма ячеек: "circle" или "rounded"
  const [mode, setMode] = useState("single"); // режим: "single" (один человек) или "couple" (пара)

  // Данные для первого и второго человека (для режима пары)
  const [person1, setPerson1] = useState({ name: "Партнер 1", dob: "1990-01-01" });
  const [person2, setPerson2] = useState({ name: "Партнер 2", dob: "1992-01-01" });

  return (
    <div className="container">
      {/* Ввод фамилии (отображается сверху) */}
      <input
        className="surname"
        value={surname}
        onChange={e => setSurname(e.target.value)}
        placeholder="Введите фамилию"
      />

      {/* Переключатель режима: для одного или для пары */}
      <div className="mode-switch">
        <label>
          <input
            type="radio"
            checked={mode === "single"}
            onChange={() => setMode("single")}
          />
          Для одного
        </label>
        <label>
          <input
            type="radio"
            checked={mode === "couple"}
            onChange={() => setMode("couple")}
          />
          Для пары
        </label>
      </div>

      {/* Настройки для пары: имена и даты рождения */}
      {mode === "couple" && (
        <div className="couple-settings">
          <div>
            <input
              value={person1.name}
              onChange={e => setPerson1({ ...person1, name: e.target.value })}
              placeholder="Имя 1"
            />
            <input
              type="date"
              value={person1.dob}
              onChange={e => setPerson1({ ...person1, dob: e.target.value })}
            />
          </div>
          <div>
            <input
              value={person2.name}
              onChange={e => setPerson2({ ...person2, name: e.target.value })}
              placeholder="Имя 2"
            />
            <input
              type="date"
              value={person2.dob}
              onChange={e => setPerson2({ ...person2, dob: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Переключатель формы ячеек */}
      <div className="shape-switch">
        <button onClick={() => setShape("circle")} className={shape === "circle" ? "active" : ""}>
          Кружки
        </button>
        <button onClick={() => setShape("rounded")} className={shape === "rounded" ? "active" : ""}>
          Квадратики
        </button>
      </div>

      {/* Сам календарь жизни */}
      <LifeCalendar
        mode={mode}
        shape={shape}
        person1={person1}
        person2={person2}
        maxAge={86}
      />

      {/* Ввод мотивирующей фразы (отображается снизу) */}
      <input
        className="motto"
        value={motto}
        onChange={e => setMotto(e.target.value)}
        placeholder="Введите мотивирующую фразу"
      />

      {/* Кнопка для скачивания (экспорт добавим позже) */}
      <button className="download-btn" disabled>
        Скачать PNG или PDF (скоро)
      </button>
    </div>
  );
}

export default App;
