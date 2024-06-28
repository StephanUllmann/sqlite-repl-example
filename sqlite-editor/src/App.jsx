import { useRef } from 'react';

const sqlExample = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  age INTEGER,
  email TEXT UNIQUE
);
INSERT INTO users (firstname, lastname, age, email) VALUES
  ('John', 'Doe', 30, 'john.doe@example.com'),
  ('Jane', 'Smith', 25, 'jane.smith@example.com'),
  ('Michael', 'Lee', 37, 'michael.lee@example.com');
SELECT * FROM users;`;

function App() {
  const iFrameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.sql.value;
    iFrameRef.current.contentWindow.postMessage(message, '*');
  };

  return (
    <div className='grid grid-cols-2 gap-5 h-[95dvh] min-w-full place-content-center'>
      <form className='flex min-w-full h-[95dvh]  flex-col' onSubmit={handleSubmit}>
        <textarea name='sql' id='sql' className='min-h-full' defaultValue={sqlExample}></textarea>
        <button>Run</button>
      </form>
      <iframe
        height='100%'
        width='100%'
        ref={iFrameRef}
        src='http://localhost:3000'
        sandbox='allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-top-navigation'
        title='SQLite Output'
      ></iframe>
    </div>
  );
}

export default App;
