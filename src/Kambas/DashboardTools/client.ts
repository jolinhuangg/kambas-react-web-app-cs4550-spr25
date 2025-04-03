import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollInCourse = async (userId: string, courseId: string) => {
    console.log(userId, courseId);
    const response = await axios.post(`${ENROLLMENTS_API}/enroll`, {
        userId,
        courseId,
    });
    return response.data;
};

export const unenrollFromCourse = async (enrollmentId: string) => {
    const response = await axios.delete(`${ENROLLMENTS_API}/unenroll/${enrollmentId}`);
    return response.data;
};

export const findEnrollmentByCourseAndUser = async (userId: string, courseId: string) => {
    const response = await axios.get(`${ENROLLMENTS_API}/${userId}/${courseId}`);
    return response.data;
};