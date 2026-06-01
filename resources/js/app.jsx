import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Alert, Button, Card, Form, Spinner} from 'react-bootstrap';

function csrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
}

function jsonRequest(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: {
            Accept: 'application/json',
            'X-CSRF-TOKEN': csrfToken(),
            ...options.headers,
        },
    });
}

function App() {
    const [ready, setReady] = useState(false);
    const [user, setUser] = useState(null);
    const [health, setHealth] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        jsonRequest('/api/health')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Health check failed.');
                }

                return response.json();
            })
            .then((data) => {
                setHealth(data);
                setUser(data.user ?? null);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setReady(true);
            });
    }, []);

    function handleLogin(event) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        jsonRequest('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message ?? 'Login failed.');
                }

                return data;
            })
            .then((data) => {
                setUser(data.user);
            })
            .catch((exception) => {
                setError(exception.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleLogout() {
        jsonRequest('/api/logout', {
            method: 'POST',
        }).finally(() => {
            setUser(null);
        });
    }

    if (!ready) {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    return (
        <main className="container py-5" style={{maxWidth: '640px'}}>
            <h1 className="mb-4 text-center">LaraRedmine</h1>

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    {user ? (
                        <>
                            <Alert variant="success">
                                <Alert.Heading>Signed in</Alert.Heading>
                                <p className="mb-0">ID: {user.id} | Email: {user.email}</p>
                            </Alert>
                            <Button variant="danger" className="w-100" onClick={handleLogout}>
                                Sign out
                            </Button>
                        </>
                    ) : (
                        <Form onSubmit={handleLogin}>
                            <h2 className="h4 mb-3">Sign in</h2>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Sign in'}
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>

            <Card className="bg-light shadow-sm">
                <Card.Body>
                    <h2 className="h5 text-secondary">Temporary health response</h2>
                    <pre className="mb-0">{JSON.stringify(health, null, 2)}</pre>
                </Card.Body>
            </Card>
        </main>
    );
}

createRoot(document.getElementById('app')).render(<App />);
