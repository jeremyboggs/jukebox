L.mapbox.accessToken = 'pk.eyJ1Ijoibm9yYWJlbmVkaWN0IiwiYSI6ImNpdXllbjdkbzA0aHYyeWwxd3BoaDdrYzgifQ.F94DF9486D8vAprIkZSOnQ';
var map = L.mapbox.map('map', 'mapbox.outdoors').setView([40,-100],4);
var info = document.getElementById('info');

var mapLocations = omnivore.kml('locations.kml')
    .on('ready', function() {
      map.fitBounds(mapLocations.getBounds());
      mapLocations.eachLayer(function(layer) {
          var content = '<h2>' + layer.feature.properties.name + '</h2>' + '<p>' + layer.feature.properties.description + '</p>';
          layer.bindPopup(content);
      });
    })
    .addTo(map);

mapLocations.on('click', function(e) {
    e.layer.openPopup();
});

var layers = mapLocations._layers;

var playButton1 = document.querySelector('#playBtn1'),
    toggleMuteButton1 = document.querySelector('#toggleMuteBtn1'),
    timer1 = document.querySelector('#time1'),
    wavesurfer1 = WaveSurfer.create({
        container: '#waveform-1',
        waveColor: '#F4F4E1',
        progressColor: 'purple',
        interact: false,
        cursorWidth: 0
    });

wavesurfer1.load('revolution.mp3');

wavesurfer1.on('ready', function() {
    playButton1.onclick = function() {
          wavesurfer1.playPause();
    };

        toggleMuteButton1.onclick = function() {
            wavesurfer1.toggleMute();
    };
});

var playButton2 = document.querySelector('#playBtn2'),
    toggleMuteButton2 = document.querySelector('#toggleMuteBtn2'),
    timer2 = document.querySelector('#time2'),
    wavesurfer2 = WaveSurfer.create({
        container: '#waveform-2',
        waveColor: 'violet',
        progressColor: 'purple',
        interact: false,
        cursorWidth: 0
    });

wavesurfer2.load('whitey.mp3');

wavesurfer2.on('ready', function() {
    playButton2.onclick = function() {
        wavesurfer2.playPause();
    };

    toggleMuteButton2.onclick = function() {
        wavesurfer2.toggleMute();
    };
});


var playButton3 = document.querySelector('#playBtn3'),
    toggleMuteButton3 = document.querySelector('#toggleMuteBtn3'),
    timer3 = document.querySelector('#time3'),
    wavesurfer3 = WaveSurfer.create({
        container: '#waveform-3',
        waveColor: 'violet',
        progressColor: 'purple',
        interact: false,
        cursorWidth: 0
    });
wavesurfer3.load('southcarolina.mp3');

wavesurfer3.on('ready', function() {
    playButton3.onclick = function() {
        wavesurfer3.playPause();
    };

    // toggleMuteButton3.onclick = function() {
    //     wavesurfer3.toggleMute();
    // };
});

console.log(southcarolina);

wavesurfer3.on('audioprocess', function() {
    currentTime = wavesurfer3.getCurrentTime();
    currentTime = Math.trunc(currentTime);
    timer3.innerHTML = '';
    timer3.innerHTML = currentTime;
    
    for( var i in southcarolina) {
        startTime = southcarolina[i].start;
        stopTime = southcarolina[i].stop;
        locationId = southcarolina[i].id;
        if (startTime == currentTime) {
            openLocationPopup(locationId);
        }
    }
});


function openLocationPopup(locationId) {
    mapLocations.eachLayer(function(marker) {
        //console.log(marker.feature.properties.identifier);
        if (marker.feature.properties.identifier === locationId) {
            marker.openPopup();
        }
    });
}
