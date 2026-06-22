import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ManageCourse() {

  const { id } = useParams();

  const [lectureData, setLectureData] =
    useState({
      title: "",
      videoType: "youtube",
      videoUrl: "",
      pdf: "",
      assignment: "",
    });

    const [videoFile, setVideoFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

  const handleChange = (e) => {

    setLectureData({
      ...lectureData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

formData.append(
  "title",
  lectureData.title
);

formData.append(
  "videoType",
  lectureData.videoType
);

formData.append(
  "pdfType",
  lectureData.pdfType
);

if (lectureData.pdfType === "upload") {

  formData.append(
    "pdf",
    pdfFile
  );

} else {

  if (lectureData.pdf) {
  formData.append("pdf", lectureData.pdf);
}
}

formData.append(
  "assignment",
  lectureData.assignment
);

// If upload video
if (lectureData.videoType === "upload") {

  formData.append(
    "video",
    videoFile
  );

} else {

  formData.append(
    "videoUrl",
    lectureData.videoUrl
  );
}

await axios.put(
  `https://e-learning-platform-lernify-backend.onrender.com/api/courses/add-lecture/${id}`,
  formData
);

      alert("Lecture Added Successfully");

      setLectureData({
        title: "",
        videoType: "youtube",
        videoUrl: "",
        pdfType: "url",
        pdf: "",
        assignment: "",
      });

    } catch (error) {

      console.log(error);

      alert("Error adding lecture");

    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pt-24 px-6 flex justify-center">

      <div className="w-full max-w-3xl bg-[#1F2937] p-8 rounded-2xl">

        <h1 className="text-3xl font-bold text-yellow-400 mb-8">
          Add Lecture
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

         {/* Lecture Title */}
<input
  type="text"
  name="title"
  placeholder="Lecture Title"
  value={lectureData.title}
  onChange={handleChange}
  className="bg-[#111827] px-4 py-3 rounded-lg"
  required
/>

{/* Video Type */}
<select
  name="videoType"
  value={lectureData.videoType}
  onChange={handleChange}
  className="bg-[#111827] px-4 py-3 rounded-lg"
>

  <option value="youtube">
    YouTube Video
  </option>

  <option value="upload">
    Uploaded Video
  </option>

</select>

{/* YouTube URL */}
{lectureData.videoType === "youtube" && (

  <input
    type="text"
    name="videoUrl"
    placeholder="YouTube Video URL"
    value={lectureData.videoUrl}
    onChange={handleChange}
    className="bg-[#111827] px-4 py-3 rounded-lg"
    required
  />

)}

{/* Upload Video */}
{lectureData.videoType === "upload" && (

  <input
    type="file"
    accept="video/*"
    onChange={(e) =>
      setVideoFile(e.target.files[0])
    }
    className="text-white"
    required
  />

)}

          {/* PDF TYPE */}
<select
  name="pdfType"
  value={lectureData.pdfType}
  onChange={handleChange}
  className="bg-[#111827] px-4 py-3 rounded-lg"
>

  <option value="url">
    PDF URL
  </option>

  <option value="upload">
    Upload PDF
  </option>

</select>

{/* PDF URL */}
{lectureData.pdfType === "url" && (

<input
  type="text"
  name="pdf"
  placeholder="PDF URL"
  value={lectureData.pdf}
  onChange={handleChange}
  className="bg-[#111827] px-4 py-3 rounded-lg"
/>

)}

{/* PDF FILE */}
{lectureData.pdfType === "upload" && (

  <input
    type="file"
    accept="application/pdf"
    onChange={(e) =>
      setPdfFile(e.target.files[0])
    }
    className="text-white"
  />

)}

          <textarea
            name="assignment"
            placeholder="Assignment Question"
            value={lectureData.assignment}
            onChange={handleChange}
            className="bg-[#111827] px-4 py-3 rounded-lg h-32"
          />

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-bold"
          >
            Add Lecture
          </button>

        </form>

      </div>

    </div>
  );
}