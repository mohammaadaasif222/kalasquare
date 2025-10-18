// app/(dashboard)/venue/page.tsx
'use client';

export default function VenueDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Venue Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage events and bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Upcoming Events', value: '14', icon: '🎉', color: 'bg-blue-500' },
          { label: 'Total Bookings', value: '28', icon: '📅', color: 'bg-green-500' },
          { label: 'Capacity', value: '500', icon: '👥', color: 'bg-purple-500' },
          { label: 'Revenue', value: '$34.8K', icon: '💰', color: 'bg-orange-500' },
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
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {[
              { name: 'Corporate Conference', date: 'Oct 22, 2025', attendees: 150 },
              { name: 'Music Concert', date: 'Oct 25, 2025', attendees: 400 },
              { name: 'Art Exhibition', date: 'Oct 28, 2025', attendees: 200 },
            ].map((event, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{event.name}</span>
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>
                <p className="text-sm text-gray-600">{event.attendees} attendees</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
          <div className="space-y-3">
            {[
              { client: 'Tech Corp', type: 'Corporate Event', status: 'Pending' },
              { client: 'Music Production', type: 'Concert', status: 'Approved' },
              { client: 'Art Gallery', type: 'Exhibition', status: 'Pending' },
            ].map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{booking.client}</p>
                  <p className="text-sm text-gray-600">{booking.type}</p>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  booking.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}