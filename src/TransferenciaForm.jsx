import { useState } from 'react';

export default function TransferenciaForm({ onTransferSuccess }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, amount }),
      });
      if (!res.ok) throw new Error('Error en la transferencia');
      const data = await res.json();
      //onTransferSuccess(data);
    } catch (error) {
      //onTransferSuccess({ message: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="De"
        required
      />
      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Para"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Monto"
        min="1"
        required
      />
      <button type="submit">Transferir</button>
    </form>
  );
}
