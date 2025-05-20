import React from 'react';
import SearcBar from '../../../pages/publicPages/home/SearcBar';

function HeroPage() {
  return (


    <div className=' h-screen flex items-center pl-20'>

      <div className='flex flex-col items-start max-w-2xl text-left'>
        <h1 className='text-4xl sm:text-5xl font-semibold text-white leading-tight mb-4'>
          Unlock Your Potential with Online Learning
        </h1>
        <h3 className='text-xl sm:text-2xl text-white font-medium py-2'>
          Learn at Your Own Pace, Anywhere, Anytime
        </h3>
        <p className='text-lg text-white opacity-80 py-4'>
          From engaging video lessons to interactive quizzes, we provide everything you need to reach your full potential.
        </p>
        <SearcBar />
      </div>
    </div>

  );
}

export default HeroPage;

