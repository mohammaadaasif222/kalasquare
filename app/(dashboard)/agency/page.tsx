// app/(dashboard)/agency/page.tsx
'use client';

export default function AgencyDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Agency Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage clients and talents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Clients', value: '32', icon: '👥', color: 'bg-blue-500' },
          { label: 'Talents', value: '48', icon: '⭐', color: 'bg-purple-500' },
          { label: 'Active Projects', value: '15', icon: '💼', color: 'bg-green-500' },
          { label: 'Revenue', value: '$78.2K', icon: '💰', color: 'bg-orange-500' },
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
          <h2 className="text-xl font-semibold mb-4">Recent Clients</h2>
          <div className="space-y-3">
            {[
              { name: 'Nike Inc.', type: 'Brand', status: 'Active' },
              { name: 'Adidas Group', type: 'Brand', status: 'Active' },
              { name: 'Local Venue Co.', type: 'Venue', status: 'Pending' },
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-600">{client.type}</p>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  client.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top Talents</h2>
          <div className="space-y-3">
            {[
              { name: 'Sarah Johnson', specialty: 'Influencer', rating: 4.9 },
              { name: 'Mike Chen', specialty: 'Artist', rating: 4.8 },
              { name: 'Emma Davis', specialty: 'Influencer', rating: 4.7 },
            ].map((talent, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{talent.name}</p>
                  <p className="text-sm text-gray-600">{talent.specialty}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="font-semibold">{talent.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}