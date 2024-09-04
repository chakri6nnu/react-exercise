export const fetchData = async () => {
    const response = await fetch('http://localhost:8080/data');
    const data = await response.json();
    return data;
};
