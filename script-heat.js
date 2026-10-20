// Create map centred on England

const map = L.map('map').setView([53.4, -1.5], 6);

// OpenStreetMap tiles

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; OpenStreetMap contributors'
    }
).addTo(map);

// Load CSV
Papa.parse('attractions.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

      const heatData = results.data.map(row => [
              Number(row.Latitude),
              Number(row.Longitude),
              Number(row.VisitorsThousands)
      ]);

      results.data.forEach(row => {

        heatData.push([
          Number(row.Latitude),
          Number(row.Longitude),
          Number(row.VisitorsThousands)
        ]);
      });
      L.heatLayer(heatData, {
          radius: 25,
          blur: 15,
          maxZoom: 10
      }).addTo(map);
    }
});
