import React, { useState, useEffect } from "react";

export function CounterLogger() {
  const [count, setCount] = useState(0);
  //  Bæta við useEffect sem loggar út gildið count þegar count breytist
  // Bæta við onClick virkni í buttons

  useEffect(() => {
    console.log("count: ", count);
  }, [count]);
  return (
    <div>
      <h3>Verkefni 1 – Counter með log</h3>
      <p>Gildi: {count}</p>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <button style={{ marginLeft: 8 }} onClick={() => setCount((c) => c + 1)}>
        +
      </button>
    </div>
  );
}

export function DocumentTitleGreeter() {
  const [name, setName] = useState("");
  // Bæta við useEffect sem uppfærir document.title Í Halló, {name} þegar name breytist, ef ekkert name nota þá Halló, gestur
  // keyrir þegar name breytist
  //    bæta við onchange virkni í input til að uppfæra name
  useEffect(() => {
    document.title = `Halló, ${name || "gestur"}`;
  }, [name]);
  return (
    <div>
      <h3>Verkefni 2 – Uppfæra document.title</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Sláðu inn nafnið þitt"
      />
      <p>Halló, {name || "gestur"}!</p>
    </div>
  );
}

export function SecondTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  //  Þegar component mountast:
  // 	•	Býr til id = window.setInterval(() => { kóði hér sem bætir 1 við seconds }, 1000)
  // 	•	Notaðu useEffect með cleanup -> window.clearInterval(id) (return) til að:
  // 	•	Hreinsa interval þegar component unmountast
  // 	•	Bættu við Stop hnapp sem stoppar timerinn
  // Hint: Notaðu useEffect(() => { kóðið sem á að keyra; return () => {cleanup hér}; }, []) og geymdu interval id í breytu inni í effect.
  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [running]);
  return (
    <div>
      <h3>Verkefni 3 – Sekúnduteljari</h3>
      <p>Liðnar sekúndur: {seconds}</p>
      <button onClick={() => setRunning(true)} disabled={running}>
        Start
      </button>
      <button
        onClick={() => setRunning(false)}
        disabled={!running}
        style={{ marginLeft: 8 }}
      >
        Stop
      </button>
      <button onClick={() => setSeconds(0)} style={{ marginLeft: 8 }}>
        Reset
      </button>
    </div>
  );
}
export function FakeFetch() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //
  //  Býr til setTimeout sem setur data sem  "Gögn sótt! 🎉"  ef það er success annars "Eitthvað fór úrskeiðis 😢" eftir 1500ms með að nota success =Math.random() < 0.7
  //  Bættu við cleanup -> window.clearTimeout(id) (return) til að hreinsa timeout þegar component unmountast
  useEffect(() => {
    const id = window.setTimeout(() => {
      const success = Math.random() < 0.7;

      if (success) {
        setData("Gögn sótt! 🎉");
      } else {
        setError("Eitthvað fór úrskeiðis 😢");
      }

      setLoading(false);
    }, 1500);

    return () => {
      window.clearTimeout(id);
    };
  }, []);
  return (
    <div>
      <h3>Verkefni 4 – Fake fetch með useEffect</h3>
      {loading && <p>Hleð...</p>}
      {!loading && error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && data && <p>{data}</p>}
    </div>
  );
}

export function RealFetch() {
  const [users, setUsers] = useState<
    Array<{ id: number; name: string; email: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Hefur þrjú state:
  // 	data: string | null
  // 	loading: boolean
  // 	error: string | null
  // 	Notar useEffect (tómur dependency listi []) til að sækja gögn frá https://jsonplaceholder.typicode.com/users:
  // Passa upp á loading, error og users state
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) {
          throw new Error("Ekki tókst að sækja gögn");
        }

        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Óþekkt villa");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);
  return (
    <div>
      <p>Test API lausn – birta notendur</p>

      {loading && <p>Hleð...</p>}
      {!loading && error && <p style={{ color: "red" }}>Villa: {error}</p>}

      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> – {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Timaverkefni() {
  return (
    <div style={{ padding: "1.5rem", maxWidth: 800 }}>
      <h2>useEffect – æfingar</h2>

      <CounterLogger />
      <hr />
      <DocumentTitleGreeter />
      <hr />
      <SecondTimer />
      <hr />
      <FakeFetch />
      <hr />
      <RealFetch />
    </div>
  );
}
