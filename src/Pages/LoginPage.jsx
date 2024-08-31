import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError('Email and Password are required.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        setError('Please verify your email address before signing in.');
        await auth.signOut();  
      } else {
        navigate('/home');
      }
    } catch (err) {
      const errorCode = err.code;
      switch (errorCode) {
        case 'auth/user-not-found':
          setError('User not found.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        default:
          setError('Login failed. Please try again.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/quiz');
    } catch (err) {
      setError(err);
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSignIn}>
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
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-4"
          disabled={loading}
        >
          {loading ? 'Signing In with Google...' : 'Sign In with Google'}
        </button>
      </div>
    </div>
  );
};

export default Login;
