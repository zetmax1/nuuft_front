const BASE_URL = 'https://student.jbnuu.uz/rest';

export const fetchEmployeeStats = async () => {
    try {
        const response = await fetch(`${BASE_URL}/v1/public/stat-employee`);
        if (!response.ok) throw new Error('Failed to fetch employee stats');
        return await response.json();
    } catch (error) {
        console.error('Error fetching employee stats:', error);
        return null;
    }
};

export const fetchStudentStats = async () => {
    try {
        const response = await fetch(`${BASE_URL}/v1/public/stat-student`);
        if (!response.ok) throw new Error('Failed to fetch student stats');
        return await response.json();
    } catch (error) {
        console.error('Error fetching student stats:', error);
        return null;
    }
};

export const fetchStructureStats = async () => {
    try {
        const response = await fetch(`${BASE_URL}/v1/public/stat-structure`);
        if (!response.ok) throw new Error('Failed to fetch structure stats');
        return await response.json();
    } catch (error) {
        console.error('Error fetching structure stats:', error);
        return null;
    }
};

export const fetchUniversityProfile = async () => {
    try {
        const response = await fetch(`${BASE_URL}/v1/public/university-profile`);
        if (!response.ok) throw new Error('Failed to fetch university profile');
        return await response.json();
    } catch (error) {
        console.error('Error fetching university profile:', error);
        return null;
    }
};

export const fetchUniversityList = async () => {
    try {
        const response = await fetch(`${BASE_URL}/v1/public/university-list`);
        if (!response.ok) throw new Error('Failed to fetch university list');
        return await response.json();
    } catch (error) {
        console.error('Error fetching university list:', error);
        return null;
    }
};
