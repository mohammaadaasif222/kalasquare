// app/(dashboard)/brand/page.tsx
'use client';

export default function BrandDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Brand Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your campaigns and collaborations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Campaigns', value: '8', icon: '🎯', color: 'bg-blue-500' },
          { label: 'Collaborators', value: '24', icon: '🤝', color: 'bg-green-500' },
          { label: 'Total Reach', value: '156K', icon: '📊', color: 'bg-purple-500' },
          { label: 'Budget Used', value: '68%', icon: '💰', color: 'bg-orange-500' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
          <div className="space-y-3">
            {[
              { name: 'Summer Collection Launch', progress: 75 },
              { name: 'Influencer Partnership', progress: 50 },
              { name: 'Brand Awareness Drive', progress: 90 },
            ].map((campaign, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{campaign.name}</span>
                  <span className="text-sm text-gray-600">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { activity: 'New collaboration request', time: '2 hours ago' },
              { activity: 'Campaign milestone reached', time: '5 hours ago' },
              { activity: 'Report generated', time: '1 day ago' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">{item.activity}</span>
                <span className="text-sm text-gray-600">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}