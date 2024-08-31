import React, { useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { AuthContext } from '@/contexts/auth-context';

const AuthModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const authPromise = isLogin ? login(email, password) : register(username, email, password);

    authPromise
      .then(() => {
        onClose();
      })
      .catch(() => {
        setError('Ошибка аутентификации. Пожалуйста, проверьте ваши данные.');
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isLogin ? 'Вход' : 'Регистрация'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {!isLogin && (
            <TextField
              autoFocus
              margin="dense"
              label="Имя пользователя"
              type="text"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Пароль"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Перейти к регистрации' : 'Перейти ко входу'}
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AuthModal;
