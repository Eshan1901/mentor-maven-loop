import { useState, useEffect } from 'react';
import { appwriteService } from '../services/appwrite';

export interface Course {
  $id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  category: string;
  level: string;
  price?: number;
  thumbnail?: string;
  status: 'draft' | 'published' | 'archived';
  enrollmentCount: number;
  $createdAt: string;
  $updatedAt: string;
}

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await appwriteService.getCourses();
      setCourses(response.documents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async (courseData: Omit<Course, '$id' | '$createdAt' | '$updatedAt'>) => {
    try {
      const newCourse = await appwriteService.createCourse(courseData);
      setCourses(prev => [newCourse, ...prev]);
      return newCourse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course');
      throw err;
    }
  };

  const enrollInCourse = async (userId: string, courseId: string) => {
    try {
      await appwriteService.enrollInCourse(userId, courseId);
      // Update enrollment count
      setCourses(prev => 
        prev.map(course => 
          course.$id === courseId 
            ? { ...course, enrollmentCount: course.enrollmentCount + 1 }
            : course
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enroll in course');
      throw err;
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    enrollInCourse
  };
};

export const useUserCourses = (userId: string | null) => {
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUserCourses = async () => {
      try {
        setLoading(true);
        const response = await appwriteService.getUserCourses(userId);
        setUserCourses(response.documents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user courses');
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, [userId]);

  return {
    userCourses,
    loading,
    error
  };
};

export const useEnrollments = (userId: string | null) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const response = await appwriteService.getEnrollments(userId);
        setEnrollments(response.documents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch enrollments');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [userId]);

  return {
    enrollments,
    loading,
    error
  };
};
