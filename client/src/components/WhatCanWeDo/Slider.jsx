import React from 'react';
import './Slider.css'; // Import custom CSS for hover effects

const Slider = () => {
  return (
    <>
    
    <ul className="flex w-full h-96 m-0 p-0 list-none bg-gray-200">
      <li className="relative w-1/5 h-full box-border border-r border-gray-400 transition-all duration-500 overflow-hidden bg-cover bg-left" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536146021566-627ce3c4d813?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a5ffca0139fa29bc114ff22dfda13d17&auto=format&fit=crop&w=668&q=80')" }}>
        <div className="content absolute bottom-full left-0 w-full box-border text-center px-2 transition-all duration-500 delay-500 opacity-0 bg-black bg-opacity-70 text-white">
          <h2 className="text-2xl font-semibold mb-4">The Sub Heading</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ipsum iure temporibus libero perferendis non et magnam? Natus provident ut deserunt iusto laboriosam nobis, labore, ratione in architecto facere perferendis.</p>
        </div>
      </li>
      <li className="relative w-1/5 h-full box-border border-r border-gray-400 transition-all duration-500 overflow-hidden bg-cover bg-left" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536131346046-47ead1c29a3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06ada7c1097108d18ec2a365286b5640&auto=format&fit=crop&w=808&q=80')" }}>
        <div className="content absolute bottom-full left-0 w-full box-border text-center px-2 transition-all duration-500 delay-500 opacity-0 bg-black bg-opacity-70 text-white">
          <h2 className="text-2xl font-semibold mb-4">The Sub Heading</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ipsum iure temporibus libero perferendis non et magnam? Natus provident ut deserunt iusto laboriosam nobis, labore, ratione in architecto facere perferendis.</p>
        </div>
      </li>
      <li className="relative w-1/5 h-full box-border border-r border-gray-400 transition-all duration-500 overflow-hidden bg-cover bg-left" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536142347359-3397ed8941cd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=66be66ae157be542ee2f0757f2b7884d&auto=format&fit=crop&w=668&q=80')" }}>
        <div className="content absolute bottom-full left-0 w-full box-border text-center px-2 transition-all duration-500 delay-500 opacity-0 bg-black bg-opacity-70 text-white">
          <h2 className="text-2xl font-semibold mb-4">The Sub Heading</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ipsum iure temporibus libero perferendis non et magnam? Natus provident ut deserunt iusto laboriosam nobis, labore, ratione in architecto facere perferendis.</p>
        </div>
      </li>
      <li className="relative w-1/5 h-full box-border border-r border-gray-400 transition-all duration-500 overflow-hidden bg-cover bg-left" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536161716800-54c6dc5cd115?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=568ecd7fa254776184cba99fd0f1a3f3&auto=format&fit=crop&w=666&q=80')" }}>
        <div className="content absolute bottom-full left-0 w-full box-border text-center px-2 transition-all duration-500 delay-500 opacity-0 bg-black bg-opacity-70 text-white">
          <h2 className="text-2xl font-semibold mb-4">The Sub Heading</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ipsum iure temporibus libero perferendis non et magnam? Natus provident ut deserunt iusto laboriosam nobis, labore, ratione in architecto facere perferendis.</p>
        </div>
      </li>
      <li className="relative w-1/5 h-full box-border overflow-hidden bg-cover bg-left border-r-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536085133-77d181c489f0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1313bd4ac0c0423328da88b30860f40c&auto=format&fit=crop&w=668&q=80')" }}>
        <div className="content absolute bottom-full left-0 w-full box-border text-center px-2 transition-all duration-500 delay-500 opacity-0 bg-black bg-opacity-70 text-white">
          <h2 className="text-2xl font-semibold mb-4">What is lorem ipsum?</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ipsum iure temporibus libero perferendis non et magnam? Natus provident ut deserunt iusto laboriosam nobis, labore, ratione in architecto facere perferendis.</p>
        </div>
      </li>
    </ul>
    </>
  );
};

export default Slider;
