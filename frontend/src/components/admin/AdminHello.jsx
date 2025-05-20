import React from 'react'
import { PiHandWaving } from "react-icons/pi";
import img from '../../assets/chart.png'
import MonthlyProgressChart from './MonthlyProgressChart';

function AdminHello() {

    return (
        <div>
            <div className="w-full h-[250px] bg-green-600 p-6 text-white flex items-center justify-between">
                {/* Left Section with Greeting */}
                <div className="text-white ">
                    <h1 className="text-2xl font-bold capitalize mb-2 flex items-center">
                        Hello, Jessica
                        <span className="ml-2 text-xl text-yellow-500">
                            <PiHandWaving />
                        </span>
                    </h1>
                    <p className="text-lg">Learn anything from online and boost your skills</p>
                </div>

                {/* Right Section with Image */}
                <div>
                    <img src={img} alt="Greeting Image" className="w-[200px] object-contain" />
                </div>
            </div>
            <div>
                <div>
                    recent course
                </div>

                <div>
                    <div>
                       <MonthlyProgressChart/>
                    </div>

                    <div>
                        progress
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHello