let travelData = {};

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchBtn");
  const clearButton = document.getElementById("clearBtn");
  const resultsDiv = document.getElementById("results");

  fetch("travel_recommendation_api.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      travelData = data;
    })
    .catch((error) => {
      console.error("Error fetching travel recommendations:", error);
    });

    searchButton.addEventListener("click", () => {
        const keyword = input.value.trim().toLowerCase();
        resultsDiv.innerHTML = "";
      
        //console.log("Buscando por:", keyword);
        //console.log("Dados carregados:", travelData);
      

    const keywordMap = {
      beach: "beaches",
      beaches: "beaches",
      temple: "temples",
      temples: "temples",
      country: "countries",
      countries: "countries"
    };

    const category = keywordMap[keyword];

    if (category && travelData[category]) {
        travelData[category].forEach((place) => {
            const card = document.createElement("div");
            card.style.border = "1px solid #ccc";
            card.style.borderRadius = "12px";
            card.style.width = "100%";
            card.style.maxWidth = "700px";
            card.style.margin = "20px auto";
            card.style.backgroundColor = "#ffffff";
            card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            card.style.overflow = "hidden";
          
            card.innerHTML = `
              <img src="${place.imageUrl}" alt="${place.name}" style="width: 100%; height: auto;">
              <div style="padding: 20px;">
                <h2 style="margin-top: 0; font-size: 24px; color: #333;">${place.name}</h2>
                <p style="font-size: 16px; color: #555;">${place.description}</p>
                <p style="font-size: 14px; font-style: italic; color: #888;">Category: ${category}</p>
                <button style="margin-top: 10px; background-color: #01796f; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Visit</button>
              </div>
            `;
          
            resultsDiv.appendChild(card);
          });          
    } else {
      resultsDiv.innerHTML = "<p style='color: white;'>No results found. Try a different keyword.</p>";
    }
  });

  clearButton.addEventListener("click", () => {
    input.value = "";
    resultsDiv.innerHTML = "";
  });
});
