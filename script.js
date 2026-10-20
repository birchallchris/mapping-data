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

        results.data.forEach(row => {

            const visitors =
                Number(row.VisitorsThousands);

            const marker =
                L.circleMarker(
                    [
                        Number(row.Latitude),
                        Number(row.Longitude)
                    ],
                    {
                        radius: Math.max(
                            5,
                            visitors / 200
                        ),
                        fillColor: '#e63946',
                        color: '#b00020',
                        weight: 1,
                        fillOpacity: 0.7
                    }
                ).addTo(map);

            marker.bindPopup(`
                <h3>${row.Attraction}</h3>
                <p><strong>Region:</strong> ${row.Region}</p>
                <p><strong>Visitors:</strong> ${visitors.toLocaleString()} thousand</p>
            `);
        });

    }
});
