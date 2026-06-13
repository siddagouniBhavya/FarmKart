const ActionCard = ({
  title,
  image,
  icon,
  onClick,
  overlay,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative h-52 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* OVERLAY */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${overlay}`}
      ></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <i className={`${icon} text-4xl mb-2`}></i>

        <span className="font-semibold text-xl">
          {title}
        </span>
      </div>
    </button>
  );
};

export default ActionCard;