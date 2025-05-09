'use client';
import Form from '@/components/Form';
import List from '@/components/List';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

interface Record {
  id: string;
  type: string;
  amount: number;
  note: string;
}

export default function AccountingPage() {
  const { user,loading } = useAuth();
  const router = useRouter();
  const [records, setRecords] = useState<Record[]>([]);

  if (!user) return null; // 等待 redirect，不顯示頁面

  // 若未登入，自動導回首頁
  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    const q = query(
      collection(db, 'records'),
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newRecords = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Record, 'id'>), // 明確去除 id 再加入
      }));
      setRecords(newRecords);
    });

    return () => unsubscribe();
  }, [user, router]);

  

  // 新增記帳紀錄並存入 Firestore
  const handleAddRecord = async (record: Omit<Record, 'id'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'records'), {
        ...record,
        uid: user.uid,
        createdAt: new Date(), // Firestore 時間戳
      });
    } catch (err) {
      console.error('儲存失敗', err);
      alert('記帳儲存失敗，請稍後再試');
    }
  };

  

  return (
    <main>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-center text-base font-semibold mb-4 pb-10">您已經使用
          <strong>{user.email}</strong>登入
        </h1>
        <Form onAddRecord={handleAddRecord} />
      </div>
      <div className='border-1 border-gray-400 '></div>
      <div className="p-6 max-w-xl mx-auto">
        <List records={records} />
      </div>
    </main>
  );
}
