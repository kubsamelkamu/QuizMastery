import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic email validation
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
      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Redirect to login page
      navigate('/login');
    } catch (err) {
      console.error('Firebase error:', err);
      const errorCode = err.code;

      // Display user-friendly error messages
      switch (errorCode) {
        case 'auth/email-already-in-use':
          setError('This email address is already in use.');
          break;
        case 'auth/invalid-email':
          setError('The email address is not valid.');
          break;
        case 'auth/operation-not-allowed':
          setError('Operation not allowed. Please contact support.');
          break;
        case 'auth/weak-password':
          setError('The password is too weak. It should be at least 6 characters.');
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
        </form>
      </div>
    </div>
  );
}

export default Register;
