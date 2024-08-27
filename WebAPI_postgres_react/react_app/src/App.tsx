import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function Home() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-white mb-4">Home</h1>
        </div>
    );
}

function Create() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-white">Create Page</h1>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-800 flex flex-col">
                <nav className="bg-gray-900 p-4 fixed w-full z-10">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="text-white font-bold text-xl">My App</div>
                        <ul className="flex space-x-4">
                            <li>
                                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                            </li>
                            <li>
                                <Link to="/create" className="text-white hover:text-gray-300">Create</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="flex-grow pt-16 bg-gray-800">
                    <div className="container mx-auto px-4">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/create" element={<Create />} />
                        </Routes>
                    </div>
                </main>

                <footer className="bg-gray-900 text-white p-4">
                    <div className="container mx-auto text-center">
                        © 2024 My App. All rights reserved.
                    </div>
                </footer>
            </div>
        </Router>
    );
}


export default App;
