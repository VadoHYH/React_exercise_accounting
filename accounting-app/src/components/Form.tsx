'use client';
import { useState } from 'react';

type FormProps = {
  onAddRecord: (record: { type: string; amount: number; note: string }) => void;
};

export default function Form({ onAddRecord }: FormProps) {
  const [type, setType] = useState('收入');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onAddRecord({ type, amount: parseInt(amount), note });
    setAmount('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {/* 將三個欄位排成一列 */}
      <div className="flex flex-wrap gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="收入">收入</option>
          <option value="支出">支出</option>
        </select>
        <input
          type="number"
          placeholder="金額"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-24"
          required
        />
        <input
          type="text"
          placeholder="說明"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[120px]"
        />
        <button
        type="submit"
        className="bg-gray-200 text-black px-4 py-2 rounded"
        >
          新增紀錄
        </button>
      </div>
    </form>
  );
}