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
    <div className="space-y-8 page-enter">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            My Teaching
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your courses and share your knowledge with the world
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg btn-modern">
          <Plus className="mr-2 h-5 w-5" />
          Create Course
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass shadow-lg border-0 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">2</p>
                <p className="text-sm text-muted-foreground">Total Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass shadow-lg border-0 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">38</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass shadow-lg border-0 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">1</p>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass shadow-lg border-0 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white">
                <Video className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">4.8</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Your Courses
        </h2>
        <div className="grid gap-6">
          {courses.map((course, index) => (
            <Card 
              key={course.id} 
              className="glass shadow-lg border-0 card-hover scale-in"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground">{course.title}</CardTitle>
                    <CardDescription className="mt-2 text-muted-foreground">{course.description}</CardDescription>
                  </div>
                  <Badge 
                    variant={course.status === 'Active' ? 'default' : 'secondary'}
                    className={`px-3 py-1 rounded-full font-medium ${
                      course.status === 'Active' 
                        ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-teal-500" />
                      <span className="font-medium">{course.students} students</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="border-purple-200 text-purple-600 bg-purple-50"
                    >
                      {course.level}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="border-blue-200 text-blue-600 bg-blue-50"
                    >
                      {course.mode}
                    </Badge>
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-purple-200 text-purple-600 hover:bg-purple-50 transition-all duration-200"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty state for when no courses exist */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6 float">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No courses yet</h3>
          <p className="text-muted-foreground mb-6">Start sharing your knowledge by creating your first course</p>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="mr-2 h-5 w-5" />
            Create Your First Course
          </Button>
        </div>
      )}
    </div>
  );
}