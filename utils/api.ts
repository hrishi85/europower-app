export const loginUser = async (email: string, password: string): Promise<string> => {
    const response = await fetch('https://your-api.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data.token; // assume API returns { token: "your.jwt.token" }
};
