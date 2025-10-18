// app/(dashboard)/admin/page.tsx
'use client';

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Platform overview and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: '1,248', icon: '👥', color: 'bg-blue-500' },
          { label: 'Active Sessions', value: '342', icon: '🔌', color: 'bg-green-500' },
          { label: 'Revenue', value: '$45.2K', icon: '💰', color: 'bg-purple-500' },
          { label: 'Pending Requests', value: '18', icon: '⏳', color: 'bg-orange-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
          <div className="space-y-3">
            {[
              { type: 'Artists', count: 342, color: 'bg-blue-500' },
              { type: 'Influencers', count: 289, color: 'bg-purple-500' },
              { type: 'Brands', count: 178, color: 'bg-green-500' },
              { type: 'Agencies', count: 124, color: 'bg-orange-500' },
              { type: 'Venues', count: 98, color: 'bg-pink-500' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                  <span className="text-gray-700">{item.type}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">System Health</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Server Status', value: 'Operational', color: 'text-green-600' },
              { label: 'API Response', value: '45ms', color: 'text-green-600' },
              { label: 'Database', value: 'Healthy', color: 'text-green-600' },
              { label: 'Uptime', value: '99.9%', color: 'text-green-600' },
            ].map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className={`text-lg font-semibold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-2">
          {[
            { user: 'John Doe (Artist)', action: 'Created new project', time: '5 min ago' },
            { user: 'Nike Brand', action: 'Started new campaign', time: '15 min ago' },
            { user: 'Sarah Smith (Influencer)', action: 'Updated profile', time: '1 hour ago' },
            { user: 'Admin', action: 'Modified system settings', time: '2 hours ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div>
                <p className="font-medium text-gray-900">{activity.user}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}