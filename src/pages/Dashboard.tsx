import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Users, Award, Clock } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="text-gray-600 mt-2">Track your research journey and recent activities</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Learning Progress"
          value="4/12"
          label="Modules Completed"
          icon={BookOpen}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <DashboardCard
          title="Mentorship"
          value="2"
          label="Active Connections"
          icon={Users}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <DashboardCard
          title="Achievements"
          value="6"
          label="Badges Earned"
          icon={Award}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
        <DashboardCard
          title="Time Invested"
          value="24h"
          label="This Month"
          icon={Clock}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <activity.icon className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{session.title}</h3>
                  <span className="text-sm text-gray-600">{session.time}</span>
                </div>
                <p className="text-sm text-gray-600">{session.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function DashboardCard({ 
  title, 
  value, 
  label, 
  icon: Icon, 
  color, 
  bgColor 
}: { 
  title: string;
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-600">{title}</h3>
          <div className="mt-2">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-gray-600 text-sm ml-2">{label}</span>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
    </div>
  );
}

const recentActivities = [
  {
    icon: BookOpen,
    title: "Completed 'Research Methods' module",
    time: "2 hours ago"
  },
  {
    icon: Users,
    title: "Connected with Dr. Sarah Johnson",
    time: "1 day ago"
  },
  {
    icon: Award,
    title: "Earned 'Literature Review' badge",
    time: "2 days ago"
  }
];

const upcomingSessions = [
  {
    title: "Mentorship Call",
    time: "Tomorrow, 2:00 PM",
    description: "Discussion about research proposal with Dr. Johnson"
  },
  {
    title: "Workshop",
    time: "Friday, 3:00 PM",
    description: "Introduction to Statistical Analysis in Research"
  }
];