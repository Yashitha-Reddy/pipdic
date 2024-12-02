import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const staticUsername = 'root';
        const staticPassword = '1234';
        if (username === staticUsername && password === staticPassword) {
            setMessage('Login successful');
            navigate('/information');
        } else {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <nav style={styles.navbar}>
                <img 
                    src="https://th.bing.com/th/id/OIP.GeQ-ye7WlYGy0SXKqJEH0wHaHa?rs=1&pid=ImgDetMain" 
                    alt="Geokno Logo" 
                    style={styles.logo} 
                />
                <h1 style={styles.companyName}>Geokno India Private Limited</h1>
            </nav>

            <div style={styles.loginBox}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.button}>Login</button>
                    </div>
                </form>

                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6e7c7c, #2e3c3c)',
        height: '100vh',
        margin: 0,
        fontFamily: '"Arial", sans-serif',
    },
    navbar: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '10px 20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1000,
    },
    logo: {
        width: '50px',
        height: '50px',
        marginRight: '15px',
    },
    companyName: {
        fontSize: '22px',
        fontWeight: 'bold',
    },
    loginBox: {
        background: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center',
        marginTop: '60px', // Offset for navbar
    },
    h2: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    inputGroup: {
        marginBottom: '20px',
        position: 'relative',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        transition: 'all 0.3s ease',
    },
    inputFocus: {
        borderColor: '#4CAF50',
        outline: 'none',
    },
    buttonGroup: {
        marginTop: '10px',
    },
    button: {
        width: '100%',
        padding: '10px',
        border: 'none',
        background: '#4CAF50',
        color: '#fff',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
    },
    buttonHover: {
        background: '#45a049',
    },
    message: {
        marginTop: '15px',
        fontSize: '14px',
        color: '#ff6347',
    },
};

export default Login;
