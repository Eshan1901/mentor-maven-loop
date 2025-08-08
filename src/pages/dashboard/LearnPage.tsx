import { useState } from 'react';
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockCourses = [
  {
    id: 1,
    title: 'Advanced Python Programming',
    description: 'Deep dive into Python advanced concepts, decorators, and async programming',
    instructor: 'Dr. Sarah Johnson',
    instructorAvatar: '',
    rating: 4.8,
    students: 156,
    duration: '8 weeks',
    level: 'Advanced',
    category: 'Programming',
    price: 'Free',
    tags: ['Python', 'Advanced', 'Programming']
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of great user interface and user experience design',
    instructor: 'Mike Chen',
    instructorAvatar: '',
    rating: 4.9,
    students: 234,
    duration: '6 weeks',
    level: 'Beginner',
    category: 'Design',
    price: 'Free',
    tags: ['UI', 'UX', 'Design', 'Figma']
  },
  {
    id: 3,
    title: 'Machine Learning Basics',
    description: 'Introduction to ML algorithms, supervised and unsupervised learning',
    instructor: 'Prof. Alex Kumar',
    instructorAvatar: '',
    rating: 4.7,
    students: 89,
    duration: '10 weeks',
    level: 'Intermediate',
    category: 'Data Science',
    price: 'Free',
    tags: ['ML', 'AI', 'Python', 'Data Science']
  },
  {
    id: 4,
    title: 'Digital Marketing Strategy',
    description: 'Complete guide to digital marketing, SEO, and social media strategies',
    instructor: 'Emma Wilson',
    instructorAvatar: '',
    rating: 4.6,
    students: 178,
    duration: '4 weeks',
    level: 'Beginner',
    category: 'Marketing',
    price: 'Free',
    tags: ['Marketing', 'SEO', 'Social Media']
  }
];

export default function LearnPage() {
  const [courses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Programming', 'Design', 'Data Science', 'Marketing'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Discover Courses</h1>
        <p className="text-muted-foreground mt-1">
          Explore courses and expand your knowledge
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, skills, or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white shadow-sm focus:shadow-soft transition-all"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'bg-gradient-primary' : ''}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                  {course.price}
                </Badge>
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {course.title}
              </CardTitle>
              <CardDescription className="text-sm line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Instructor */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={course.instructorAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{course.instructor}</span>
              </div>

              {/* Course Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Level and Action */}
              <div className="flex items-center justify-between pt-2">
                <Badge variant="outline">{course.level}</Badge>
                <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Enroll
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
}