import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import config from './constants.js';
import './index.css';
import { testBackendConnection, createManifestWithLogging } from './services/apiService.js';

function App() {
  const [user, setUser] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Initialize Manifest SDK with the App ID from constants
  const manifest = new Manifest(config.APP_ID);

  useEffect(() => {
    // Check for an existing session on component mount
    manifest.from('User').me()
      .then(userData => {
        if (userData) {
          setUser(userData);
          loadFacts();
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [])

  useEffect(() => {
    // Enhanced backend connection test with detailed logging
    const testConnection = async () => {
      console.log('🚀 [APP] Starting enhanced backend connection test...');
      console.log('🔍 [APP] Backend URL:', 'https://no-code-app-4fdccd88-fdd4-421e-be0d-881c473d8b01.vercel.app');
      console.log('🔍 [APP] App ID:', '4fdccd88-fdd4-421e-be0d-881c473d8b01');
      
      setConnectionStatus('Testing connection...');
      
      const result = await testBackendConnection(3);
      setBackendConnected(result.success);
      
      if (result.success) {
        console.log('✅ [APP] Backend connection successful - proceeding with app initialization');
        setConnectionStatus('Connected');
        
        // Test Manifest SDK connection
        console.log('🔍 [APP] Testing Manifest SDK connection...');
        try {
          const manifest = createManifestWithLogging('4fdccd88-fdd4-421e-be0d-881c473d8b01');
          console.log('✅ [APP] Manifest SDK initialized successfully');
        } catch (error) {
          console.error('❌ [APP] Manifest SDK initialization failed:', error);
          setConnectionStatus('SDK Error');
        }
      } else {
        console.error('❌ [APP] Backend connection failed - app may not work properly');
        console.error('❌ [APP] Connection error:', result.error);
        setConnectionStatus('Connection Failed');
      }
    };
    
    testConnection();
  }, []);;

  const handleAuthError = (err) => {
    setError(err.message || 'An authentication error occurred.');
    setTimeout(() => setError(''), 5000);
  };

  const login = async (email, password) => {
    try {
      setError('');
      await manifest.login(email, password);
      const userData = await manifest.from('User').me();
      setUser(userData);
      loadFacts();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setError('');
      await manifest.from('User').signup({ name, email, password });
      await login(email, password);
    } catch (err) {
      handleAuthError(err);
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setFacts([]);
  };

  const loadFacts = async () => {
    try {
      const response = await manifest.from('CarrotFact').find({
        include: ['author'],
        sort: { createdAt: 'desc' }
      });
      setFacts(response.data);
    } catch (err) {
      console.error('Failed to load facts:', err);
      setError('Could not load carrot facts.');
    }
  };

  const createFact = async (factData) => {
    try {
      const newFact = await manifest.from('CarrotFact').create(factData);
      // Refetch facts to get the new one with author data included
      loadFacts();
    } catch (err) {
      console.error('Failed to create fact:', err);
      setError('Could not create the fact. Please check your input.');
    }
  };

  const updateFact = async (factId, factData) => {
    try {
      const updatedFact = await manifest.from('CarrotFact').update(factId, factData);
      setFacts(facts.map(f => (f.id === factId ? { ...f, ...updatedFact } : f)));
    } catch (err) {
      console.error('Failed to update fact:', err);
      setError('Could not update the fact.');
    }
  };

  const deleteFact = async (factId) => {
    try {
      await manifest.from('CarrotFact').delete(factId);
      setFacts(facts.filter(f => f.id !== factId));
    } catch (err) {
      console.error('Failed to delete fact:', err);
      setError('Could not delete the fact.');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Enhanced Backend Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-2 rounded-lg text-xs font-medium shadow-lg ${backendConnected ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{backendConnected ? '✅ Backend Connected' : '❌ Backend Disconnected'}</span>
          </div>
          <div className="text-xs opacity-75 mt-1">{connectionStatus}</div>
        </div>
      </div>
      
        {error && (
            <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                {error}
            </div>
        )}
        {user ? (
            <DashboardPage
                user={user}
                facts={facts}
                onLogout={logout}
                onCreateFact={createFact}
                onUpdateFact={updateFact}
                onDeleteFact={deleteFact}
            />
        ) : (
            <LandingPage onLogin={login} onSignup={signup} />
        )}
    </div>
  );
}

export default App;
