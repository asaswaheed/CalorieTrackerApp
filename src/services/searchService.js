// Mock search results data
const mockSearchResults = [
    { id: 1, name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { id: 2, name: 'Banana', calories: 96, protein: 1.2, carbs: 23, fat: 0.2 },
    { id: 3, name: 'Orange', calories: 43, protein: 0.9, carbs: 9, fat: 0.1 },
    // Add more mock search results as needed
  ];
  
  // Function to fetch search results from API (replace with your actual API endpoint)
  const fetchSearchResults = async (query) => {
    // Perform API call here and return the results
    // Replace the code below with your API call logic
  
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    // Return the mock search results
    return mockSearchResults.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  };
  
  export { fetchSearchResults };