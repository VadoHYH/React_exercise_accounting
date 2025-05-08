'use client';
import React from 'react'
import { useRouter } from 'next/navigation';


type ListProps = {
  records: { type: string; amount: number; note: string }[];
};

export default function List({ records }: ListProps) {
  const router = useRouter();
  const total = records.reduce((sum, r) => sum + (r.type === '收入' ? r.amount : -r.amount), 0);

  return (
    <div className="space-y-4 py-5">
      {/* 標題置中 */}
      <h2 className="text-lg font-semibold text-center">紀錄</h2>

      {records.map((r, i) => (
        <div
          key={i}
          className="border p-2 rounded flex justify-between items-center"
        >
          <div className="w-32 text-left">
            {r.type}：{r.amount} 元
          </div>

          <div className="flex-1 text-center">
            {r.note || '—'}
          </div>

          <div className="w-24 text-right">
            <button className="bg-gray-200 text-black px-4 py-1 rounded">
              刪除
            </button>
          </div>
        </div>
      ))}

      {/* 小計 */}
      <div className="mt-4 font-bold text-center">小計：{total} 元</div>

      {/* 返回首頁按鈕置中 */}
      <div className="text-center">
        <button 
        onClick={() => router.push('/')}
        className="bg-gray-200 text-black px-4 py-1 rounded"
        >
          返回首頁
        </button>
      </div>
    </div>
  );
}
