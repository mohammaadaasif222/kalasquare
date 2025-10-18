// app/(dashboard)/artist/page.tsx
'use client';

export default function ArtistDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Good Morning! 🌟</h2>
            <p className="text-purple-100">Ready to create something amazing today?</p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl">🎨</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: 'Active Projects', 
            value: '12', 
            icon: '📁', 
            change: '+3',
            gradient: 'from-blue-400 to-blue-600',
            bg: 'bg-blue-50'
          },
          { 
            label: 'Gallery Items', 
            value: '48', 
            icon: '🖼️', 
            change: '+12',
            gradient: 'from-purple-400 to-purple-600',
            bg: 'bg-purple-50'
          },
          { 
            label: 'Collaborations', 
            value: '5', 
            icon: '🤝', 
            change: '+2',
            gradient: 'from-green-400 to-green-600',
            bg: 'bg-green-50'
          },
          { 
            label: 'Total Views', 
            value: '2.4K', 
            icon: '👁️', 
            change: '+320',
            gradient: 'from-orange-400 to-orange-600',
            bg: 'bg-orange-50'
          },
        ].map((stat, index) => (
          <div key={index} className={`${stat.bg} rounded-2xl p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                {stat.icon}
              </div>
              <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Projects</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Portrait Commission', client: 'John Smith', progress: 75, color: 'purple', dueDate: '2 days' },
              { name: 'Gallery Exhibition', client: 'Art Gallery NYC', progress: 45, color: 'blue', dueDate: '1 week' },
              { name: 'Digital Art Series', client: 'Tech Corp', progress: 90, color: 'green', dueDate: '3 days' },
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    <p className="text-sm text-gray-500">Client: {project.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Due in</p>
                    <p className="text-sm font-semibold text-gray-700">{project.dueDate}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Progress</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r from-${project.color}-400 to-${project.color}-600 h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Feed</h2>
          <div className="space-y-4">
            {[
              { action: 'New comment', item: 'Sunset Painting', time: '2h ago', icon: '💬', color: 'blue' },
              { action: 'Project completed', item: 'Logo Design', time: '5h ago', icon: '✅', color: 'green' },
              { action: 'New follower', item: 'Sarah Johnson', time: '1d ago', icon: '👤', color: 'purple' },
              { action: 'Artwork liked', item: 'Abstract Art #23', time: '2d ago', icon: '❤️', color: 'red' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 bg-white rounded-xl p-3 hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-full bg-${activity.color}-100 flex items-center justify-center text-lg flex-shrink-0`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{activity.action}</p>
                  <p className="text-xs text-gray-600 truncate">{activity.item}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { event: 'Art Gallery Opening', date: 'Oct 25', time: '6:00 PM', location: 'NYC Gallery', icon: '🎨' },
            { event: 'Client Meeting', date: 'Oct 28', time: '2:00 PM', location: 'Virtual', icon: '👔' },
            { event: 'Workshop Session', date: 'Nov 2', time: '10:00 AM', location: 'Art Studio', icon: '🎓' },
          ].map((event, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border-l-4 border-purple-500 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{event.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{event.event}</h3>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-600">📅 {event.date}</span>
                <span className="text-sm text-gray-600">🕐 {event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}