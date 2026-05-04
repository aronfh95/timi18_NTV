import { useCallback, useEffect, useRef, useState } from "react";

export function Aefingar() {
  const [count, setCounter] = useState(0);
  const [color, setColor] = useState("blue");
  const focusRef = useRef<HTMLInputElement>(null);

  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [asyncUsers, setAsyncUsers] = useState<any>([]);

  useEffect(() => {
    console.log("renderast við hvert re-render eða state update");
  });

  useEffect(() => {
    console.log("renderast alltaf bara einu sinni í byrjun");
  }, []);

  useEffect(() => {
    console.log("count breyttist: ", count);
  }, [count]);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.sort()))
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setAsyncUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  });

  return (
    <div className="lesson-page">
      <header className="lesson-hero">
        Við ætlum að fara í dæmi af: useState, useEffect, useRef og cleanup
      </header>

      <section>
        <div id="lesson-1" className="demo-card">
          <p>Skoðum hvernig state og rendering haga sér</p>
          <button className="btn" onClick={() => setCounter((c) => c + 1)}>
            +
          </button>
          <div className="stat">{count}</div>
          <button className="btn" onClick={() => setCounter((c) => c - 1)}>
            -
          </button>
        </div>
        <div className="demo-card">
          <button className="btn" onClick={() => setColor("blue")}>
            BLUE
          </button>
          <div>{color}</div>
          <button className="btn" onClick={() => setColor("red")}>
            RED
          </button>
        </div>
      </section>
      <section>
        <div>
          <input
            ref={focusRef}
            className="field"
            placeholder="Fæ focus þegar þú smellir á takkan"
          />
          <button
            className="btn btn-primary"
            onClick={() => focusRef.current?.focus()}
          >
            setja focus
          </button>
        </div>
      </section>
      <section>
        <div className="demo-card">
          <h3>Notendur</h3>
          <div>
            <button className="btn" onClick={fetchUsers}>
              {" "}
              Sækja notendur...{" "}
            </button>
          </div>
          <div>
            {loading && <p>Hleð notendur...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
              <ul className="demo-list">
                {users.map((user) => (
                  <li>
                    <strong>{user.name}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="demo-card">
          {asyncUsers.map((user) => (
            <p>{user.name}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
