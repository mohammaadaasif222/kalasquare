// app/(dashboard)/influencer/page.tsx
'use client';

export default function InfluencerDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Influencer Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your campaigns and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Followers', value: '125K', icon: '👥', color: 'bg-blue-500' },
          { label: 'Engagement Rate', value: '8.5%', icon: '📈', color: 'bg-green-500' },
          { label: 'Active Campaigns', value: '6', icon: '📢', color: 'bg-purple-500' },
          { label: 'Earnings', value: '$12.4K', icon: '💰', color: 'bg-orange-500' },
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
              { name: 'Brand Partnership', status: 'Active', progress: 75 },
              { name: 'Product Review', status: 'Active', progress: 45 },
              { name: 'Content Creation', status: 'Active', progress: 90 },
            ].map((campaign, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{campaign.name}</span>
                  <span className="text-sm text-green-600">{campaign.status}</span>
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
          <h2 className="text-xl font-semibold mb-4">Recent Content</h2>
          <div className="space-y-3">
            {[
              { title: 'Product Review Video', views: '45K', date: '2 days ago' },
              { title: 'Instagram Reel', views: '32K', date: '4 days ago' },
              { title: 'Blog Post', views: '18K', date: '1 week ago' },
            ].map((content, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{content.title}</p>
                  <p className="text-sm text-gray-600">{content.views} views</p>
                </div>
                <span className="text-sm text-gray-500">{content.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}