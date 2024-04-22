let cubeBox = document.getElementById("cube");

var videoURLs = [
            "/assets/hosted_files/misc/DangoVids/uukowo.mp4"
            , "/assets/hosted_files/misc/DangoVids/whatifweheldhandsnexttothecityanimeopeningfloshed.mp4"
            , "/assets/hosted_files/misc/DangoVids/Stare_poke_No.1_05312020_by_dango_8015.mp4"
            , "/assets/hosted_files/misc/DangoVids/Space_Purple (2).mp4"
            , "/assets/hosted_files/misc/DangoVids/Space_Purple (1).mp4"
            , "/assets/hosted_files/misc/DangoVids/Space_Purple (1).mp4"
            , "/assets/hosted_files/misc/DangoVids/osaka (1).mp4"
            , "/assets/hosted_files/misc/DangoVids/niikurayeet_1.mp4"
            , "/assets/hosted_files/misc/DangoVids/mandelcity.mp4"
            , "/assets/hosted_files/misc/DangoVids/ezgif.com-gif-maker-Recovered.mp4"
            , "/assets/hosted_files/misc/DangoVids/dgo.mp4"
            , "/assets/hosted_files/misc/DangoVids/dangodreamarchive2.mp4"
            , "/assets/hosted_files/misc/DangoVids/Comp_1_1.mp4"
            , "/assets/hosted_files/misc/DangoVids/Comp_1.mp4"
            , "/assets/hosted_files/misc/DangoVids/CirniumVibe.mp4"
            , "/assets/hosted_files/misc/DangoVids/alternate.mp4"
            , "/assets/hosted_files/misc/DangoVids/2020-08-25_17-38-44.mp4"
            , "/assets/hosted_files/misc/DangoVids/2020-01-12_00-18-50_1_1.mp4"
            , "/assets/hosted_files/misc/DangoVids/0001-0184.mp4"
            , "/assets/hosted_files/misc/DangoVids/supernano.mp4"
            , "/assets/hosted_files/misc/DangoVids/wakont.mp4"
            , "/assets/hosted_files/misc/DangoVids/Comp_1_1 (4).mp4"
            , "/assets/hosted_files/misc/DangoVids/maybenexttime13.mp4"
            , "/assets/hosted_files/misc/DangoVids/2020-01-07_17-33-19.mp4"
            , "/assets/hosted_files/misc/DangoVids/pillarsnowmen.mp4"
            , "/assets/hosted_files/misc/DangoVids/22244_1.mp4"
            , "/assets/hosted_files/misc/DangoVids/miOO.mp4"
            , "/assets/hosted_files/misc/DangoVids/2020-02-14_16-28-26.mp4"
            , "/assets/hosted_files/misc/DangoVids/ilied.mp4"
            , "/assets/hosted_files/misc/DangoVids/sleeping_interruptions_.mp4"
            , "/assets/hosted_files/misc/DangoVids/you.mp4"
            , "/assets/hosted_files/misc/DangoVids/unknown.mp4"
            , "/assets/hosted_files/misc/DangoVids/622977479501414400.mp4"
            , "/assets/hosted_files/misc/DangoVids/22244.mp4"
            , "/assets/hosted_files/misc/DangoVids/Comp_1 (4).mp4"
            , "/assets/hosted_files/misc/DangoVids/Comp_1 (3).mp4"
            , "/assets/hosted_files/misc/DangoVids/oneddd.mp4"
            , "/assets/hosted_files/misc/DangoVids/atwhatcost.mp4"
            , "/assets/hosted_files/misc/DangoVids/melobyte3s.mp4"
            , "/assets/hosted_files/misc/DangoVids/0001-0250.mp4"
            , "/assets/hosted_files/misc/DangoVids/milk.mp4"
            , "/assets/hosted_files/misc/DangoVids/milk_1.mp4"
            , "/assets/hosted_files/misc/DangoVids/Comp_1 (2).mp4"
            , "/assets/hosted_files/misc/DangoVids/Comp_1_1 (3).mp4"
            , "/assets/hosted_files/misc/DangoVids/thefee_1.mp4"
            , "/assets/hosted_files/misc/DangoVids/mp4_1_1_1.mp4"
            , "/assets/hosted_files/misc/DangoVids/2020-01-12_00-18-50_1_1_1.mp4"
            , "/assets/hosted_files/misc/DangoVids/eab136ceac851751.mp4"
            , "/assets/hosted_files/misc/DangoVids/Comp_1_2.mp4"
            , "/assets/hosted_files/misc/DangoVids/Hunting.mp4"
            , "/assets/hosted_files/misc/DangoVids/Lost_Sucharaka_Shaded.mp4"
            , "/assets/hosted_files/misc/DangoVids/current_atmosphere.mp4"
            , "/assets/hosted_files/misc/DangoVids/iu_2.mp4"
            , "/assets/hosted_files/misc/DangoVids/yu.mp4"
            , "/assets/hosted_files/misc/DangoVids/2020-08-12_00-55-22 (1).mp4"
            , "/assets/hosted_files/misc/DangoVids/2020-08-21_05-41-05.mp4"
            , "/assets/hosted_files/misc/DangoVids/2020-07-14_18-00-13.mp4"
            , "/assets/hosted_files/misc/DangoVids/chris.mp4"
            , "/assets/hosted_files/misc/DangoVids/snowmangoodbye.mp4"
            , "/assets/hosted_files/misc/DangoVids/snowmangreetings.mp4"
            , "/assets/hosted_files/misc/DangoVids/new_footage_of_the_falcon_9_test_launch.mp4"
            , "/assets/hosted_files/misc/DangoVids/panuki.mp4"
            , "/assets/hosted_files/misc/DangoVids/depthtest.mp4"
            , "/assets/hosted_files/misc/DangoVids/GreenCirno.mp4"
            , "/assets/hosted_files/misc/DangoVids/bonk.mp4"
    ]

for (let i = 0; i < 6; i++) {
    let newFace = document.createElement("div");
    newFace.id = "cube" + i;
    newFace.style.backgroundColor = "#" + Math.floor(Math.random() * 4294967176).toString(16);

    let randomIndex = Math.floor(Math.random() * videoURLs.length);

    let faceVideo = document.createElement("video");
    faceVideo.classList.add("face-image");

    faceVideo.src = videoURLs[randomIndex];
    faceVideo.autoplay = true;
    faceVideo.muted = true;
    faceVideo.setAttribute('webkit-playsinline', 'webkit-playsinline');
    faceVideo.setAttribute('playsinline', 'playsinline');
    faceVideo.disablePictureInPicture = true;
    faceVideo.volume = 0.3;

    newFace.appendChild(faceVideo);
    cubeBox.appendChild(newFace);
}

function toggleMute() {
    let cube = document.getElementById("cube");
    let button = document.getElementById("clickMe");
    let video = document.getElementsByClassName("face-image");

    button.style.display = "none";
    cube.style.animation = "20s linear rotate3d infinite";
    cube.style.display = "block";

    function myHandler(e) {
        let randomIndex = Math.floor(Math.random() * videoURLs.length);
        e.target.src = videoURLs[randomIndex];
    }

    for (let i = 0; i < 6; i++) {
        video[i].muted = false;
        video[i].play();
        video[i].addEventListener('ended',myHandler,false);
    }
}
