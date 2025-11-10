import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer = ({ videoUrl, title }: Props) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}course/getVdoCipherOTP`, {
        videoId: videoUrl?.trim(),
      })
      .then((res) => {
        setVideoData({
          otp: res.data.data.otp,
          playbackInfo: res.data.data.playbackInfo,
        });
      })
      .catch((error) => {
        console.log(
          "VdoCipher OTP error:",
          error.response?.data || error.message
        );
      });
  }, [videoUrl]);

  return (
    <div
      style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}
    >
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=ZVxkdiwBeeCP9AuG`}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
