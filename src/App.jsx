import { useCallback, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [pass, setPass] = useState("");
  const [number, checkedNumber] = useState(false);
  const [character, checkedCharacter] = useState(false);
  const [copy, lastCopy] = useState("");
  const [strength, setStrength] = useState("");
  const passRef = useRef(null);
  const passRef1 = useRef(null);

  const Password = useCallback(() => {
    let p = "";
    let s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) s += "0123456789";
    if (character) s += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * s.length + 1);
      p += s.charAt(char);
    }
    setPass(p);
    calculateStrength(p);
  }, [length, number, character, setPass]);

  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;

    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 2;

    if (score >= 5) setStrength("💪 Very Strong");
    else if (score >= 3) setStrength("👍 Strong");
    else if (score >= 2) setStrength("🔐 Medium");
    else setStrength("⚠️ Weak");
  };

  const copyClick = useCallback(() => {
    lastCopy(pass);
    passRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  const copyClick1 = useCallback(() => {
    lastCopy(copy);
    passRef1.current?.select();
    window.navigator.clipboard.writeText(copy);
  }, [copy]);

  const generate = () => {
    Password();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="backdrop-blur-sm bg-black/70 w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-white/10">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Secure Password Generator
            <span className="block text-sm font-normal text-white/70 mt-1">
              Create strong, random passwords
            </span>
          </h1>

          {/* Password Generator Section */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={pass}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Generated password"
                readOnly
                ref={passRef}
              />
              <button
                onClick={copyClick}
                className="px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center"
                title="Copy to clipboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>

            {pass && (
              <div className="text-sm text-center mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80">
                  Strength: <span className="font-semibold">{strength}</span>
                </span>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-white/80">Length: {length}</label>
                <input
                  type="range"
                  min={8}
                  max={20}
                  value={length}
                  className="w-32 accent-blue-500 cursor-pointer"
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="numberInput" className="text-white/80">
                  Include Numbers
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="numberInput"
                    checked={number}
                    onChange={() => checkedNumber(!number)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="numberInput"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      number ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        number ? "translate-x-4" : "translate-x-0"
                      }`}
                    ></span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="characterInput" className="text-white/80">
                  Special Characters
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="characterInput"
                    checked={character}
                    onChange={() => checkedCharacter(!character)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="characterInput"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      character ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        character ? "translate-x-4" : "translate-x-0"
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={generate}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Generate Password
            </button>
          </div>

          {/* Last Copied Password Section */}
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-medium text-white mb-3">
              Last Copied Password
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={copy}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none"
                placeholder="No password copied yet"
                readOnly
                ref={passRef1}
              />
              <button
                onClick={copyClick1}
                className="px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center"
                disabled={!copy}
                title="Copy again"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Password Strength Checker Section */}
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-lg font-medium text-white mb-3">
              Password Strength Checker
            </h2>
            <p className="text-white/70 mb-4">
              Check how secure your password is against brute force attacks
            </p>
            <a
              href="https://www.passwordmonster.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Test Password Strength
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
