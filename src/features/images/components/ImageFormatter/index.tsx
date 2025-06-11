const ImageFormatter = () => {
    return (
        <div className="flex items-center justify-center">
            <img
                src="https://picsum.photos/seed/picsum/800/600"
                alt="Formatted"
                className="max-w-full max-h-40 object-cover rounded-lg shadow-md"
            />
        </div>
    );
}
export default ImageFormatter;