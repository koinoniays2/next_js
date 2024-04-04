export const getUserList = async () => {
    try {
        const response = await fetch("/api/users");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};