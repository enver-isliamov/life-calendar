// Компонент LifeCalendar: строит календарь жизни по неделям для одного или пары
import React from "react";
import "./LifeCalendar.css";

// Вспомогательная функция: вычисляет возраст по дате рождения и году
function getAge(birthDate, year) {
  const birth = new Date(birthDate);
  return year - birth.getFullYear();
}

// Вспомогательная функция: возвращает номер недели в году для даты
function getWeekNumber(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = (date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000));
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) + 1;
}

// Основной компонент календаря
export default function LifeCalendar({
  mode,
  shape,
  person1,
  person2,
  maxAge = 86
}) {
  // Получаем даты рождения
  const dob1 = new Date(person1.dob);
  const dob2 = mode === "couple" ? new Date(person2.dob) : null;

  // Определяем первый и последний год для отображения
  const startYear = Math.min(dob1.getFullYear(), dob2 ? dob2.getFullYear() : dob1.getFullYear());
  const endYear = startYear + maxAge;

  // Для текущей даты (подсветка прожитых недель)
  const now = new Date();

  // Массив лет для отображения строк календаря
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  // Генерируем календарь по годам и неделям
  return (
    <div className="life-calendar">
      {/* Заголовки месяцев */}
      <div className="calendar-header">
        <div className="calendar-label year-label">Год</div>
        <div className="calendar-label age-label">Возраст</div>
        {[...Array(12)].map((_, i) => (
          <div key={i} className="calendar-label month-label">
            {["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"][i]}
          </div>
        ))}
      </div>
      {/* Основная сетка */}
      <div className="calendar-body">
        {years.map((year, idx) => {
          // Возраст для каждого партнера
          const age1 = getAge(dob1, year);
          const age2 = dob2 ? getAge(dob2, year) : null;

          // Для пары: определяем, чей это год (до рождения младшего - только старший, после смерти старшего - только младший)
          let rowType = "shared";
          if (mode === "couple") {
            if (year < dob1.getFullYear() || year < dob2.getFullYear()) {
              rowType = year < dob1.getFullYear() ? "partner2" : "partner1";
            } else if (year < Math.max(dob1.getFullYear(), dob2.getFullYear())) {
              rowType = dob1.getFullYear() < dob2.getFullYear() ? "partner2" : "partner1";
            }
          }

          // Для каждого года - 52 недели
          return (
            <div className="calendar-row" key={year}>
              <div className="calendar-label year-label">{year}</div>
              <div className="calendar-label age-label">
                {mode === "couple"
                  ? `${age1 >= 0 ? age1 : ""} / ${age2 >= 0 ? age2 : ""}`
                  : age1 >= 0 ? age1 : ""}
              </div>
              {[...Array(52)].map((_, weekIdx) => {
                // Для подсветки прожитых недель
                let isPast = false;
                if (mode === "single") {
                  if (
                    year < now.getFullYear() ||
                    (year === now.getFullYear() && weekIdx + 1 <= getWeekNumber(now))
                  ) {
                    isPast = year > dob1.getFullYear() ||
                      (year === dob1.getFullYear() && weekIdx + 1 >= getWeekNumber(dob1));
                  }
                } else if (mode === "couple") {
                  // Для пары - подсвечиваем для обоих
                  isPast =
                    ((year > dob1.getFullYear() ||
                      (year === dob1.getFullYear() && weekIdx + 1 >= getWeekNumber(dob1))) &&
                      (year > dob2.getFullYear() ||
                        (year === dob2.getFullYear() && weekIdx + 1 >= getWeekNumber(dob2)))) &&
                    (year < now.getFullYear() ||
                      (year === now.getFullYear() && weekIdx + 1 <= getWeekNumber(now)));
                }

                // Для пары - тип ячейки (общая, только для одного)
                let cellType = "shared";
                if (mode === "couple") {
                  if (year < dob1.getFullYear() || (year === dob1.getFullYear() && weekIdx + 1 < getWeekNumber(dob1))) {
                    cellType = "partner2";
                  } else if (
                    year < dob2.getFullYear() ||
                    (year === dob2.getFullYear() && weekIdx + 1 < getWeekNumber(dob2))
                  ) {
                    cellType = "partner1";
                  }
                }

                return (
                  <div
                    key={weekIdx}
                    className={`calendar-cell ${shape} ${cellType} ${isPast ? "past" : ""}`}
                    title={`Год: ${year}, Неделя: ${weekIdx + 1}`}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
