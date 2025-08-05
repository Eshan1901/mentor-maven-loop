import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, BookOpen, Clock, TrendingUp, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockProgress = {
  teaching: {
    totalCourses: 2,
    activeStudents: 38,
    completedSessions: 15,
    avgRating: 4.8,
    totalHours: 120,
    streak: 7
  },
  learning: {
    enrolledCourses: 3,
    completedCourses: 1,
    totalHours: 45,
    certificatesEarned: 1,
    streak: 12,
    currentProgress: [
      { course: 'Advanced Python Programming', progress: 75, nextDeadline: '2024-01-20' },
      { course: 'UI/UX Design Fundamentals', progress: 45, nextDeadline: '2024-01-18' },
      { course: 'Machine Learning Basics', progress: 20, nextDeadline: '2024-01-25' }
    ]
  },
  badges: [
    { id: 1, name: 'First Course Created', description: 'Created your first teaching course', earned: true, icon: '🎯' },
    { id: 2, name: 'Student Favorite', description: 'Received 5 five-star ratings', earned: true, icon: '⭐' },
    { id: 3, name: 'Knowledge Seeker', description: 'Completed 5 courses as a student', earned: false, icon: '📚' },
    { id: 4, name: 'Consistency Champion', description: 'Maintained a 30-day learning streak', earned: false, icon: '🔥' },
    { id: 5, name: 'Community Builder', description: 'Connected with 50+ people', earned: false, icon: '🤝' },
    { id: 6, name: 'Expert Teacher', description: 'Taught 100+ students', earned: false, icon: '👨‍🏫' }
  ]
};

export default function ProgressPage() {
  const { teaching, learning, badges } = mockProgress;
  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Progress</h1>
        <p className="text-muted-foreground mt-1">
          Track your learning and teaching journey
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{learning.enrolledCourses}</p>
                <p className="text-sm text-muted-foreground">Courses Learning</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{learning.completedCourses}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{learning.totalHours + teaching.totalHours}</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{learning.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="learning" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="learning">Learning Progress</TabsTrigger>
          <TabsTrigger value="teaching">Teaching Stats</TabsTrigger>
          <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="learning" className="space-y-4">
          <div className="grid gap-6">
            {/* Current Courses */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Current Learning Progress</CardTitle>
                <CardDescription>Your active courses and progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {learning.currentProgress.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{course.course}</h4>
                      <Badge variant="outline">
                        Due: {new Date(course.nextDeadline).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-accent" />
                    <span>Certificates Earned</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent">{learning.certificatesEarned}</p>
                  <p className="text-sm text-muted-foreground mt-1">Keep learning to earn more!</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Learning Streak</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{learning.streak} days</p>
                  <p className="text-sm text-muted-foreground mt-1">Amazing consistency!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="teaching" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Teaching Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Courses</span>
                  <span className="font-semibold">{teaching.totalCourses}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Students</span>
                  <span className="font-semibold">{teaching.activeStudents}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed Sessions</span>
                  <span className="font-semibold">{teaching.completedSessions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Teaching Hours</span>
                  <span className="font-semibold">{teaching.totalHours}h</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Average Rating</span>
                    <span className="font-semibold flex items-center">
                      {teaching.avgRating} ⭐
                    </span>
                  </div>
                  <Progress value={teaching.avgRating * 20} className="h-2" />
                </div>
                <div className="flex justify-between">
                  <span>Teaching Streak</span>
                  <span className="font-semibold">{teaching.streak} days</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          {/* Earned Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Earned Badges ({earnedBadges.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => (
                <Card key={badge.id} className="bg-gradient-card shadow-card border-accent/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-semibold text-accent mb-1">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    <Badge className="mt-2 bg-accent">Earned</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Available Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Badges ({availableBadges.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableBadges.map((badge) => (
                <Card key={badge.id} className="bg-gradient-card shadow-card opacity-60">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                    <h4 className="font-semibold mb-1">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    <Badge variant="secondary" className="mt-2">Locked</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}