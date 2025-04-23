import { useState, useEffect } from "react";

const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const meals = ["Frühstück", "Mittagessen", "Abendessen", "Snack"];

const defaultPlan = days.flatMap(day =>
  meals.map(meal => ({
    tag: day,
    mahlzeit: meal,
    erledigt: false,
    notizen: ""
  }))
);

export default function TrainingsApp() {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("mealPlan");
    if (saved) {
      setPlan(JSON.parse(saved));
    } else {
      setPlan(defaultPlan);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(plan));
  }, [plan]);

  const toggleErledigt = (index) => {
    const newPlan = [...plan];
    newPlan[index].erledigt = !newPlan[index].erledigt;
    setPlan(newPlan);
  };

  const updateNote = (index, value) => {
    const newPlan = [...plan];
    newPlan[index].notizen = value;
    setPlan(newPlan);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Trainings- & Ernährungsplan</h1>
      <table className="w-full border">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2">Tag</th>
            <th className="p-2">Mahlzeit</th>
            <th className="p-2">Erledigt</th>
            <th className="p-2">Notizen</th>
          </tr>
        </thead>
        <tbody>
          {plan.map((item, index) => (
            <tr
              key={index}
              className={item.erledigt ? "bg-gray-800 text-white" : "bg-white"}
            >
              <td className="border p-2">{item.tag}</td>
              <td className="border p-2">{item.mahlzeit}</td>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={item.erledigt}
                  onChange={() => toggleErledigt(index)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full p-1 border"
                  value={item.notizen}
                  onChange={(e) => updateNote(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}