const USERNAME = "G2";
const LUCENE_ESCAPE = /([\!\*\+\-\=\<\>\&\|\(\)\[\]\{\}\^\~\?\:\\/"])/g;

let artworkTile     = null;
let artworkPlaceholder = null;
let albumTitle      = null;
let albumArtist     = null;
let track           = null;
let status          = null;
let animatedBars    = null;
let prev_mbid       = null;

function initMusicTile() {
    artworkTile     = document.getElementById("mainArtwork");
    artworkPlaceholder = document.getElementById("mainArtworkPlaceholder");
    albumTitle      = document.getElementById("albumTitle");
    albumArtist     = document.getElementById("albumArtist");
    track           = document.getElementById("track");
    status          = document.getElementById("musicStatus");
    animatedBars    = document.getElementById("playingBars");
    prev_mbid       = null;
}

async function startMusicTile() {
    // Get my currently playing song!
    let statusTmp = "Currently playing:";
    let playing = true;
    let songInfo = await getData("https://api.listenbrainz.org/1/user/" + USERNAME + "/playing-now")
    if (songInfo["payload"]["count"] == 0) {
        // If no current song, get last played
        songInfo = await getData("https://api.listenbrainz.org/1/user/" + USERNAME + "/listens?count=1")
        statusTmp = "Last played song:";
        playing = false;
    }

    if (prev_mbid != null && prev_mbid == JSON.stringify(songInfo)) {
        return;
    }
    prev_mbid = JSON.stringify(songInfo);

    let artistName = songInfo["payload"]["listens"][0]["track_metadata"]["artist_name"];
    let trackName = songInfo["payload"]["listens"][0]["track_metadata"]["track_name"];
    let releaseMBID = songInfo["payload"]["listens"][0]["track_metadata"]["additional_info"]["release_mbid"];
    if (releaseMBID == null && songInfo["payload"]["listens"][0]["track_metadata"]["mbid_mapping"] != null) {
        releaseMBID = songInfo["payload"]["listens"][0]["track_metadata"]["mbid_mapping"]["release_mbid"];
    }

    // Search for the MBID if it's not included in the data
    if (releaseMBID == null) {
        let artistSearchName = encodeURIComponent(artistName.replace(LUCENE_ESCAPE, "\\$1"));
        let trackSearchName = encodeURIComponent(trackName.replace(LUCENE_ESCAPE, "\\$1"));

        let searchedReleases = await getData(
            "https://musicbrainz.org/ws/2/recording/?query=" + trackSearchName + " AND artist:%22" + artistSearchName + "%22&fmt=json"
        );

        if (searchedReleases["count"] >= 1) {
            if (searchedReleases["recordings"][0]["releases"][0]) {

            }
            releaseMBID = searchedReleases["recordings"][0]["releases"][0]["id"];
        }
    }

    let albumName = "Unknown Album";
    let artworkSrc = "";
    if (releaseMBID != null) {
        // Get release information (like album title)
        let releaseInfo = await getData("https://musicbrainz.org/ws/2/release/" + releaseMBID + "?fmt=json&inc=release-groups");
        albumName = releaseInfo["title"];

        let releaseGroupMBID = releaseInfo["release-group"]["id"];

        // Grab the image from the release ID
        let coverArtGroup = await getImage("https://coverartarchive.org/release-group/" + releaseGroupMBID + "/front-500");
        if (coverArtGroup != null && coverArtGroup.status == 200) {
            artworkSrc = coverArtGroup.url
        } else {
            let coverArtTrack = await getImage("https://coverartarchive.org/release/" + releaseMBID + "/front-500");
            if (coverArtGroup != null && coverArtTrack.status == 200) {
                artworkSrc = coverArtTrack.url;
            }
        }
    }

    // Fill in the data
    status.textContent = statusTmp;
    if (playing == true) {
        animatedBars.style.display = "block";
        animatedBars.style.position = "";
    } else {
        animatedBars.style.display = "none";
        animatedBars.style.position = "absolute";
    }

    albumArtist.textContent = artistName;

    track.textContent = trackName;
    track.title = trackName;

    albumTitle.textContent = albumName;

    artworkTile.src = artworkSrc;
    if (artworkSrc == "") {
        artworkPlaceholder.style.display = "block";
        artworkTile.style.display = "none";
    } else {
        artworkPlaceholder.style.display = "none";
        artworkTile.style.display = "block";

        if (playing == true && artworkSrc != "") {
            artworkTile.className = "floaty";
        } else {
            artworkTile.className = "";
        }
    }
}

async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json
    } catch (error) {
        console.error(error.message);
    }
}

async function getImage(url) {
    try {
        const response = await fetch(url);
        return response
    } catch (error) {
        console.error(error.message);
        return null
    }
}

function hideElement(element) {

}

function startMusicTileInterval() {
    initMusicTile();
    startMusicTile().catch(console.log);
    setInterval(startMusicTile, 10000);
}

window.addEventListener('load', async function () {
    startMusicTileInterval();
})
