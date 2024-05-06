import fetchClient from "../../utils/fetchClient";

const newsApi = async (page: number, pageSize: number) => {
  try {
    const response = await fetchClient.get(`posts?page=${page}&pageSize=${pageSize}`); // Add page to the query if u want to fetch more data
    
    if(response.status === 500) {
        throw new Error('Network response was not ok');
    }

   return response.data;
  }catch (error){
    throw new Error("Error fetching items");
  }
 
  };

export {newsApi}