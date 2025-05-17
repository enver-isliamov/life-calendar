import React, { useState } from "react";
import "./App.css";
import LifeCalendar from "./LifeCalendar";

// Главный компонент приложения
function App() {
  // Состояния для персонализации
  const [surname, setSurname] = useState("Фамилия");
  const [motto, setMotto] = useState("Мотивирующая фраза");
  const [shape, setShape] = useState("circle"); // форма ячеек
  const [mode, setMode] = useState("single"); // single или couple

  // Для пары - даты рождения и имена
  const [person1, setPerson1] = useState({ name: "Партнер 1", dob: "1990-01-01" });
  const [person2, setPerson2] = useState({ name: "Партнер 2", dob: "1992-01-01" });

  return (
    <div className="container">
      {/* Фамилия */}
      <input
        className="surname"
        value={surname}
        onChange={e => setSurname(e.target.value)}
        placeholder="Введите фамилию"
      />

      {/* Переключатель режима */}
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

      {/* Настройки для пары */}
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

      <LifeCalendar
  mode={mode}
  shape={shape}
  person1={person1}
  person2={person2}
  maxAge={86}
/>


      {/* Мотивирующая фраза */}
      <input
        className="motto"
        value={motto}
        onChange={e => setMotto(e.target.value)}
        placeholder="Введите мотивирующую фразу"
      />

      {/* Кнопка для будущей покупки/скачивания */}
      <button className="download-btn" disabled>
        Скачать PNG или PDF (скоро)
      </button>
    </div>
  );
}

export default App;
