import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { login, createUser } from "./api/api";

export default function App() {
  const { t, i18n } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");
    try {
      const res = await login(username, password);
      setMessage(res.data?.message || t("login_success"));
    } catch (err) {
      setMessage(err.response?.data?.error || t("login_failed"));
    }
  };

  const handleCreateUser = async () => {
    setMessage("");
    try {
      await createUser({
        username,
        password,
        email: `${username}@example.com`,
        role: "member",
      });
      setMessage(t("user_created"));
    } catch (err) {
      setMessage(err.response?.data?.error || t("create_failed"));
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h2>{t("title")}</h2>

      <label>{t("username")}</label>
      <input
        style={{ display: "block", marginBottom: 12, width: "100%" }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={t("username")}
      />

      <label>{t("password")}</label>
      <input
        type="password"
        style={{ display: "block", marginBottom: 12, width: "100%" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("password")}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={handleLogin}>{t("login")}</button>
        <button onClick={handleCreateUser}>{t("create_user")}</button>
      </div>

      <p style={{ marginTop: 16 }}>{message}</p>

      {/* Επιλογή γλώσσας */}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => i18n.changeLanguage("el")}>Ελληνικά</button>
        <button onClick={() => i18n.changeLanguage("en")}>English</button>
      </div>
    </div>
  );
}
