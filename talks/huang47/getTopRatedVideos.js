var concat = Array.prototype.concat;

Array.prototype.concatAll = function () {
    return this.reduce(function (a, c) {
        return concat.call(a, c);
    }, []);
};

var data = { "user":
    { "videoLists": [
        { "category": "Recommend",
          "videos": [
            { "title": "Clone Wars", "rating": 5 },
            { "title": "How I Met Your Mother", "rating": 4 },
            { "title": "Turbo", "rating": 5 },
            { "title": "Arrow", "rating": 5 }
        ] },
        { "category": "Social Feed",
          "videos": [
            { "title": "Bob's Burgers", "rating": 5 },
            { "title": "World War Z", "rating": 4 },
            { "title": "Futurama", "rating": 5 },
            { "title": "Supernature", "rating": 5 }
        ] }
    ] }
}

function getTopRatedVideos(user) {
    return user.videoLists.
        map(function (videoList) {
            return videoList.videos.
                filter(function (video) {
                    return 5 === video.rating;
                });
        }).
        concatAll();
}

getTopRatedVideos(data.user).
    forEach(function (video) {
        console.log(video);
    });
