import DaviceDetector from "node-device-detector";

function detectorDevice() {
  const detec = new DaviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
  });

  const userAgent =
    "Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36";

  return detec.detect(userAgent);
}

export default detectorDevice;
