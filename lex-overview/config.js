var config = {
    style: 'mapbox://styles/mapbox/satellite-v9',
    accessToken: 'pk.eyJ1IjoiaGVsYnloaWtlcyIsImEiOiJjazR5cGw5YjEwMzJxM2RxZzJoODh4OG5oIn0.n684auP32dq-nLbOKbCnCA',
    showMarkers: false,
    markerColor: '#3FB1CE',
    theme: 'light',
    use3dTerrain: true,
    title: 'Exploring Alaska\'s Coastal Wilderness',
    subtitle: 'Day-by-day itinerary',
    byline: 'Ben Shulman',
    footer: '',
    chapters: [
        {
            id: 'overview',
            alignment: 'left',
            hidden: false,
            title: 'Trip Overview',
            image: 'images/overview.jpeg',
            description: 'See the iconic wildlife—whales, bears and eagles—amid secluded coves and towering forests. Explore massive glaciers, kayak scenic coastlines, plus see the hidden wonders we’ve discovered in our 30+ years leading Alaska expeditions.',
            location: {
                center: [-137.20900, 57.55399],
                zoom: 6.89,
                pitch: 0.00,
                bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [
            ],
            onChapterExit: [
            ]
        },
        {
            id: 'day-1',
            alignment: 'left',
            hidden: false,
            title: 'Juneau/Embark',
            image: 'images/day-1.jpeg',
            description: 'Explore Juneau and the Alaska State Museum with its sprawling collection of natural history and cultural artifacts. Settle into your cabin before dinner.',
            location: {
                center: [-134.62916, 58.36589],
                zoom: 12.24,
                pitch: 62.74,
                bearing: 21.37
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-2',
            alignment: 'left',
            hidden: false,
            title: 'Tracy Arm-Fords Terror Wilderness',
            image: 'images/day-2.jpeg',
            description: 'Voyage into Tracy or Endicott Arm, both spectacular fjords, with waterfalls cascading from glacially carved walls. See the soaring Dawes or South Sawyer Glacier up close and take a cruise in an expedition landing craft for an unbeatable view among sculpted icebergs. Keep an eye out for harbor seals, harbor porpoises and arctic terns.',
            location: {
                center: [-133.33864, 57.89194],
                zoom: 10.98,
                pitch: 56.69,
                bearing: 109.26
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-3',
            alignment: 'left',
            hidden: false,
            title: 'Petersburg',
            image: 'images/day-3.jpeg',
            description: 'Visit the small, true Alaskan fishing town of Petersburg on Mitkof Island, which still retains much of its Norwegian heritage. Explore a unique Southeast Alaskan ecosystem, the “muskeg,” with stunted trees and carnivorous plants. There is an opportunity to stretch your legs with an optional bike ride around town. This evening, enjoy a crab feast.',
            location: {
                center: [-132.95631, 56.80249],
                zoom: 13.04,
                pitch: 60.31,
                bearing: -104.66
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-4',
            alignment: 'left',
            hidden: false,
            title: 'Frederick Sound and Chatham Strait',
            image: 'images/day-4.jpeg',
            description: 'Explore along the rugged coast seeking out humpback whales in their summer feeding grounds. Expert staff will interpret their life histories and behaviors as we cruise the nutrient rich waters. Later we will explore the shoreline by kayak or go ashore to explore the rainforest ecosystem.',
            location: {
                center: [-134.66311, 57.02371],
                zoom: 10.79,
                pitch: 63.80,
                bearing: -23.83
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-5',
            alignment: 'left',
            hidden: false,
            title: 'Icy Strait and the Inian Islands',
            image: 'images/day-5.jpeg',
            description: 'Explore among the Inian Islands, where an abundance of Steller sea lions and sea otters reside. We’ll search for marine mammals in the rich waters of Icy Strait and choose the perfect spot around Chichagof Island to hike where sightings of bald eagles are very common.',
            location: {
                center: [-136.36529, 58.21815],
                zoom: 12.10,
                pitch: 65.28,
                bearing: 17.45
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-6',
            alignment: 'left',
            hidden: false,
            title: 'Glacier Bay National Park',
            image: 'images/day-6.jpeg',
            description: 'By special permit, we explore Glacier Bay. Wildness abounds—glaciers calving, mountain goats roam the steep cliffs and brown bears patrol the shore; Steller sea lions and puffins live in the icy waters. A native Tlingit cultural interpreter joins us to share the lore and legend of the area. We will also be joined by a National Park Service Ranger.',
            location: {
                center: [-136.25817, 58.49332],
                zoom: 10.02,
                pitch: 55.28,
                bearing: -65.42
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-7',
            alignment: 'left',
            hidden: false,
            title: 'Southeast Alaska’s Islands, Bays and Fjords',
            image: 'images/day-7.jpeg',
            description: 'Today, nature is our guide. We may explore an isolated beach to take a closer look at tide pools, beachcomb, hike stunning forest trails, or see bear tracks worn into the soil while walking an isolated meadow. If conditions permit, we will do some kayaking, always watching for marine and terrestrial life.',
            location: {
                center: [-134.88233, 57.47802],
                zoom: 13.04,
                pitch: 63.10,
                bearing: -60.68
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'day-8',
            alignment: 'left',
            hidden: false,
            title: 'Sitka/Disembark',
            image: 'images/day-8.jpeg',
            description: 'After breakfast we disembark in Sitka, Southeast Alaska’s only oceanfront town. Visit the onion-domed St. Michael’s Russian Orthodox Church. At the Raptor Rehabilitation Center, we enjoy close-up views of bald eagles, owls and other species normally seen at a distance.',
            location: {
                center: [-135.37726, 57.05889],
                zoom: 13.07,
                pitch: 60.00,
                bearing: 25.42
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};
