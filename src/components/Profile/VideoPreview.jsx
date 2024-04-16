import { useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, AdvancedVideo, lazyload } from "@cloudinary/react";
const cld = new Cloudinary({
  cloud: {
    cloudName: "dfr2g1dz6",
  },
});
const VideoPreview = ({ video }) => {
  const playerRef = useRef();
  console.log({ video });
  function onMouseOver() {
    playerRef.current.videoRef.current.play();
  }

  function onMouseOut() {
    playerRef.current.videoRef.current.pause();
  }

  return (
    <div className="video" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <AdvancedImage
        style={{ height: "160px", objectFit: "cover" }}
        cldImg={cld
          .image(video.id)
          .setAssetType("video")
          .delivery("q_auto")
          .format("auto:image")}
      />
    </div>
  );
};

export default VideoPreview
