import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Briefcase } from 'lucide-react';

export function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student' as 'student' | 'mentor',
    researchInterest: ''
  });
  const [error, setError] = useState('');
  const [matchedMentors, setMatchedMentors] = useState([]); 

  const researchInterests = [
    'Machine Learning',
    'Data Science',
    'Biotechnology',
    'Cybersecurity',
    'Renewable Energy',
    'Quantum Computing',
    'Neuroscience',
    'Climate Change'
  ];

  const handleMatch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ research_interests: formData.researchInterest })
      });

      const data = await response.json();
      setMatchedMentors(data); 
    } catch (err) {
      console.error('Error fetching matched mentors:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Registration failed');

      alert('Registration successful!');

  
      await handleMatch();
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="space-y-4">
           
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-field pl-10"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

       
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field pl-10"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

    
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field pl-10"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

          
            <div>
              <label htmlFor="role" className="sr-only">Role</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="role"
                  name="role"
                  required
                  className="input-field pl-10"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'student' | 'mentor' })}
                >
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
            </div>

         
            <div>
              <label htmlFor="researchInterest" className="sr-only">Research Interest</label>
              <div className="relative">
                <select
                  id="researchInterest"
                  name="researchInterest"
                  required
                  className="input-field pl-3"
                  value={formData.researchInterest}
                  onChange={(e) => setFormData({ ...formData, researchInterest: e.target.value })}
                >
                  <option value="">Select Research Interest</option>
                  {researchInterests.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Create Account
          </button>
        </form>

        {matchedMentors.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold">Matched Mentors:</h2>
            <ul>
              {matchedMentors.map((mentor, index) => (
                <li key={index}>{mentor[0]} - Similarity: {mentor[1].toFixed(2)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
