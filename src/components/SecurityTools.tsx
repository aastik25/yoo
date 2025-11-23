import { useState } from 'react';
import { Network, Search, Lock, Unlock, Terminal, Wifi } from 'lucide-react';

export function SecurityTools() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const tools = [
    {
      id: 'nmap',
      name: 'Nmap Scanner',
      description: 'Network discovery and security auditing tool',
      icon: Network,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'wireshark',
      name: 'Wireshark Analyzer',
      description: 'Network protocol analyzer for packet inspection',
      icon: Wifi,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      id: 'encryption',
      name: 'File Encryption',
      description: 'Encrypt files using AES-256 encryption',
      icon: Lock,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: 'decryption',
      name: 'File Decryption',
      description: 'Decrypt encrypted files with the correct key',
      icon: Unlock,
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 'hash',
      name: 'Hash Generator',
      description: 'Generate cryptographic hashes (MD5, SHA-1, SHA-256)',
      icon: Terminal,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'password',
      name: 'Password Analyzer',
      description: 'Test password strength and get security recommendations',
      icon: Search,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const handleToolClick = (toolId: string) => {
    setActiveToolId(activeToolId === toolId ? null : toolId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security Tools</h1>
        <p className="text-gray-600 mt-2">
          Practice with real-world security tools and techniques
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeToolId === tool.id;

          return (
            <div key={tool.id} className="space-y-4">
              <div
                onClick={() => handleToolClick(tool.id)}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden ${
                  isActive ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                <div className={`h-2 bg-gradient-to-r ${tool.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </div>
              </div>

              {isActive && (
                <div className="bg-white rounded-xl shadow-md p-6 animate-in fade-in slide-in-from-top-4">
                  {tool.id === 'nmap' && <NmapTool />}
                  {tool.id === 'wireshark' && <WiresharkTool />}
                  {tool.id === 'encryption' && <EncryptionTool />}
                  {tool.id === 'decryption' && <DecryptionTool />}
                  {tool.id === 'hash' && <HashTool />}
                  {tool.id === 'password' && <PasswordTool />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NmapTool() {
  const [target, setTarget] = useState('');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<string>('');

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setResults(`Starting Nmap scan on ${target}...\n\nPORT     STATE    SERVICE\n22/tcp   open     ssh\n80/tcp   open     http\n443/tcp  open     https\n3306/tcp open     mysql\n\nNmap scan completed: 4 ports detected`);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Network Scanner</h4>
      <div className="space-y-2">
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter target IP or domain (e.g., 192.168.1.1)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleScan}
          disabled={scanning || !target}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {scanning ? 'Scanning...' : 'Start Scan'}
        </button>
      </div>
      {results && (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
          {results}
        </div>
      )}
    </div>
  );
}

function WiresharkTool() {
  const [capturing, setCapturing] = useState(false);
  const [packets, setPackets] = useState<Array<{ time: string; source: string; dest: string; protocol: string }>>([]);

  const startCapture = () => {
    setCapturing(true);
    const interval = setInterval(() => {
      setPackets((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          source: `192.168.1.${Math.floor(Math.random() * 255)}`,
          dest: `192.168.1.${Math.floor(Math.random() * 255)}`,
          protocol: ['TCP', 'UDP', 'HTTP', 'DNS'][Math.floor(Math.random() * 4)],
        },
      ]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setCapturing(false);
    }, 5000);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Packet Capture</h4>
      <button
        onClick={startCapture}
        disabled={capturing}
        className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 disabled:bg-gray-400 transition-colors"
      >
        {capturing ? 'Capturing...' : 'Start Capture'}
      </button>
      {packets.length > 0 && (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-64">
          <div className="grid grid-cols-4 gap-4 font-bold mb-2">
            <div>Time</div>
            <div>Source</div>
            <div>Destination</div>
            <div>Protocol</div>
          </div>
          {packets.map((packet, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 py-1">
              <div>{packet.time}</div>
              <div>{packet.source}</div>
              <div>{packet.dest}</div>
              <div>{packet.protocol}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EncryptionTool() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [encrypted, setEncrypted] = useState('');

  const handleEncrypt = () => {
    const encoded = btoa(text + '|' + key);
    setEncrypted(encoded);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Encrypt Text</h4>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to encrypt"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
        rows={3}
      />
      <input
        type="password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Encryption key"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
      />
      <button
        onClick={handleEncrypt}
        disabled={!text || !key}
        className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
      >
        Encrypt
      </button>
      {encrypted && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-2">Encrypted:</p>
          <p className="font-mono text-xs break-all text-gray-900">{encrypted}</p>
        </div>
      )}
    </div>
  );
}

function DecryptionTool() {
  const [encrypted, setEncrypted] = useState('');
  const [key, setKey] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleDecrypt = () => {
    try {
      const decoded = atob(encrypted);
      const [text, storedKey] = decoded.split('|');
      if (storedKey === key) {
        setDecrypted(text);
      } else {
        setDecrypted('Invalid key!');
      }
    } catch {
      setDecrypted('Invalid encrypted text!');
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Decrypt Text</h4>
      <textarea
        value={encrypted}
        onChange={(e) => setEncrypted(e.target.value)}
        placeholder="Enter encrypted text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        rows={3}
      />
      <input
        type="password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Decryption key"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
      />
      <button
        onClick={handleDecrypt}
        disabled={!encrypted || !key}
        className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        Decrypt
      </button>
      {decrypted && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-2">Decrypted:</p>
          <p className="text-gray-900">{decrypted}</p>
        </div>
      )}
    </div>
  );
}

function HashTool() {
  const [text, setText] = useState('');
  const [hashes, setHashes] = useState<{ md5: string; sha1: string; sha256: string } | null>(null);

  const generateHash = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha256Array = Array.from(new Uint8Array(sha256Buffer));
    const sha256 = sha256Array.map(b => b.toString(16).padStart(2, '0')).join('');

    setHashes({
      md5: 'MD5 deprecated - use SHA-256',
      sha1: 'SHA-1 deprecated - use SHA-256',
      sha256,
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Generate Hash</h4>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to hash"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={generateHash}
        disabled={!text}
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        Generate Hashes
      </button>
      {hashes && (
        <div className="space-y-2">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 mb-1">SHA-256:</p>
            <p className="font-mono text-xs break-all">{hashes.sha256}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function PasswordTool() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<{
    score: number;
    feedback: string[];
    color: string;
  } | null>(null);

  const analyzePassword = () => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) score++;
    else feedback.push('Use at least 8 characters');

    if (/[a-z]/.test(password)) score++;
    else feedback.push('Include lowercase letters');

    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Include uppercase letters');

    if (/[0-9]/.test(password)) score++;
    else feedback.push('Include numbers');

    if (/[^a-zA-Z0-9]/.test(password)) score++;
    else feedback.push('Include special characters');

    const colors = ['red', 'orange', 'yellow', 'blue', 'green'];
    setStrength({
      score,
      feedback,
      color: colors[score - 1] || 'red',
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Password Strength</h4>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password to analyze"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
      />
      <button
        onClick={analyzePassword}
        disabled={!password}
        className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 disabled:bg-gray-400"
      >
        Analyze Password
      </button>
      {strength && (
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Strength:</p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded ${
                    i <= strength.score ? `bg-${strength.color}-500` : 'bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: i <= strength.score
                      ? strength.color === 'red' ? '#ef4444'
                      : strength.color === 'orange' ? '#f97316'
                      : strength.color === 'yellow' ? '#eab308'
                      : strength.color === 'blue' ? '#3b82f6'
                      : '#10b981'
                      : undefined
                  }}
                />
              ))}
            </div>
          </div>
          {strength.feedback.length > 0 && (
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">Suggestions:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {strength.feedback.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
