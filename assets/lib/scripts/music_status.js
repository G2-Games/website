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

const USERNAME = "G2";
const LUCENE_ESCAPE = /([\!\*\+\-\=\<\>\&\|\(\)\[\]\{\}\^\~\?\:\\/"])/g;

let artworkTile = document.getElementById("mainArtwork");
let albumTitle = document.getElementById("albumTitle");
let albumArtist = document.getElementById("albumArtist");
let track = document.getElementById("track");
let status = document.getElementById("musicStatus");
let prev_mbid = null;

async function main() {
    // Get my currently playing song!
    let statusTmp = "Currently playing:";
    let songInfo = await getData("https://api.listenbrainz.org/1/user/" + USERNAME + "/playing-now")
    if (songInfo["payload"]["count"] == 0) {
        // If no current song, get last played
        songInfo = await getData("https://api.listenbrainz.org/1/user/" + USERNAME + "/listens?count=1")
        statusTmp = "Last played song:";
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

        console.log("https://musicbrainz.org/ws/2/recording/?query=" + trackSearchName + " AND artist:%22" + artistSearchName + "%22&fmt=json");
        let searchedReleases = await getData(
            "https://musicbrainz.org/ws/2/recording/?query=" + trackSearchName + " AND artist:%22" + artistSearchName + "%22&fmt=json"
        );

        console.log(searchedReleases);

        if (searchedReleases["count"] >= 1) {
            if (searchedReleases["recordings"][0]["releases"][0]) {

            }
            releaseMBID = searchedReleases["recordings"][0]["releases"][0]["id"];
            console.log("Found MBID by search " + releaseMBID);
        }
    }

    let albumName = "Unknown Album";
    let artworkSrc = "https://placehold.co/260/2220/FFFDE6?text=?&font=roboto";
    if (releaseMBID != null) {
        // Get release information (like album title)
        let releaseInfo = await getData("https://musicbrainz.org/ws/2/release/" + releaseMBID + "?fmt=json&inc=release-groups");
        albumName = releaseInfo["title"];

        let releaseGroupMBID = releaseInfo["release-group"]["id"];

        // Grab the image from the release ID
        let coverArtGroup = await fetch("https://coverartarchive.org/release-group/" + releaseGroupMBID + "/front-500");
        if (coverArtGroup.status == 200) {
            artworkSrc = coverArtGroup.url
        } else {
            let coverArtTrack = await fetch("https://coverartarchive.org/release/" + releaseMBID + "/front-500");
            if (coverArtTrack.status == 200) {
                artworkSrc = coverArtTrack.url;
            }
        }
    }

    console.log("%s %s by %s (%s)", statusTmp, trackName, artistName, albumName);

    // Fill in the data
    status.textContent = statusTmp;
    albumArtist.textContent = artistName;
    track.textContent = trackName;
    albumTitle.textContent = albumName;
    artworkTile.src = artworkSrc;
}

main().catch(console.log);
setInterval(main, 10000);
