import { useState, useEffect, useRef } from 'react';
import { Navigation2, MapPin, Search, PlusCircle } from 'lucide-react';
import './HospitalFinder.css';

export default function HospitalFinder() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const markerRef = useRef([]);

  useEffect(() => {
    // 1. Get user position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(loc);
          initMap(loc);
        },
        () => {
          initMap(userLocation); // default
        }
      );
    } else {
      initMap(userLocation);
    }
  }, []);

  const initMap = (center) => {
    if (!window.google) return;
    
    const newMap = new google.maps.Map(mapRef.current, {
      center,
      zoom: 14,
      disableDefaultUI: false,
      styles: [ // Dark mode style for a premium feel
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    });

    setMap(newMap);
    setLoading(false);
    searchHospitals(center, newMap);
  };

  const searchHospitals = (location, googleMap) => {
    if (!window.google) return;
    
    // Fetch from our local backend (Fullstack)
    fetch('http://localhost:5000/api/hospitals')
      .then(res => res.json())
      .then(dbHospitals => {
        console.log("Fullstack Backend Hospitals:", dbHospitals);
        // Merge or handle database hospitals if needed
      })
      .catch(err => console.error("Backend fetch error:", err));

    const service = new google.maps.places.PlacesService(googleMap);
    const request = {
      location: location,
      radius: '10000', // 10km radius
      type: ['hospital']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setHospitals(results);
        clearMarkers();
        results.forEach(place => createMarker(place, googleMap));
      }
    });

    // Add user marker
    new google.maps.Marker({
      position: location,
      map: googleMap,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#00dfd8',
        fillOpacity: 1,
        strokeWeight: 4,
        strokeColor: 'white',
      },
      title: 'Current Location'
    });
  };

  const createMarker = (place, googleMap) => {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map: googleMap,
      position: place.geometry.location,
      title: place.name,
      animation: google.maps.Animation.DROP,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="color: #333; padding: 5px;">
          <h3 style="margin: 0">${place.name}</h3>
          <p style="margin: 5px 0 0">${place.vicinity}</p>
          <span style="color: ${place.rating > 4 ? '#4caf50' : '#888'}">Rating: ${place.rating || 'N/A'}</span>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(googleMap, marker);
    });

    markerRef.current.push(marker);
  };

  const clearMarkers = () => {
    markerRef.current.forEach(m => m.setMap(null));
    markerRef.current = [];
  };

  const panToPlace = (place) => {
    if (map && place.geometry && place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(16);
    }
  };

  return (
    <div className="page-container animate-fade-in hospital-finder">
      <header className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 className="gradient-text">Hospitals Nearby</h1>
        <p className="subtitle">Locating the best care within a 10km radius.</p>
      </header>

      <div className="hospital-content">
        <div className="hospital-list">
          <div className="search-bar glass-panel">
            <Search size={20} color="#94a3b8" />
            <input type="text" placeholder="Search hospitals..." />
          </div>

          <div className="hospital-scroll-container">
            {loading ? (
              <div className="glass-panel loading-indicator">
                <div className="skeleton-item" />
                <div className="skeleton-item" />
                <div className="skeleton-item" />
              </div>
            ) : hospitals.length > 0 ? (
              hospitals.map((h, i) => (
                <div key={i} className="glass-panel interactive hospital-card" onClick={() => panToPlace(h)}>
                  <div className="hospital-icon-mini">
                    <MapPin size={24} color="var(--primary-color)" />
                  </div>
                  <div className="hospital-details">
                    <h3>{h.name}</h3>
                    <p className="address">{h.vicinity}</p>
                    <div className="badges">
                      {h.rating && <span className="rating-badge">★ {h.rating}</span>}
                      {h.user_ratings_total && <span className="reviews">({h.user_ratings_total} reviews)</span>}
                    </div>
                  </div>
                  <button className="btn btn-glass icon-btn">
                    <Navigation2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-state glass-panel">
                <MapPin size={48} color="#94a3b8" />
                <p>No hospitals found in this area.</p>
              </div>
            )}
          </div>
        </div>

        <div className="map-view-wrapper glass-panel">
          <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '1rem' }} />
          {loading && (
            <div className="map-loader">
              <div className="spinner" />
              <p>Initializing Map...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
