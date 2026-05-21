import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-24 left-6 bg-[#1F2937] hover:bg-yellow-400 hover:text-black text-white px-4 py-2 rounded-full shadow-lg transition flex items-center gap-2"
    >
      ← Back
    </button>
  );
}