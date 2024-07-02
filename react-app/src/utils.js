export async function callUpdateEventAPI(event_value,event_name) {
    const apiUrl = 'https://ralc7h8ft2.execute-api.ap-south-1.amazonaws.com/event_tracker_my_qr';
    const queryParams = new URLSearchParams({
      event_name: event_name,
      event_value: event_value
    });
  
    // Combine URL with query parameters
    const urlWithParams = `${apiUrl}?${queryParams.toString()}`;
  
    // Include headers (optional)
    const headers = new Headers({
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0',
      'Accept': 'application/json'
    });
  
    try {
      const response = await fetch(urlWithParams, {
        method: 'GET',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API response:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  


  export async function getEventCount(event_name, productCode) {
    try {
      const response = await fetch(`https://ralc7h8ft2.execute-api.ap-south-1.amazonaws.com/get_count_my_qr?event_name=${event_name}&event_value=${productCode}`);
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error('Error fetching scan count:', error);
      return null; // Handle errors appropriately
    }
  }

