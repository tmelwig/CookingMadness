'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { pOSTLogin } from '@/api/gourmetAPI';
import useAuthStore from '@/app/stores/auth-store';
import Text from '@/app/components/Text';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { connect } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await pOSTLogin({ username, password }, undefined, {
        credentials: 'include',
      });
      if ('token' in res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        connect(res.data.token);
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
        <Text variant="title-h1" className="mb-4">
          Se connecter
        </Text>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-500 rounded"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-500 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--bg-tertiary)] text-white rounded hover:bg-[var(--bg-light-tertiary)]"
        >
          Connexion
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
