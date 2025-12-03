import { Users, BookOpen, DollarSign, TrendingUp, UserCheck, UserPlus } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDashboardStats, mockStudents, mockPayments } from '@/data/mockData';

export default function Dashboard() {
  const stats = mockDashboardStats;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your college management system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          iconClassName="bg-primary/10 text-primary"
          className="[animation-delay:100ms]"
        />
        <StatCard
          title="Active Students"
          value={stats.activeStudents.toLocaleString()}
          icon={UserCheck}
          trend={{ value: 8, isPositive: true }}
          iconClassName="bg-success/10 text-success"
          className="[animation-delay:200ms]"
        />
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={BookOpen}
          iconClassName="bg-accent/10 text-accent"
          className="[animation-delay:300ms]"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
          iconClassName="bg-info/10 text-info"
          className="[animation-delay:400ms]"
        />
        <StatCard
          title="Pending Fees"
          value={formatCurrency(stats.pendingFees)}
          icon={DollarSign}
          trend={{ value: 5, isPositive: false }}
          iconClassName="bg-warning/10 text-warning"
          className="[animation-delay:500ms]"
        />
        <StatCard
          title="New Enrollments"
          value={stats.recentEnrollments}
          icon={UserPlus}
          trend={{ value: 20, isPositive: true }}
          iconClassName="bg-primary/10 text-primary"
          className="[animation-delay:600ms]"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Students */}
        <Card className="animate-slide-up [animation-delay:700ms]">
          <CardHeader>
            <CardTitle className="text-lg">Recent Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudents.slice(0, 5).map((student) => (
                <div key={student.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.department}</p>
                  </div>
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    student.status === 'active' && "bg-success/10 text-success",
                    student.status === 'graduated' && "bg-primary/10 text-primary",
                    student.status === 'inactive' && "bg-muted text-muted-foreground"
                  )}>
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card className="animate-slide-up [animation-delay:800ms]">
          <CardHeader>
            <CardTitle className="text-lg">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPayments.map((payment) => (
                <div key={payment.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{payment.studentName}</p>
                    <p className="text-xs text-muted-foreground">{payment.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-success">{formatCurrency(payment.amount)}</p>
                    <p className="text-xs text-muted-foreground">{new Date(payment.paymentDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
