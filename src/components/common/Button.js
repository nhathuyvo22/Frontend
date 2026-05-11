export default function Button({ children, params, setParams, category_name }) {
  return (
    <button className="
  px-4 py-2 rounded-md w-full text-left
  bg-gray-100 text-black
  hover:bg-blue-600 hover:text-white
  transition-colors duration-200 cursor-pointer
  mb-2
"
      onClick={() =>
        setParams((prev) => ({
          ...prev,
          ...(category_name && { category: category_name })
        })
        )}
    > {children}
    </button >
  );
}