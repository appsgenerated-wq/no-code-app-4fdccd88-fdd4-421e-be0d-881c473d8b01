import React, { useState } from 'react';

const LandingPage = ({ onLogin, onSignup }) => {
  const [authMode, setAuthMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };

  const toggleMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col md:flex-row">
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 text-center bg-white shadow-lg">
        <h1 className="text-5xl md:text-6xl font-bold text-orange-600 mb-4">Carrot Companion</h1>
        <p className="text-xl text-gray-700 mb-8">Your daily dose of carrot knowledge. Share and discover amazing facts about this vibrant vegetable.</p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">{authMode === 'login' ? 'Welcome Back!' : 'Create an Account'}</h2>
          {authMode === 'signup' && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition duration-300">
            {authMode === 'login' ? 'Login' : 'Sign Up'}
          </button>
          <p className="text-sm text-gray-600">
            {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button type="button" onClick={toggleMode} className="font-semibold text-orange-600 hover:underline ml-1">
              {authMode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
      <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590868309235-e5275752a48b?q=80&w=2187&auto=format&fit=crop)' }}>
      </div>
    </div>
  );
};

export default LandingPage;
