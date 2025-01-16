import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Join.scss';

export const Join = () => {

  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [codeError, setCodeError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(name);
    console.log(code);

    if (code.length != 4) {
      setCodeError("Must be 4 letters");
      return;
    }

    navigate('/dashboard');

    // https or socket search for room
    // validate room code exists
    // add user to room with name "name"
    // navigate user back to dashboard, set multiroom context to true or smth
  }

  return (
    <form onSubmit={handleJoin}>
      <h1> Join Party </h1>
      <p> Nickname </p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g,'').toUpperCase())}
        placeholder="DEREK"
        maxLength={10}
        required
      />
      <p> Code </p>
      <input
        value={code}
        onChange={(e) => {
          setCode(e.target.value.replace(/[^a-zA-Z]/g,'').toUpperCase());
          setCodeError("");
        }}
        placeholder="AAAA"
        type="text"
        required
        maxLength={4}
      />
      <p className="error">{codeError}</p>
      <button type="submit"> Join </button>
    </form>
  );
}
