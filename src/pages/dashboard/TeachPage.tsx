import { useState } from 'react';
import { Plus, BookOpen, Users, Calendar, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockCourses = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the basics of React.js from scratch',
    students: 15,
    level: 'Beginner',
    mode: 'Live',
    date: '2024-01-15',
    status: 'Active'
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts of JavaScript',
    students: 23,
    level: 'Intermediate',
    mode: 'Recorded',
    date: '2024-01-10',
    status: 'Completed'
  }
];

export default function TeachPage() {
  const [courses] = useState(mockCourses);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Teaching</h1>
          <p className="text-muted-foreground mt-1">
            Manage your courses and share your knowledge
          </p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Total Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">38</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Video className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Courses</h2>
        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="bg-gradient-card shadow-card hover:shadow-glow transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="mt-1">{course.description}</CardDescription>
                  </div>
                  <Badge 
                    variant={course.status === 'Active' ? 'default' : 'secondary'}
                    className={course.status === 'Active' ? 'bg-accent' : ''}
                  >
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} students</span>
                    </div>
                    <Badge variant="outline">{course.level}</Badge>
                    <Badge variant="outline">{course.mode}</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}