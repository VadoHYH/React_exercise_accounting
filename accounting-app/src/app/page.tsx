'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user, register, login, logout } = useAuth();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      alert("請填寫 Email 與密碼");
      return;
    }
  
    try {
      await login(loginEmail, loginPassword);
    } catch (err: any) {
      console.error(err);
      alert(`登入失敗：${err.message}`);
    }
  };

  const handleRegister = async () => {
    if (!signupEmail || !signupPassword) {
      alert("請填寫 Email 與密碼");
      return;
    }
  
    if (signupPassword.length < 6) {
      alert("密碼長度至少為 6 字元");
      return;
    }
  
    try {
      await register(signupEmail, signupPassword); // 自動登入
    } catch (err: any) {
      console.error(err);
      alert(`註冊失敗：${err.message}`);
    }
  };

  const handleStart = () => {
    router.push('/accounting');
  };


  return (
    <>
      {/* 頁首 */}
      <header className="bg-gray-800 text-white py-6">
        <h1 className="text-center text-2xl font-bold">React 練習用專案</h1>
      </header>

      {/* 登入/註冊區塊 */}
      <main className="flex flex-col items-center min-h-screen p-4 py-10" >
      {user ? (
          <div className="text-center">
            <p className="mb-4">✅ 已成功使用 <strong>{user.email}</strong> 登入</p>
            <div className="flex flex-col gap-4">
              <button onClick={handleStart} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                立刻開始
              </button>
              <button onClick={logout} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
                登出
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 登入區塊 */}
            <section className="mb-10 w-full max-w-sm">
              <h2 className="text-xl font-bold mb-4 text-center">登入系統</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="email">電郵</label>
                  <input
                    type="email"
                    placeholder="請輸入電子郵件"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="border p-2 rounded flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="login-password">密碼</label>
                  <input
                    type="password"
                    placeholder="請輸入密碼"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="border p-2 rounded flex-1"
                  />
                </div>
                <button
                onClick={handleLogin} 
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 rounded"
                >
                  登入
                </button>
              </div>
            </section>

            {/* 註冊區塊 */}
            <section className="w-full max-w-sm">
              <h2 className="text-xl font-bold mb-4 text-center">註冊帳戶</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="email">電郵</label>
                  <input
                    type="email"
                    placeholder="請輸入電子郵件"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="border p-2 rounded flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="signup-password">密碼</label>
                  <input
                    type="password"
                    placeholder="請輸入密碼"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="border p-2 rounded flex-1"
                  />
                </div>
                <button 
                onClick={handleRegister}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 rounded"
                >
                  註冊
                </button>
              </div>
            </section>
          </>
         )}
      </main>
    </>
  );
}