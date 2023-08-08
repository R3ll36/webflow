let videosWithButtons = document.querySelectorAll("video[data-controls='true']");
if (!videosWithButtons.length) return;

let videoMap = new Map();
let intersectionObserver = new IntersectionObserver((entries) => {
  for (let entry of entries) {
    let video = entry.target;
    let intersectionRatio = entry.intersectionRatio;

    if (!video.paused && intersectionRatio <= 0) {
      video.pause(); // Pause the video when it's out of view
    }

    videoMap.set(video, intersectionRatio > 0); // Store whether the video is visible in the viewport
  }
}, { threshold: 0.5 });

for (let video of videosWithButtons) {
  videoMap.set(video, false);
  intersectionObserver.observe(video);
}
