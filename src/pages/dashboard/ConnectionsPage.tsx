import { useState } from 'react';
import { MessageCircle, UserPlus, Users, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockConnections = {
  students: [
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: '',
      course: 'Introduction to React',
      enrolledDate: '2024-01-10',
      progress: 75,
      rating: 5,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Bob Smith',
      avatar: '',
      course: 'JavaScript Fundamentals',
      enrolledDate: '2024-01-05',
      progress: 100,
      rating: 4,
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Carol Davis',
      avatar: '',
      course: 'Introduction to React',
      enrolledDate: '2024-01-12',
      progress: 45,
      rating: null,
      status: 'Active'
    }
  ],
  teachers: [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      avatar: '',
      course: 'Advanced Python Programming',
      subject: 'Programming',
      rating: 4.8,
      completedDate: '2024-01-08',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: '',
      course: 'UI/UX Design Fundamentals',
      subject: 'Design',
      rating: 4.9,
      completedDate: null,
      status: 'Learning'
    }
  ]
};

export default function ConnectionsPage() {
  const [connections] = useState(mockConnections);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Connections</h1>
        <p className="text-muted-foreground mt-1">
          Connect with your students and teachers
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{connections.students.length}</p>
                <p className="text-sm text-muted-foreground">My Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{connections.teachers.length}</p>
                <p className="text-sm text-muted-foreground">My Teachers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connections Tabs */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="students">My Students</TabsTrigger>
          <TabsTrigger value="teachers">My Teachers</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4">
            {connections.students.map((student) => (
              <Card key={student.id} className="bg-gradient-card shadow-card hover:shadow-glow transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.course}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-muted-foreground">
                            Enrolled: {new Date(student.enrolledDate).toLocaleDateString()}
                          </span>
                          <Badge 
                            variant={student.status === 'Active' ? 'default' : 'secondary'}
                            className={student.status === 'Active' ? 'bg-accent' : ''}
                          >
                            {student.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{student.progress}%</p>
                        <p className="text-xs text-muted-foreground">Progress</p>
                      </div>
                      
                      {student.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                          <span className="text-sm font-medium">{student.rating}</span>
                        </div>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-4">
          <div className="grid gap-4">
            {connections.teachers.map((teacher) => (
              <Card key={teacher.id} className="bg-gradient-card shadow-card hover:shadow-glow transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={teacher.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <h3 className="font-semibold">{teacher.name}</h3>
                        <p className="text-sm text-muted-foreground">{teacher.course}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <Badge variant="outline">{teacher.subject}</Badge>
                          <Badge 
                            variant={teacher.status === 'Learning' ? 'default' : 'secondary'}
                            className={teacher.status === 'Learning' ? 'bg-accent' : ''}
                          >
                            {teacher.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                        <span className="text-sm font-medium">{teacher.rating}</span>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}