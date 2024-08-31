'use client';

import React, { useContext, useState } from 'react';
import AuthModal from '@/components/auth/auth-modal';
import { AuthContext } from '@/contexts/auth-context';

const AuthModalWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { logout} = useContext(AuthContext);

  return (
    <>
      <button onClick={openModal}>Войти</button>
      <button onClick={logout}>logout</button>
      <AuthModal open={isOpen} onClose={closeModal} />
    </>
  );
};

export default AuthModalWrapper;