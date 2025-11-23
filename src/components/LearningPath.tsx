import { CheckCircle, Circle, Lock } from 'lucide-react';

export function LearningPath() {
  const paths = [
    {
      level: 'Beginner',
      color: 'green',
      modules: [
        { name: 'Introduction to Web Security', completed: false, locked: false },
        { name: 'SQL Injection Basics', completed: false, locked: false },
        { name: 'Cross-Site Scripting (XSS)', completed: false, locked: false },
        { name: 'Basic Authentication', completed: false, locked: false },
      ],
    },
    {
      level: 'Intermediate',
      color: 'yellow',
      modules: [
        { name: 'Advanced SQL Injection', completed: false, locked: true },
        { name: 'CSRF Attacks', completed: false, locked: true },
        { name: 'Session Management', completed: false, locked: true },
        { name: 'File Upload Vulnerabilities', completed: false, locked: true },
      ],
    },
    {
      level: 'Advanced',
      color: 'red',
      modules: [
        { name: 'XXE Exploitation', completed: false, locked: true },
        { name: 'SSRF Attacks', completed: false, locked: true },
        { name: 'Deserialization Attacks', completed: false, locked: true },
        { name: 'Advanced Exploit Chains', completed: false, locked: true },
      ],
    },
  ];

  const colorClasses = {
    green: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      gradient: 'from-green-500 to-green-600',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      gradient: 'from-red-500 to-red-600',
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Learning Path</h1>
        <p className="text-gray-600 mt-2">
          Follow a structured path to master cybersecurity concepts
        </p>
      </div>

      <div className="space-y-6">
        {paths.map((path, pathIndex) => {
          const colors = colorClasses[path.color as keyof typeof colorClasses];
          return (
            <div key={pathIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${colors.gradient}`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{path.level} Level</h2>
                  <span className={`px-4 py-2 rounded-full font-semibold ${colors.bg} ${colors.text}`}>
                    {path.modules.filter(m => m.completed).length}/{path.modules.length} Complete
                  </span>
                </div>

                <div className="space-y-3">
                  {path.modules.map((module, moduleIndex) => (
                    <div
                      key={moduleIndex}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        module.locked
                          ? 'bg-gray-50 border-gray-200 opacity-60'
                          : module.completed
                          ? `${colors.bg} ${colors.border}`
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {module.locked ? (
                          <Lock className="h-5 w-5 text-gray-400" />
                        ) : module.completed ? (
                          <CheckCircle className={`h-5 w-5 ${colors.text}`} />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                        <span className={`font-medium ${module.locked ? 'text-gray-500' : 'text-gray-900'}`}>
                          {module.name}
                        </span>
                      </div>
                      {!module.locked && (
                        <button
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            module.completed
                              ? `bg-gradient-to-r ${colors.gradient} text-white`
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {module.completed ? 'Review' : 'Start'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Certification Path</h3>
        <p className="text-blue-800 text-sm mb-4">
          Complete all modules to unlock the CyberSec Academy certification and demonstrate your expertise.
        </p>
        <div className="w-full bg-blue-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '0%' }}></div>
        </div>
        <p className="text-sm text-blue-700 mt-2">0% Complete</p>
      </div>
    </div>
  );
}
