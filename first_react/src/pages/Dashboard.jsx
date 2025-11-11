import React from "react";
import { Link } from "react-router-dom"; // 👈 1. IMPORT Link from React Router DOM
import Header from "../components/Header";
import chaturyaIcon from "../assets/react.svg"; 

// Remove the unused import from lucide-react if you aren't using its icons
// import { Link as LucideLink } from "lucide-react"; 

const Dashboard = () => {
  // 2. ADD PATH/URL to each card for navigation
  const cards = [
    { 
      title: "Chaturya", 
      img: chaturyaIcon, 
      path: "/chaturya", // The route this card links to
      badge: "20 members" 
    },
    { 
      title: "Pragnya science forum", 
      img: "", 
      path: "/xxxx", 
      badge: "20 members" 
    },
    { 
      title: "xxxx", 
      img: "", 
      path: "/xxxx", 
      badge: "20 members" 
    },
    { 
      title: "xxxx", 
      img: "", 
      path: "/xxxx", 
      badge: "20 members" 
    },
    { 
      title: "xxxx", 
      img: "", 
      path: "/xxxx", 
      badge: "20 members" 
    },
    { 
      title: "xxxx", 
      img: "", 
      path: "/xxxx", 
      badge: "20 members" 
    },
    { 
      title: "xxxx", 
      img: "", 
      path: "/xxxx", 
      badge: "20 members" 
    },
    { 
      title: "xxxx", 
      img: "", 
      path: "/xxxx", 
      badge: "20 members" 
    },
    { 
      title: "xxxx", 
      img: "", 
      path: "/xxxx", 
      badge: "20 members" 
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-auto">

      {/* Main Dashboard Section */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Welcome Card (omitted for brevity) */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold">Welcome back, Priya!</h2>
            <span className="text-white mb-4">hello  
              
            </span>
            <div className="italic text-indigo-500 border-l-4 border-indigo-400 pl-3">
              “The only way to do great work is to love what you do.” — Steve Jobs
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {cards.map((card, idx) => (
              // 3. WRAP THE CARD CONTENT WITH THE LINK COMPONENT
              <Link 
                key={idx} 
                to={card.path} //  Use the 'to' prop for navigation
                className="block" // Make the link cover the entire grid item area
              >
                <div
                  className="bg-white p-6 rounded-2xl shadow relative hover:shadow-lg hover:shadow-indigo-300 transition flex flex-col items-center justify-center text-center min-h-[200px] cursor-pointer"
                >
                  <div
                    
                    className={`w-14 h-14 bg-gray-200 text-white flex items-center justify-center rounded-xl mb-4 text-2xl`}
                  >
                    {/* Add fallback for empty images */}
                    {card.img ? (
                      <img 
                        src={card.img} 
                        alt={`${card.title} icon`} 
                        className="w-8 h-8 object-contain" 
                      />
                    ) : (
                      // Placeholder icon if img is empty
                      <span className="text-gray-600 text-2xl">?</span> 
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg">{card.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{card.desc}</p>

                  {card.badge && (
                    <span className="absolute top-4 right-4 text-xs bg-indigo-500 text-white px-2 py-1 rounded-full font-medium">
                      {card.badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;