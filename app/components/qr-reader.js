const QRReader = Vue.component("qr-reader", {
	template: `<video id="preview"></video>`,

	mounted() {
        let scanner = new Instascan.Scanner({continuous: true, video: document.getElementById('preview'),
            backgroundScan: true, scanPeriod: 1, mirror: true});
        scanner.addListener('scan', function (content) {

            console.log(content);
        });
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[1]).catch(console.log);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    }
});