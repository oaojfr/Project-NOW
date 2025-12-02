export const Header = () => {
    return (
        <header className="w-full bg-[#0c1015] text-gray-300 p-8 font-sans">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                    <img
                        src="geforce-resource://infinitylogo.png"
                        alt="Logo"
                        className="w-8 h-8 object-contain"
                    />
                    <h2 className="text-2xl font-bold">Project NOW</h2>
                </div>
            </div>

            <p>Status: Connected to GFN 🎮</p>
        </header>
    );
};
