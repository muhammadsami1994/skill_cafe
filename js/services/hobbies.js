dashboard.factory('Hobbies', ['$resource', '$http', '$state', '_', '$cookieStore', function ($resource, $http, $state, _, $cookieStore) {

    var hobbies_one = ['3D Printing', 'A vintage scrapbook', 'Acting', 'Aeromodeling', 'Air sports',
        'Airbrushing', 'Aircraft Spotting', 'Aircraft spotting', 'Airsoft', 'Airsofting', 'Amateur Astronomy',
        'Amateur Radio', 'Amateur astronomy', 'Amateur geology', 'Amateur radio[1]', 'American football',
        'Animal showing', 'Animals/pets/dogs', 'Antiquing', 'Antiquities',
        'Aquarium (Freshwater &amp; Saltwater)', 'Archery', 'Art collecting', 'Arts',
        'Asking Yahoo and other social media', 'Association football (Soccer)', 'Astrology', 'Astronomy',
        'Audiophilia', 'Australian Football League', 'Auto Racing', 'Auto audiophilia', 'Auto racing', 'BASE jumping', 'BMX', 'Backgammon',
        'Backpacking', 'Badminton', 'Base Jumping', 'Baseball', 'Basketball', 'Baton Twirling', 'Baton twirling',
        'Beach Volleyball', 'Beach/Sun tanning', 'Beachcombing', 'Beadwork', 'Beatboxing', 'Beauty',
        'Becoming A Child Advocate', 'Beekeeping', 'Bell Ringing', 'Belly Dancing', 'Bicycle Polo', 'Bicycling', 'Billiards', 'Bird watching',
        'Birding', 'Birdwatching', 'Blacksmithing', 'Blogging', 'Board sports', 'BoardGames', 'Boating', 'Body Building', 'Bonsai Tree',
        'Book collecting', 'Bookbinding', 'Boomerangs', 'Bowling', 'Boxing', 'Brazilian jiu-jitsu', 'Breakdancing',
        'Brewing Beer', 'Bridge', 'Bridge Building', 'Bringing Food To The Disabled',
        'Building A House For Habitat For Humanity', 'Building Dollhouses', 'Bus spotting', 'Butterfly Watching',
        'Button Collecting', 'Cake Decorating', 'Calligraphy', 'Camping', 'Candle Making', 'Canoeing', 'Car Racing',
        'Card collecting', 'Cartooning', 'Casino Gambling', 'Cave Diving', 'Ceramics', 'Cheerleading', 'Chess',
        'Church/church activities', 'Cigar Smoking', 'Cleaning', 'Climbing', 'Cloud Watching', 'Coin Collecting', 'Coin collecting',
        'Collecting', 'Collecting Antiques', 'Collecting Artwork', 'Collecting Hats', 'Collecting Music Albums',
        'Collecting RPM Records', 'Collecting Sports Cards (Baseball, Football, Basketball, Hockey)', 'Collecting Swords',
        'Collection hobbies[edit]', 'College football', 'Color Guard', 'Coloring', 'Competition hobbies[edit]', 'Compose Music',
        'Computer activities', 'Computer programming', 'Conworlding', 'Cooking', 'Cosplay', 'Cosplaying', 'Couponing', 'Crafts',
        'Crafts (unspecified)', 'Creative writing', 'Cricket', 'Cricket (Indoor)', 'Crochet', 'Crocheting', 'Cross-Stitch',
        'Crossword Puzzles', 'Cryptography', 'Cubing', 'Curling', 'Cycling', 'Dance', 'Dancing', 'Darts', 'Debate',
        'Deltiology (Postcard collecting)', 'Demarini 2013 CF5', 'Diecast Collectibles', 'Digital Photography',
        'Digital arts', 'Disc golf', 'Dodgeball', 'Dog sport', 'Dolls', 'Dominoes', 'Dowsing', 'Drama', 'Drawing', 'Drinking Coffee', 'Driving', 'Dumpster Diving', 'Eating out', 'Educational Courses', 'Electronics', 'Embroidery', 'Entertaining', 'Equestrianism', 'Exercise (aerobics, weights)', 'Exhibition Drill', 'Falconry', 'Fast cars', 'Felting', 'Fencing', 'Field Hockey', 'Figure skating', 'Fire Poi', 'Fishing', 'Fishkeeping', 'Flag Football', 'Floorball', 'Floral Arrangements', 'Flower collecting and pressing', 'Fly Tying', 'Flying', 'Footbag', 'Football', 'Foraging', 'Foreign language learning', 'Fossil hunting', 'Four Wheeling', 'Freshwater Aquariums', 'Frisbee Golf – Frolf', 'Gambling', 'Games', 'Gaming', 'Gaming (tabletop games and role-playing games)', 'Garage Saleing', 'Gardening', 'Genealogy', 'Geocaching', 'Ghost Hunting', 'Glowsticking', 'Gnoming', 'Go', 'Go Kart Racing', 'Going to movies', 'Golf', 'Golfing', 'Gongoozling', 'Graffiti', 'Grip Strength', 'Guitar', 'Gun Collecting', 'Gunsmithing', 'Gymnastics', 'Gyotaku', 'Handball', 'Handwriting Analysis', 'Hang gliding', 'Herping', 'Hiking', 'Home Brewing', 'Home Repair', 'Home Theater', 'Homebrewing', 'Hooping', 'Horse riding', 'Hot air ballooning', 'Hula Hooping', 'Hunting', 'Ice hockey', 'Iceskating', 'Illusion', 'Impersonations', 'Indoors[edit]', 'Inline Skating', 'Insect collecting', 'Internet', 'Inventing', 'Jet Engines', 'Jewelry Making', 'Jewelry making', 'Jigsaw Puzzles', 'Jogging', 'Judo', 'Jugger', 'Juggling', 'Jukskei', 'Jump Roping', 'Kart racing', 'Kayaking', 'Keep A Journal', 'Kitchen Chemistry', 'Kite Boarding', 'Kiteboarding', 'Kiteflying', 'Kites', 'Knitting', 'Knotting', 'LARPing', 'Lacemaking', 'Lacrosse', 'Lapidary', 'Laser tag', 'Lasers', 'Lawn Darts', 'Lawn Tennis', 'Leaf collecting and pressing', 'Learn to Play Poker', 'Learning A Foreign Language', 'Learning An Instrument', 'Learning To Pilot A Plane', 'Leather crafting', 'Leathercrafting', 'Lego Building', 'Legos', 'Letterboxing',
        'Listening to music', 'Locksport', 'Machining', 'Macramé', 'Magic', 'Mahjong', 'Making Model Cars', 'Marbles',
        'Marksmanship', 'Martial Arts', 'Martial arts', 'Matchstick Modeling', 'Meditation', 'Metal Detecting',
        'Metal detecting', 'Meteorology', 'Microscopy', 'Mineral collecting', 'Model Building', 'Model Railroading',
        'Model Rockets', 'Model aircraft making and flying', 'Modeling Ships', 'Modelling', 'Models', 'Motor sports',
        'Motorcycles', 'Mountain Biking', 'Mountain Climbing', 'Mountain biking', 'Mountaineering', 'Movie collecting',
        'Mushroom Hunting or Mycology', 'Musical Instruments', 'Nail Art', 'Needlepoint', 'Net Ball', 'Nordic skating',
        'Observation hobbies[edit]', 'Origami', 'Outdoors[edit]', 'Owning An Antique Car', 'Paint Ball', 'Paintball', 'Painting',
        'Papermache', 'Papermaking', 'Parachuting', 'Paragliding or Power Paragliding', 'Parkour', 'People Watching', 'People watching',
        'Photography', 'Piano', 'Pigeon racing', 'Ping Pong', 'Pinochle', 'Pipe Smoking', 'Planking', 'Playing Musical Instruments',
        'Playing music', 'Playing team sports', 'Poker', 'Pole Dancing', 'Polo', 'Pottery', 'Powerboking', 'Programming', 'Protesting',
        'Puppetry', 'Puzzles', 'Pyrotechnics', 'Quilting', 'R/C Boats', 'R/C Cars', 'R/C Helicopters', 'R/C Planes', 'RC cars', 'Racing Pigeons',
        'Racquetball', 'Radio-controlled car racing (hobby grade)', 'Rafting', 'Railfans', 'Rappelling', 'Rapping',
        'Reading', 'Reading To The Elderly', 'Record collecting', 'Relaxing', 'Renaissance Faire', 'Renting movies',
        'Rescuing Abused Or Abandoned Animals', 'Robotics', 'Rock Balancing', 'Rock Collecting', 'Rock climbing', 'Rock stacking',
        'Rockets', 'Rocking AIDS Babies', 'Roleplaying', 'Roller Derby', 'Roller skating', 'Rugby', 'Rugby league football',
        'Running', 'Sailing', 'Saltwater Aquariums', 'Sand Castles', 'Sand castle building', 'Scrapbooking', 'Scuba Diving',
        'Sculling or Rowing', 'Sculpting', 'Seaglass collecting', 'Seashell collecting', 'Self Defense', 'Sewing',
        'Shark Fishing', 'Shooting', 'Shooting sport', 'Shopping', 'Shortwave listening', 'Singing', 'Singing In Choir', 'Skateboarding', 'Skating', 'Skeet Shooting', 'Sketching', 'Skiing', 'Skimboarding', 'Sky Diving', 'Skydiving', 'Slack Lining', 'Slacklining', 'Sleeping', 'Slingshots', 'Slot Car Racing', 'Slot car racing', 'Snooker', 'Snorkeling', 'Snowboarding', 'Soap Making', 'Soapmaking', 'Soccer', 'Socializing with friends/neighbors', 'Speed Cubing (rubix cube)', 'Speed skating', 'Spelunkering', 'Spending time with family/kids',
        'Sports', 'Squash', 'Stamp Collecting', 'Stamp collecting', 'Stand-Up Comedy', 'Stone collecting', 'Storm Chasing', 'Storytelling', 'String Figures', 'Sudoku', 'Surf Fishing', 'Surfing', 'Survival', 'Swimming', 'TV watching', 'Table football', 'Table tennis', 'Taekwondo', 'Tai Chi', 'Target shooting', 'Tatting', 'Taxidermy', 'Tea Tasting', 'Tennis', 'Tesla Coils', 'Tetris', 'Textiles', 'Texting', 'Tombstone Rubbing', 'Tool Collecting', 'Touch football', 'Tour skating', 'Toy Collecting', 'Train Collecting', 'Train Spotting', 'Trainspotting',
        'Traveling', 'Treasure Hunting', 'Trekkie', 'Triathlon', 'Tutoring Children', 'Ultimate Frisbee', 'Urban Exploration',
        'Urban exploration', 'Vehicle restoration', 'Video Games', 'Video game collecting', 'Video gaming', 'Videophilia (Home theater)', 'Vintage Books', 'Vintage cars', 'Vintage clothing', 'Violin', 'Volleyball', 'Volunteer', 'Walking', 'Warhammer', 'Watching Movies', 'Watching sporting events', 'Water sports', 'Weather Watcher', 'Web surfing', 'Weightlifting', 'Windsurfing', 'Wine Making', 'Wingsuit Flying', 'Wood carving', 'Woodworking', 'Working In A Food Pantry', 'Working on cars', 'World Record Breaking', 'Worldbuilding', 'Wrestling', 'Writing', 'Writing Music', 'Writing Songs', 'Yo-yoing', 'YoYo', 'Yoga', 'Ziplining', 'baseball bat'];

    var common_hobbies_one = [
        'Traveling',
        'Reading',
        'Listening to music',
        'Photography',
        'Sports'
    ];

    var common_hobbies = function () {
        return common_hobbies_one;
    };
    var hobbies = function () {
        return hobbies_one;
    };

    return {
        hobbies: hobbies,
        common_hobbies: common_hobbies
    };
}]);