import { BrowserRouter, Routes, Route } from "react-router-dom";

function Login() {
  return <h1>Login Page</h1>;
}

function Dashboard() {
  return <h1>Dashboard Page</h1>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}