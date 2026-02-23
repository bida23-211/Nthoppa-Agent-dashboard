import React, { useState } from 'react';

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  progress: number;
  lessons: number;
  completedLessons: number;
  coins: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
}

const courses: Course[] = [
  { id: 'T001', title: 'Introduction to Financial Products', category: 'Fundamentals', duration: '2h 30m', progress: 100, lessons: 8, completedLessons: 8, coins: 25, difficulty: 'Beginner', color: '#22C55E' },
  { id: 'T002', title: 'Motor Insurance Essentials', category: 'Insurance', duration: '1h 45m', progress: 75, lessons: 6, completedLessons: 4, coins: 25, difficulty: 'Beginner', color: '#06B6D4' },
  { id: 'T003', title: 'Health Insurance Deep Dive', category: 'Insurance', duration: '3h 00m', progress: 40, lessons: 10, completedLessons: 4, coins: 25, difficulty: 'Intermediate', color: '#EF4444' },
  { id: 'T004', title: 'Investment Products Guide', category: 'Investments', duration: '2h 15m', progress: 0, lessons: 7, completedLessons: 0, coins: 25, difficulty: 'Intermediate', color: '#F59E0B' },
  { id: 'T005', title: 'Sales Techniques & Closing', category: 'Sales', duration: '1h 30m', progress: 60, lessons: 5, completedLessons: 3, coins: 25, difficulty: 'Beginner', color: '#F97316' },
  { id: 'T006', title: 'Advanced Risk Assessment', category: 'Insurance', duration: '4h 00m', progress: 0, lessons: 12, completedLessons: 0, coins: 25, difficulty: 'Advanced', color: '#A855F7' },
  { id: 'T007', title: 'Customer Relationship Management', category: 'Sales', duration: '2h 00m', progress: 100, lessons: 6, completedLessons: 6, coins: 25, difficulty: 'Beginner', color: '#3B82F6' },
  { id: 'T008', title: 'Loan Products Masterclass', category: 'Loans', duration: '2h 45m', progress: 20, lessons: 9, completedLessons: 2, coins: 25, difficulty: 'Intermediate', color: '#3B82F6' },
];

const certifications = [
  { name: 'Certified Insurance Advisor', status: 'completed', date: '2025-11-15', badge: '#22C55E' },
  { name: 'Investment Products Specialist', status: 'in-progress', progress: 65, badge: '#F59E0B' },
  { name: 'Advanced Sales Professional', status: 'locked', badge: '#6B7280' },
];

const TrainingSection: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const totalCompleted = courses.filter(c => c.progress === 100).length;
  const totalInProgress = courses.filter(c => c.progress > 0 && c.progress < 100).length;
  const totalCoinsEarned = courses.filter(c => c.progress === 100).reduce((sum, c) => sum + c.coins, 0);

  const filtered = filter === 'all' ? courses :
    filter === 'completed' ? courses.filter(c => c.progress === 100) :
    filter === 'in-progress' ? courses.filter(c => c.progress > 0 && c.progress < 100) :
    courses.filter(c => c.progress === 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Courses</p>
          <p className="text-2xl font-bold text-white">{courses.length}</p>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-400">{totalCompleted}</p>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-500 text-sm">In Progress</p>
          <p className="text-2xl font-bold text-orange-400">{totalInProgress}</p>
        </div>
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Coins Earned</p>
          <p className="text-2xl font-bold text-yellow-400">{totalCoinsEarned}</p>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <div key={i} className={`rounded-xl p-4 border ${cert.status === 'completed' ? 'bg-green-500/5 border-green-500/20' : cert.status === 'in-progress' ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-gray-800/30 border-gray-700'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${cert.badge}20` }}>
                  {cert.status === 'completed' ? (
                    <svg className="w-5 h-5" style={{ color: cert.badge }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  ) : cert.status === 'in-progress' ? (
                    <svg className="w-5 h-5" style={{ color: cert.badge }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  )}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{cert.name}</p>
                  <p className="text-gray-500 text-xs">
                    {cert.status === 'completed' ? `Earned ${cert.date}` : cert.status === 'in-progress' ? `${cert.progress}% complete` : 'Complete prerequisites'}
                  </p>
                </div>
              </div>
              {cert.status === 'in-progress' && cert.progress !== undefined && (
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${cert.progress}%`, backgroundColor: cert.badge }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Course Filters */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'All Courses' },
          { key: 'in-progress', label: 'In Progress' },
          { key: 'completed', label: 'Completed' },
          { key: 'not-started', label: 'Not Started' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.key ? 'bg-orange-500 text-white' : 'bg-[#161b22] border border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {filtered.map((course) => (
          <div key={course.id} className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all">
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${course.color}15` }}>
                  <svg className="w-6 h-6" style={{ color: course.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-medium text-sm">{course.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      course.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                      course.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {course.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{course.category}</span>
                    <span>{course.duration}</span>
                    <span>{course.completedLessons}/{course.lessons} lessons</span>
                    <span className="text-yellow-400">{course.coins} coins</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block w-32">
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${course.progress}%`, backgroundColor: course.progress === 100 ? '#22C55E' : course.color }} />
                    </div>
                    <p className="text-gray-500 text-xs mt-1 text-right">{course.progress}%</p>
                  </div>
                  <svg className={`w-5 h-5 text-gray-500 transition-transform ${expandedCourse === course.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {expandedCourse === course.id && (
              <div className="px-4 pb-4 border-t border-gray-800 pt-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div className="bg-gray-800/30 rounded-lg p-2.5 text-center">
                    <p className="text-gray-500 text-xs">Duration</p>
                    <p className="text-white text-sm font-medium">{course.duration}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-2.5 text-center">
                    <p className="text-gray-500 text-xs">Lessons</p>
                    <p className="text-white text-sm font-medium">{course.completedLessons}/{course.lessons}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-2.5 text-center">
                    <p className="text-gray-500 text-xs">Progress</p>
                    <p className="text-white text-sm font-medium">{course.progress}%</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-2.5 text-center">
                    <p className="text-gray-500 text-xs">Reward</p>
                    <p className="text-yellow-400 text-sm font-medium">{course.coins} coins</p>
                  </div>
                </div>
                <button className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  course.progress === 100
                    ? 'bg-green-600/20 text-green-400 border border-green-500/20'
                    : course.progress > 0
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}>
                  {course.progress === 100 ? 'Completed' : course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingSection;
