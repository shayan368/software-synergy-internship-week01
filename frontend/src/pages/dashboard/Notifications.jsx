import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Bell, ShieldAlert, UserPlus, CheckCircle2 } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: "2-Step Verification status changed",
    description: "Your two-step verification settings were recently modified. If this wasn't you, please secure your account immediately.",
    time: "Just now",
    icon: ShieldAlert,
  },
  {
    id: 2,
    title: "New device login detected",
    description: "We noticed a new login to your account from a Windows device in Pehawar, Pakistan.",
    time: "2 hours ago",
    icon: Bell,
  },
  {
    id: 3,
    title: "Welcome to Software Synergy",
    description: "Your account has been successfully created and verified. Welcome aboard!",
    time: "1 day ago",
    icon: CheckCircle2,
  },
  {
    id: 4,
    title: "Muhammad Sheraz joined your workspace",
    description: "Muhammad Sheraz has accepted your invitation and joined the administrative team.",
    time: "2 days ago",
    icon: UserPlus,
  }
];

export default function Notifications() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">Notifications</h2>
          <p className="text-gray-500 mt-1 text-sm">Stay updated with your account activity and system alerts.</p>
        </div>
        <Button variant="outline" className="text-gray-700 bg-white">
          Mark all as read
        </Button>
      </div>

      <Card className="shadow-sm border-gray-100 overflow-hidden">
        <CardHeader className="border-b border-gray-100 pb-4">
          <CardTitle className="text-lg text-gray-800 font-semibold">
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="p-5 flex gap-4 transition-colors hover:bg-gray-50 bg-white"
              >
                <div className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center bg-orange-50">
                  <notification.icon className="h-5 w-5 text-orange-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-gray-800">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed pr-8">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
