import axios from 'axios';

export const checkSuperuser = async () => { // Export as a named export
    try {
        const response = await axios.get('http://localhost:8000/auth/current-user/', { withCredentials: true });
        const user = response.data;
        console.log("superuser", user)
        if (user.is_superuser) {
            console.log('User is a superuser');
            return true
        } else {
            console.log('User is not a superuser');
            return false
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return false
    }
};
