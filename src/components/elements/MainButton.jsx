
export default function MainButton({ title, w, h, handleClick }) {
  return (
    <>
      <button
        onClick={handleClick}
        style={{
          width: w,
          height: h,
        }}
        className={`bg-main-color text-white rounded-lg flex-center main-button`}
      >
        {title}
      </button>
    </>
  );
}
