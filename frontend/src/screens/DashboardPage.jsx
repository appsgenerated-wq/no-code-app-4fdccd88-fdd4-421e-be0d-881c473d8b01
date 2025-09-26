import React, { useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, facts, onLogout, onCreateFact, onUpdateFact, onDeleteFact }) => {
  const [newFact, setNewFact] = useState({ title: '', content: '', category: 'Fun Fact' });
  const [editingFact, setEditingFact] = useState(null);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    onCreateFact(newFact);
    setNewFact({ title: '', content: '', category: 'Fun Fact' });
  };
  
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdateFact(editingFact.id, { title: editingFact.title, content: editingFact.content, category: editingFact.category });
    setEditingFact(null);
  };

  const startEditing = (fact) => {
    setEditingFact({ ...fact });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">Carrot Companion</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.name}!</span>
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 transition">Admin Panel</a>
            <button onClick={onLogout} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Share a New Carrot Fact</h2>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <input type="text" placeholder="Fact Title" value={newFact.title} onChange={(e) => setNewFact({ ...newFact, title: e.target.value })} className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500" required />
            <textarea placeholder="What's the fact?" value={newFact.content} onChange={(e) => setNewFact({ ...newFact, content: e.target.value })} className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500" required />
            <select value={newFact.category} onChange={(e) => setNewFact({ ...newFact, category: e.target.value })} className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500">
              <option>Nutritional</option>
              <option>Historical</option>
              <option>Fun Fact</option>
              <option>Culinary</option>
            </select>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Post Fact</button>
          </form>
        </div>

        <div className="space-y-6">
          {facts.map(fact => (
            <div key={fact.id} className="bg-white p-6 rounded-lg shadow-md">
              {editingFact && editingFact.id === fact.id ? (
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <input type="text" value={editingFact.title} onChange={(e) => setEditingFact({...editingFact, title: e.target.value})} className="w-full p-2 border rounded-md" />
                  <textarea value={editingFact.content} onChange={(e) => setEditingFact({...editingFact, content: e.target.value})} className="w-full p-2 border rounded-md" />
                  <select value={editingFact.category} onChange={(e) => setEditingFact({...editingFact, category: e.target.value})} className="w-full p-2 border rounded-md">
                      <option>Nutritional</option><option>Historical</option><option>Fun Fact</option><option>Culinary</option>
                  </select>
                  <div className="flex space-x-2">
                    <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Save</button>
                    <button type="button" onClick={() => setEditingFact(null)} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">Cancel</button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{fact.title}</h3>
                      <span className="text-xs font-semibold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">{fact.category}</span>
                    </div>
                    {user.id === fact.author?.id && (
                        <div className="flex space-x-2">
                          <button onClick={() => startEditing(fact)} className="text-sm text-blue-600 hover:underline">Edit</button>
                          <button onClick={() => onDeleteFact(fact.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                        </div>
                    )}
                  </div>
                  <p className="text-gray-700 mt-2">{fact.content}</p>
                  <p className="text-xs text-gray-500 mt-4">Posted by: {fact.author?.name || 'Unknown'}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
