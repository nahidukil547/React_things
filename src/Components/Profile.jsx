import { Link } from "react-router-dom"
export default function Profile() {
    return (
        <div className="min-h-screen bg-gray-800 flex items-center justify-center p-5">
            
            <div className="bg-gray-100 shadow-lg rounded-2xl p-8 w-full max-w-sm">
                
                {/* Profile Image */}
                <div className="flex justify-center">
                    <img
                        src="https://i.pravatar.cc/150"
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-blue-500"
                    />
                </div>

                {/* Name & Role */}
                <div className="text-center mt-5">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {`{User name}`}
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Frontend Developer
                    </p>
                </div>

                {/* Info */}
                <div className="mt-6 space-y-3">

                    <div className="bg-gray-300 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-800">
                            {`{User Email}`}
                        </p>
                    </div>
                </div>

                {/* Button */}
                <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition">
                    <Link to={'/login'}>
                    Edit Profile</Link>
                </button>

            </div>

        </div>
    )
}