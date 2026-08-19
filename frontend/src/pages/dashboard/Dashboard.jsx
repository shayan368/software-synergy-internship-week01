import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Users, Activity, UserPlus, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const stats = [
  { title: "Total Users", value: "1,248", icon: Users },
  { title: "Active Users", value: "892", icon: Activity },
  { title: "New Registrations", value: "156", icon: UserPlus },
  { title: "Revenue", value: "$24,580", icon: DollarSign },
];

const recentActivity = [
  { id: 1, user: "Muhammad Sheraz", initials: "MS", action: "registered a new account", time: "2 minutes ago" },
  { id: 2, user: "Zahoor Khan", initials: "ZK", action: "updated his profile", time: "15 minutes ago" },
  { id: 3, user: "Jawad Ahmed", initials: "JA", action: "logged in", time: "32 minutes ago" },
];

const recentUsers = [
  { id: 1, user: "Junaid Khan", initials: "JK", email: "junaid@example.com", status: "Active", role: "Admin", joined: "Aug 19, 2026" },
  { id: 2, user: "Shayan Ahmad", initials: "SA", email: "shayan@example.com", status: "Active", role: "User", joined: "Aug 18, 2026" },
  { id: 3, user: "Muhammad Sheraz", initials: "MS", email: "sheraz@example.com", status: "Active", role: "User", joined: "Aug 18, 2026" },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Welcome back, {user?.name?.split(' ')[0] || 'Shayan'}</h2>
        <p className="text-gray-500 mt-1 text-sm">Here's what's happening with your account today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[13px] font-medium text-gray-500">{stat.title}</CardTitle>
              <div className="h-8 w-8 rounded-md bg-orange-50 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-base text-gray-800 font-semibold">Recent activity</CardTitle>
            <p className="text-xs text-gray-500">Latest events in your workspace</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0">
                    {activity.initials}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold text-gray-800">{activity.user}</span>{' '}
                      <span className="text-gray-500">{activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-base text-gray-800 font-semibold">Recent users</CardTitle>
            <p className="text-xs text-gray-500">People who recently joined</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-400 uppercase border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-medium">User</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((u) => (
                    <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
                            {u.initials}
                          </div>
                          <span className="font-medium text-gray-800">{u.user}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{u.role}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{u.joined}</td>
                      <td className="px-4 py-3 text-gray-400 text-center">...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
