'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { pOSTLogin } from '@/api/gourmetAPI';
import useAuthStore from '@/app/stores/auth-store';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setAuthState } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await pOSTLogin({ username, password }, undefined, {
        credentials: 'include',
      });
      if ('token' in res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setAuthState({ isConnected: true, username });
        router.push('/');
      } else {
        throw new Error('Login failed: ' + res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
