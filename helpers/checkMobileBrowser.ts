export enum OperatingSystem {
  WindowsPhone,
  Android,
  Ios,
  Desktop,
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'desktop'.
 *
 * @returns {String}
 */
export function getMobileOperatingSystem(): OperatingSystem {
  // @ts-ignore
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return OperatingSystem.WindowsPhone;
  }

  if (/android/i.test(userAgent)) {
    return OperatingSystem.Android;
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  // @ts-ignore
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return OperatingSystem.Ios;
  }

  return OperatingSystem.Desktop;
}
