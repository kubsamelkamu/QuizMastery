import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save username to the user's profile
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      await sendEmailVerification(userCredential.user);
      setSuccess('Registration successful! Please check your email to verify your account.');
      
      setTimeout(() => navigate('/login'), 5000); 
    } catch (err) {
      const errorCode = err.code;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          setError('Email is already in use.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('Sign up failed. Please try again.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label className="block mb-2 text-sm font-bold">Username</label>
          <input
            type="text"
            className="border p-2 rounded w-full mb-4"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="block mb-2 text-sm font-bold">Email</label>
          <input
            type="email"
            className="border p-2 rounded w-full mb-4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="block mb-2 text-sm font-bold">Password</label>
          <input
            type="password"
            className="border p-2 rounded w-full mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {error && <p className="mt-4 text-red-600">{error}</p>}
          {success && <p className="mt-4 text-green-600">{success}</p>}
        </form>
        <div className="mt-4 text-center">
          <p>Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
