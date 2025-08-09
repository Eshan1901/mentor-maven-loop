import { Client, Account, Databases, Storage, Query, ID } from 'appwrite';

// Appwrite configuration
const client = new Client();

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'your-project-id';

console.log('Appwrite configuration:', { endpoint, projectId });

client
  .setEndpoint(endpoint)
  .setProject(projectId);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'teachloop-db';
export const COLLECTIONS = {
  USERS: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID || 'users',
  COURSES: import.meta.env.VITE_APPWRITE_COURSES_COLLECTION_ID || 'courses',
  ENROLLMENTS: import.meta.env.VITE_APPWRITE_ENROLLMENTS_COLLECTION_ID || 'enrollments',
  LESSONS: import.meta.env.VITE_APPWRITE_LESSONS_COLLECTION_ID || 'lessons',
  PROGRESS: import.meta.env.VITE_APPWRITE_PROGRESS_COLLECTION_ID || 'progress',
};

// Storage Bucket IDs
export const BUCKETS = {
  COURSE_MATERIALS: import.meta.env.VITE_APPWRITE_COURSE_MATERIALS_BUCKET_ID || 'course-materials',
  PROFILE_PICTURES: import.meta.env.VITE_APPWRITE_PROFILE_PICTURES_BUCKET_ID || 'profile-pictures',
};

// Helper functions for common operations
export const appwriteService = {
  // Authentication
  async createAccount(email, password, name) {
    try {
      console.log('Creating account with:', { email, name });
      console.log('Using endpoint:', client.config.endpoint);
      console.log('Using project:', client.config.project);
      
      const user = await account.create(ID.unique(), email, password, name);
      console.log('Account created successfully:', user);
      return user;
    } catch (error) {
      console.error('Error creating account:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        type: error.type,
        response: error.response
      });
      throw error;
    }
  },

  async login(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // User Profile
  async createUserProfile(userId, userData) {
    try {
      const profile = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId,
        userData
      );
      return profile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  async getUserProfile(userId) {
    try {
      const profile = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId
      );
      return profile;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  async updateUserProfile(userId, userData) {
    try {
      const profile = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId,
        userData
      );
      return profile;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Courses
  async createCourse(courseData) {
    try {
      const course = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.COURSES,
        ID.unique(),
        courseData
      );
      return course;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  async getCourses(limit = 10, offset = 0) {
    try {
      const courses = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.COURSES,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc('$createdAt')
        ]
      );
      return courses;
    } catch (error) {
      console.error('Error getting courses:', error);
      throw error;
    }
  },

  async getCourse(courseId) {
    try {
      const course = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.COURSES,
        courseId
      );
      return course;
    } catch (error) {
      console.error('Error getting course:', error);
      throw error;
    }
  },

  async getUserCourses(userId) {
    try {
      const courses = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.COURSES,
        [
          Query.equal('instructorId', userId),
          Query.orderDesc('$createdAt')
        ]
      );
      return courses;
    } catch (error) {
      console.error('Error getting user courses:', error);
      throw error;
    }
  },

  // Enrollments
  async enrollInCourse(userId, courseId) {
    try {
      const enrollment = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ENROLLMENTS,
        ID.unique(),
        {
          userId,
          courseId,
          enrolledAt: new Date().toISOString(),
          progress: 0
        }
      );
      return enrollment;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw error;
    }
  },

  async getEnrollments(userId) {
    try {
      const enrollments = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ENROLLMENTS,
        [
          Query.equal('userId', userId),
          Query.orderDesc('$createdAt')
        ]
      );
      return enrollments;
    } catch (error) {
      console.error('Error getting enrollments:', error);
      throw error;
    }
  },

  // File Upload
  async uploadFile(bucketId, file, fileId = ID.unique()) {
    try {
      const uploadedFile = await storage.createFile(bucketId, fileId, file);
      return uploadedFile;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  async getFilePreview(bucketId, fileId) {
    try {
      const filePreview = storage.getFilePreview(bucketId, fileId);
      return filePreview;
    } catch (error) {
      console.error('Error getting file preview:', error);
      throw error;
    }
  },

  async deleteFile(bucketId, fileId) {
    try {
      await storage.deleteFile(bucketId, fileId);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};

export { Query, ID };
export default client;
