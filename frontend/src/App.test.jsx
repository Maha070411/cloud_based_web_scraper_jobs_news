import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContext } from './context/AuthContext';

const mockContext = {
    user: null,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    loading: false
};

test('renders JobHub title', () => {
    render(
        <BrowserRouter>
            <AuthContext.Provider value={mockContext}>
                <App />
            </AuthContext.Provider>
        </BrowserRouter>
    );

    const titleElements = screen.getAllByText(/JobHub/i);
    expect(titleElements.length).toBeGreaterThan(0);
});
